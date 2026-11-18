// ============================================================================
// UI, MENU-SELECTIES, EIGEN KARAKTER UPLOAD, QUIZ & BESTURING (INPUT)
// ============================================================================

function showToast(message, bgColor = "rgba(255, 75, 43, 0.92)") {
    feedbackToast.innerText = message;
    feedbackToast.style.background = bgColor;
    feedbackToast.style.display = "block";
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        feedbackToast.style.display = "none";
    }, 2500);
}

function unlockHardDifficulty() {
    hardModeUnlocked = true;
    const hardBtn = document.getElementById("btn-diff-hard");
    if (hardBtn) {
        hardBtn.classList.remove("locked");
        hardBtn.innerText = "Moeilijk";
    }
}

function selectDifficulty(niveau, btnElement) {
    if (niveau === "moeilijk" && !hardModeUnlocked) {
        showToast("🔒 Speel eerst het niveau 'Normaal' uit om 'Moeilijk' vrij te spelen!", "rgba(255, 140, 0, 0.95)");
        return;
    }
    selectedDifficulty = niveau;
    document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

function selectTheme(thema, btnElement) {
    selectedTheme = thema;
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

function releaseCustomCharacter() {
    if (customCharacterVideo) {
        customCharacterVideo.pause();
        customCharacterVideo.removeAttribute("src");
        customCharacterVideo.load();
        customCharacterVideo = null;
    }

    customCharacterAsset = null;

    if (customCharacterUrl) {
        URL.revokeObjectURL(customCharacterUrl);
        customCharacterUrl = null;
    }
}

function resetCustomCharacter() {
    releaseCustomCharacter();
    document.getElementById("character-upload").value = "";
    document.getElementById("character-file-name").textContent =
        "Standaardpersonage hersteld.";
}

function handleCharacterUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    const isVideo = file.type === "video/mp4" || extension === "mp4";
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension) ||
        ["image/jpeg", "image/png", "image/gif"].includes(file.type);

    if (!isVideo && !isImage) {
        document.getElementById("character-file-name").textContent =
            "Dit bestandstype wordt niet ondersteund. Kies JPG, PNG, GIF of MP4.";
        event.target.value = "";
        return;
    }

    releaseCustomCharacter();
    customCharacterUrl = URL.createObjectURL(file);

    if (isVideo) {
        const video = document.createElement("video");
        video.src = customCharacterUrl;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        customCharacterVideo = video;
        customCharacterAsset = video;

        video.addEventListener("loadeddata", () => {
            video.play().catch(() => {
                document.getElementById("character-file-name").textContent =
                    "MP4 gekozen: " + file.name + " (afspelen start zodra de browser dit toestaat).";
            });
        }, { once: true });

        video.addEventListener("error", () => {
            document.getElementById("character-file-name").textContent =
                "De MP4 kon niet worden geladen. Kies een ander MP4-bestand.";
            releaseCustomCharacter();
            event.target.value = "";
        }, { once: true });

        video.load();
    } else {
        const image = new Image();
        customCharacterAsset = image;

        image.onload = () => {
            document.getElementById("character-file-name").textContent =
                "Eigen personage actief: " + file.name;
        };

        image.onerror = () => {
            document.getElementById("character-file-name").textContent =
                "De afbeelding kon niet worden geladen. Kies een ander bestand.";
            releaseCustomCharacter();
            event.target.value = "";
        };

        image.src = customCharacterUrl;
    }

    if (isVideo) {
        document.getElementById("character-file-name").textContent =
            "Eigen MP4-personage gekozen: " + file.name;
    }
}

document.getElementById("character-upload").addEventListener("change", handleCharacterUpload);

function updateHintButtonState() {
    if (hintsLeft <= 0) {
        hintBtn.disabled = true;
        hintBtn.innerText = "💡 Geen hints meer over (0/3)";
    } else if (currentQuestionObj && currentQuestionObj.hintUsed) {
        hintBtn.disabled = true;
        hintBtn.innerText = `💡 Hint al gebruikt bij deze vraag (${hintsLeft} over)`;
    } else {
        hintBtn.disabled = false;
        hintBtn.innerText = `💡 Gebruik 50/50 Hint (nog ${hintsLeft} over)`;
    }
}

function useHint() {
    if (!currentQuestionObj || currentQuestionObj.hintUsed || hintsLeft <= 0) return;

    hintsLeft--;
    currentQuestionObj.hintUsed = true;
    document.getElementById("hud-hints").innerText = hintsLeft;
    updateHintButtonState();

    const answerButtons = Array.from(answersContainer.querySelectorAll(".btn"));
    let wrongIndices = [];
    answerButtons.forEach((btn, idx) => {
        if (idx !== currentQuestionObj.correct) {
            wrongIndices.push(idx);
        }
    });

    wrongIndices.sort(() => Math.random() - 0.5);
    const indicesToDisable = wrongIndices.slice(0, 2);

    indicesToDisable.forEach(idx => {
        answerButtons[idx].disabled = true;
        answerButtons[idx].classList.add("disabled-option");
    });
}

function triggerQuiz(qObj) {
    isPaused = true;
    currentQuestionObj = qObj;
    quizOverlay.style.display = "flex";
    qCategory.innerText = qObj.cat;
    qText.innerText = qObj.q;
    answersContainer.innerHTML = "";

    qObj.a.forEach((ansText, index) => {
        let btn = document.createElement("button");
        btn.className = "btn";
        btn.innerText = ansText;
        btn.onclick = () => {
            if (btn.disabled) return;
            if (index === qObj.correct) {
                score += 1;
                correctCount++;
                document.getElementById("hud-score").innerText = score;
                quizOverlay.style.display = "none";
                qObj.active = false;
                isPaused = false;

                if (score === requiredScoreToFinish) {
                    showToast("🔓 9 punten bereikt! De FINISH bovenaan is nu groen en geopend!", "rgba(46, 160, 67, 0.95)");
                }
            } else {
                btn.classList.add("wrong-anim");
                setTimeout(() => {
                    btn.classList.remove("wrong-anim");
                    quizOverlay.style.display = "none";
                    qObj.hintUsed = false;
                    resetPlayerToStart(true);
                    isPaused = false;
                }, 500);
            }
        };
        answersContainer.appendChild(btn);
    });

    updateHintButtonState();
}

// Spring- en besturingsfuncties
function doJump() {
    if (player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
        player.jumpCount = 1;
        player.canDoubleJump = true;
    } else if (player.canDoubleJump && player.jumpCount < player.maxJumps) {
        player.dy = player.jumpPower * 0.9;
        player.jumpCount++;
        player.canDoubleJump = false;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") keys.right = true;
    if (e.code === "ArrowLeft") keys.left = true;
    if (e.code === "Space" || e.code === "ArrowUp") {
        keys.up = true;
        if (!isPaused) doJump();
        e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") keys.right = false;
    if (e.code === "ArrowLeft") keys.left = false;
    if (e.code === "Space" || e.code === "ArrowUp") keys.up = false;
});

const addTouchEvents = (element, keyMap) => {
    const press = (e) => { e.preventDefault(); keys[keyMap] = true; };
    const release = (e) => { e.preventDefault(); keys[keyMap] = false; };
    element.addEventListener('touchstart', press, { passive: false });
    element.addEventListener('touchend', release, { passive: false });
    element.addEventListener('mousedown', press);
    element.addEventListener('mouseup', release);
};

addTouchEvents(document.getElementById('btn-left'), 'left');
addTouchEvents(document.getElementById('btn-right'), 'right');

const jumpPress = (e) => {
    e.preventDefault();
    keys.up = true;
    if (!isPaused) doJump();
};
const jumpRelease = (e) => { e.preventDefault(); keys.up = false; };
const btnJump = document.getElementById('btn-jump');
btnJump.addEventListener('touchstart', jumpPress, { passive: false });
btnJump.addEventListener('touchend', jumpRelease, { passive: false });
btnJump.addEventListener('mousedown', jumpPress);
btnJump.addEventListener('mouseup', jumpRelease);