// ============================================================================
// HOOFD-SPELLOGICA: START, RESET, TIMER, UPDATE & GAMELOOP
// ============================================================================

function goToHome() {
    isPaused = true;
    clearInterval(timerInterval);
    clearPendingProjectiles();
    document.getElementById("hud").style.display = "none";
    quizOverlay.style.display = "none";
    winOverlay.style.display = "none";
    startOverlay.style.display = "flex";
}

function resetPlayerToStart(isQuizPenalty = false, customMessage = null) {
    player.x = startCheckpoint.x;
    player.y = startCheckpoint.y;
    player.dx = 0;
    player.dy = 0;
    player.jumpCount = 0;
    player.canDoubleJump = true;
    clearPendingProjectiles();

    if (isQuizPenalty) {
        score -= 1;
        wrongCount++;
        document.getElementById("hud-score").innerText = score;
        showToast("Fout antwoord! -1 punt en terug naar beneden! 🔄");
    } else if (customMessage) {
        showToast(customMessage);
    }
}

function updateTimer() {
    if (isPaused) return;

    activeSecondsPlayed++;
    let mins = Math.floor(activeSecondsPlayed / 60).toString().padStart(2, '0');
    let secs = (activeSecondsPlayed % 60).toString().padStart(2, '0');
    elapsedTimeStr = `${mins}:${secs}`;
    document.getElementById("hud-timer").innerText = elapsedTimeStr;

    const settings = getDifficultySettings();

    if (
        activeSecondsPlayed > 0 &&
        activeSecondsPlayed % settings.hazardInterval === 0
    ) {
        spawnProjectiles();
    }
}

function startGame() {
    if (selectedDifficulty === "moeilijk" && !hardModeUnlocked) {
        showToast("🔒 Speel eerst het niveau 'Normaal' uit om 'Moeilijk' vrij te spelen!", "rgba(255, 140, 0, 0.95)");
        return;
    }

    const input = document.getElementById("username-input").value.trim();
    if (input !== "") playerName = input;

    loadQuestionsForDifficulty(selectedDifficulty);
    clearPendingProjectiles();

    // Zorg dat spelerpositie en snelheid/zwaartekracht in ELK thema identiek zijn
    player.x = startCheckpoint.x;
    player.y = startCheckpoint.y;
    player.dx = 0;
    player.dy = 0;
    player.speed = FIXED_PLAYER_SPEED;
    player.gravity = FIXED_PLAYER_GRAVITY;
    player.jumpPower = FIXED_PLAYER_JUMP;
    player.grounded = false;
    player.jumpCount = 0;
    player.canDoubleJump = true;

    cameraY = worldHeight - canvas.height;

    hintsLeft = 3;
    activeSecondsPlayed = 0;
    elapsedTimeStr = "00:00";
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    document.getElementById("hud-score").innerText = score;
    document.getElementById("hud-timer").innerText = elapsedTimeStr;

    document.getElementById("hud-name").innerText = playerName;
    document.getElementById("hud-theme").innerText = themeNames[selectedTheme];
    document.getElementById("hud-difficulty").innerText = difficultyNames[selectedDifficulty];
    document.getElementById("hud-hints").innerText = hintsLeft;
    document.getElementById("hud").style.display = "flex";
    startOverlay.style.display = "none";
    winOverlay.style.display = "none";

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;

    if (!gameLoopStarted) {
        gameLoopStarted = true;
        requestAnimationFrame(gameLoop);
    }
}

function update() {
    if (keys.right) player.dx = player.speed;
    else if (keys.left) player.dx = -player.speed;
    else player.dx = 0;

    player.dy += player.gravity;
    player.x += player.dx;
    player.y += player.dy;

    updateMountainWind();

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    player.grounded = false;
    for (let p of platforms) {
        if (player.x < p.x + p.width && player.x + player.width > p.x &&
            player.y + player.height >= p.y && player.y + player.height <= p.y + p.height + 8 && player.dy >= 0) {
            player.y = p.y - player.height;
            player.dy = 0;
            player.grounded = true;
            player.jumpCount = 0;
            player.canDoubleJump = true;

            if (p.isGoal) {
                if (score >= requiredScoreToFinish) {
                    isPaused = true;
                    clearInterval(timerInterval);
                    clearPendingProjectiles();

                    let unlockMelding = "";
                    if (selectedDifficulty === "gemiddeld" && !hardModeUnlocked) {
                        unlockHardDifficulty();
                        unlockMelding = `<br><span style="color: #96c93d; font-weight: 600;">🔓 Niveau 'Moeilijk' is nu vrijgespeeld!</span>`;
                    }

                    winOverlay.style.display = "flex";
                    document.getElementById("win-stats").innerHTML = `
                        👤 <b>Naam:</b> ${playerName}<br>
                        🎨 <b>Thema:</b> ${themeNames[selectedTheme]}<br>
                        🎯 <b>Niveau:</b> ${difficultyNames[selectedDifficulty]}<br>
                        🏆 <b>Eindscore:</b> ${score} punten<br>
                        💡 <b>Hints gebruikt:</b> ${3 - hintsLeft} van 3<br>
                        ⏱️ <b>Totale Tijd:</b> ${elapsedTimeStr}<br>
                        ✅ <b>Aantal goed:</b> ${correctCount}<br>
                        ❌ <b>Aantal fout:</b> ${wrongCount}
                        ${unlockMelding}
                    `;
                } else {
                    const now = Date.now();
                    if (now - lastFinishLockToastAt > 2500) {
                        lastFinishLockToastAt = now;
                        const nogNodig = requiredScoreToFinish - score;
                        showToast(`🔒 Finish vergrendeld! Je hebt minimaal 9 score nodig (nog ${nogNodig} te gaan).`, "rgba(255, 75, 43, 0.92)");
                    }
                }
            }
        }
    }

    if (player.y > worldHeight) {
        resetPlayerToStart(false);
    }

    for (let q of questions) {
        if (q.active && player.x < q.x + q.w && player.x + player.width > q.x &&
            player.y < q.y + q.h && player.y + player.height > q.y) {
            triggerQuiz(q);
        }
    }

    for (let i = projectiels.length - 1; i >= 0; i--) {
        const pObj = projectiels[i];

        pObj.trail.push({ x: pObj.x, y: pObj.y });
        if (pObj.trail.length > 14) pObj.trail.shift();

        pObj.x += pObj.dx;
        pObj.y += pObj.dy;

        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        const dist = Math.hypot(pObj.x - playerCenterX, pObj.y - playerCenterY);

        if (dist < pObj.radius + player.width / 2 - 2) {
            const hitBerichten = {
                meteor: "☄️ Geraakt door een meteoor! Terug naar beneden!",
                arrow: "🏹 Geraakt door een pijl! Terug naar beneden!",
                snowball: "❄️ Geraakt door een sneeuwbal! Terug naar beneden!"
            };
            resetPlayerToStart(false, hitBerichten[pObj.kind] || "⚠️ Geraakt! Terug naar beneden!");
            break;
        }

        if (pObj.x < -150 || pObj.x > canvas.width + 150 ||
            pObj.y > cameraY + canvas.height + 120) {
            projectiels.splice(i, 1);
        }
    }

    const now = Date.now();
    for (let i = lightningStrikes.length - 1; i >= 0; i--) {
        const strike = lightningStrikes[i];

        if (now >= strike.expiresAt) {
            lightningStrikes.splice(i, 1);
            continue;
        }

        // Laat de bliksem vloeiend van boven naar beneden groeien tot 100% (1)
        if (strike.progress < 1) {
            strike.progress = Math.min(1, strike.progress + strike.speed);
        }

        if (playerHitByLightning(strike)) {
            resetPlayerToStart(false, "⚡ Geraakt door de bliksem! Terug naar beneden!");
            break;
        }
    }

    let targetCameraY = player.y - canvas.height / 2;
    cameraY += (targetCameraY - cameraY) * 0.1;
    if (cameraY < 0) cameraY = 0;
    if (cameraY > worldHeight - canvas.height) cameraY = worldHeight - canvas.height;
}

function gameLoop() {
    if (!isPaused) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}