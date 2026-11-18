// ============================================================================
// THEMA-TEKENFUNCTIES (ACHTERGROND, PLATFORMEN, QUEST-ITEMS, KARAKTER & GEVAREN)
// ============================================================================

function drawThemeBackground() {
    ctx.save();
    if (selectedTheme === "space") {
        let bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, "#05070d");
        bgGrad.addColorStop(1, "#121c2d");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let nebGrad = ctx.createRadialGradient(720, 190, 10, 720, 190, 260);
        nebGrad.addColorStop(0, "rgba(118, 75, 162, 0.22)");
        nebGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = nebGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let star of backgroundParticles) {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.beginPath();
            let py = (star.y - cameraY * star.speed * 0.4) % canvas.height;
            if (py < 0) py += canvas.height;
            ctx.arc(star.x, py, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (selectedTheme === "middeleeuwen") {
        let bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, "#140f1d");
        bgGrad.addColorStop(1, "#2c1e31");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 236, 179, 0.18)";
        ctx.beginPath();
        ctx.arc(780, 110 - cameraY * 0.015, 58, 0, Math.PI * 2);
        ctx.fill();

        const castleBaseY = 580 - (cameraY * 0.04);
        ctx.fillStyle = "#1b1424";
        ctx.fillRect(80, castleBaseY - 220, 130, 350);
        ctx.fillRect(210, castleBaseY - 130, 540, 260);
        ctx.fillRect(750, castleBaseY - 240, 130, 370);
        ctx.fillRect(410, castleBaseY - 280, 140, 410);

        for (let x = 80; x < 880; x += 30) {
            let topY = castleBaseY - 130;
            if (x < 210) topY = castleBaseY - 220;
            else if (x >= 410 && x < 550) topY = castleBaseY - 280;
            else if (x >= 750) topY = castleBaseY - 240;
            ctx.fillRect(x, topY - 14, 18, 14);
        }

        ctx.fillStyle = "rgba(255, 183, 77, 0.55)";
        ctx.fillRect(135, castleBaseY - 170, 22, 35);
        ctx.fillRect(468, castleBaseY - 220, 24, 40);
        ctx.fillRect(805, castleBaseY - 180, 22, 35);

        for (let p of backgroundParticles) {
            ctx.fillStyle = `rgba(255, 160, 60, ${p.alpha * 0.7})`;
            ctx.beginPath();
            let py = (p.y - cameraY * p.speed * 0.5) % canvas.height;
            if (py < 0) py += canvas.height;
            ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (selectedTheme === "berg") {
        let bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, "#102542");
        bgGrad.addColorStop(0.6, "#2b5876");
        bgGrad.addColorStop(1, "#4e4376");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const mY = 600 - (cameraY * 0.04);
        const drawMountain = (peakX, peakY, baseWidth, color, snowColor) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(peakX, peakY);
            ctx.lineTo(peakX - baseWidth / 2, mY + 150);
            ctx.lineTo(peakX + baseWidth / 2, mY + 150);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = snowColor;
            ctx.beginPath();
            ctx.moveTo(peakX, peakY);
            ctx.lineTo(peakX - baseWidth * 0.16, peakY + (mY + 150 - peakY) * 0.32);
            ctx.lineTo(peakX - baseWidth * 0.05, peakY + (mY + 150 - peakY) * 0.26);
            ctx.lineTo(peakX + baseWidth * 0.05, peakY + (mY + 150 - peakY) * 0.34);
            ctx.lineTo(peakX + baseWidth * 0.16, peakY + (mY + 150 - peakY) * 0.30);
            ctx.closePath();
            ctx.fill();
        };

        drawMountain(220, mY - 320, 560, "#1d3557", "rgba(241, 250, 238, 0.85)");
        drawMountain(740, mY - 360, 600, "#162a45", "rgba(241, 250, 238, 0.9)");
        drawMountain(480, mY - 270, 540, "#274c77", "rgba(255, 255, 255, 0.85)");

        for (let snow of backgroundParticles) {
            ctx.fillStyle = `rgba(255, 255, 255, ${snow.alpha})`;
            ctx.beginPath();
            let py = (snow.y - cameraY * snow.speed * 0.4) % canvas.height;
            if (py < 0) py += canvas.height;
            ctx.arc(snow.x, py, snow.radius * 1.1, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (selectedTheme === "boerderij") {
        let bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, "#1e5799");
        bgGrad.addColorStop(0.65, "#55a6d9");
        bgGrad.addColorStop(1, "#a8e063");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 241, 118, 0.85)";
        ctx.beginPath();
        ctx.arc(130, 85 - cameraY * 0.015, 44, 0, Math.PI * 2);
        ctx.fill();

        const hillY = 570 - (cameraY * 0.045);
        ctx.fillStyle = "#56ab2f";
        ctx.beginPath();
        ctx.arc(270, hillY + 120, 380, Math.PI, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#3d8b24";
        ctx.beginPath();
        ctx.arc(730, hillY + 140, 410, Math.PI, Math.PI * 2);
        ctx.fill();

        const barnX = 700, barnY = hillY - 125;
        ctx.fillStyle = "#cfd8dc";
        ctx.fillRect(barnX + 95, barnY - 15, 34, 95);
        ctx.beginPath();
        ctx.arc(barnX + 112, barnY - 15, 17, Math.PI, 0);
        ctx.fill();

        ctx.fillStyle = "#c62828";
        ctx.fillRect(barnX, barnY + 15, 90, 65);
        ctx.fillStyle = "#8e0000";
        ctx.beginPath();
        ctx.moveTo(barnX - 10, barnY + 15);
        ctx.lineTo(barnX + 45, barnY - 22);
        ctx.lineTo(barnX + 100, barnY + 15);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(barnX + 28, barnY + 42, 34, 38);

        for (let i = 0; i < 14; i++) {
            const p = backgroundParticles[i];
            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
            let py = (p.y - cameraY * 0.08) % (canvas.height * 0.7);
            if (py < 0) py += canvas.height * 0.7;
            ctx.beginPath();
            ctx.arc(p.x, py, 18, 0, Math.PI * 2);
            ctx.arc(p.x + 15, py + 2, 14, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.restore();
}

function drawPlatform(p) {
    ctx.save();
    if (p.isGoal) {
        const isUnlocked = score >= requiredScoreToFinish;

        ctx.shadowBlur = isUnlocked ? 20 : 10;
        ctx.shadowColor = isUnlocked ? "#96c93d" : "#ff4b2b";
        ctx.fillStyle = isUnlocked ? "#96c93d" : "#373e47";
        ctx.strokeStyle = isUnlocked ? "#ffffff" : "#ff4b2b";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x, p.y, p.width, p.height, 8) : ctx.rect(p.x, p.y, p.width, p.height);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isUnlocked ? "#0b1a0e" : "#ff9b8a";
        ctx.font = "bold 13px 'Poppins'";
        ctx.textAlign = "center";
        const goalText = isUnlocked
            ? "🏆 FINISH"
            : `🔒 FINISH (${score}/${requiredScoreToFinish} PUNTEN)`;
        ctx.fillText(goalText, p.x + p.width / 2, p.y + 20);
        ctx.textAlign = "start";
        ctx.restore();
        return;
    }

    if (selectedTheme === "space") {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00c6ff";
        ctx.fillStyle = "#131b2e";
        ctx.strokeStyle = "#00c6ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x, p.y, p.width, p.height, 6) : ctx.rect(p.x, p.y, p.width, p.height);
        ctx.fill();
        ctx.stroke();

    } else if (selectedTheme === "middeleeuwen") {
        ctx.fillStyle = "#4a4e54";
        ctx.strokeStyle = "#2b2d30";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x, p.y, p.width, p.height, 4) : ctx.rect(p.x, p.y, p.width, p.height);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 1.5;
        for (let bx = p.x + 28; bx < p.x + p.width; bx += 28) {
            ctx.beginPath();
            ctx.moveTo(bx, p.y);
            ctx.lineTo(bx, p.y + p.height);
            ctx.stroke();
        }

    } else if (selectedTheme === "berg") {
        ctx.fillStyle = "#4a5d6e";
        ctx.strokeStyle = "#2b3844";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x, p.y, p.width, p.height, 6) : ctx.rect(p.x, p.y, p.width, p.height);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#f1faee";
        ctx.fillRect(p.x + 2, p.y, p.width - 4, 6);

    } else if (selectedTheme === "boerderij") {
        ctx.fillStyle = "#8d5524";
        ctx.strokeStyle = "#5c3310";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x, p.y, p.width, p.height, 5) : ctx.rect(p.x, p.y, p.width, p.height);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#7cb342";
        ctx.fillRect(p.x + 2, p.y, p.width - 4, 5);
    }
    ctx.restore();
}

function drawQuestItem(q, floatOffset) {
    ctx.save();
    const cx = q.x + q.w / 2;
    const cy = q.y + q.h / 2 + floatOffset;

    if (selectedTheme === "space") {
        const planetType = q.index % 5;
        ctx.shadowBlur = 14;

        if (planetType === 0) {
            ctx.shadowColor = "#f6d365";
            ctx.strokeStyle = "rgba(246, 211, 101, 0.85)";
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.ellipse(cx, cy, 22, 6, -0.3, 0, Math.PI * 2);
            ctx.stroke();

            let grad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 13);
            grad.addColorStop(0, "#ffe29f");
            grad.addColorStop(1, "#ffa99f");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 13, 0, Math.PI * 2);
            ctx.fill();

        } else if (planetType === 1) {
            ctx.shadowColor = "#00c6ff";
            ctx.fillStyle = "#1e88e5";
            ctx.beginPath();
            ctx.arc(cx, cy, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#43a047";
            ctx.beginPath();
            ctx.arc(cx - 5, cy - 3, 6, 0, Math.PI * 2);
            ctx.arc(cx + 6, cy + 4, 5, 0, Math.PI * 2);
            ctx.fill();

        } else if (planetType === 2) {
            ctx.shadowColor = "#ff5722";
            let grad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 15);
            grad.addColorStop(0, "#ff8a65");
            grad.addColorStop(1, "#d84315");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 15, 0, Math.PI * 2);
            ctx.fill();

        } else if (planetType === 3) {
            ctx.shadowColor = "#b388ff";
            let grad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, 15);
            grad.addColorStop(0, "#e1bee7");
            grad.addColorStop(1, "#7b1fa2");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ea80fc";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, 21, 5, 0.35, 0, Math.PI * 2);
            ctx.stroke();

        } else {
            ctx.shadowColor = "#ffd54f";
            ctx.fillStyle = "#ffd54f";
            ctx.beginPath();
            ctx.arc(cx, cy, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffb300";
            ctx.beginPath();
            ctx.arc(cx - 5, cy - 4, 3, 0, Math.PI * 2);
            ctx.arc(cx + 5, cy + 5, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px 'Poppins'";
        ctx.fillText("?", cx - 4, cy + 5);

    } else if (selectedTheme === "middeleeuwen") {
        const bx = q.x + 2, by = q.y + 6 + floatOffset, bw = 34, bh = 26;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ffd700";

        ctx.fillStyle = "#6d4c41";
        ctx.strokeStyle = "#ffb300";
        ctx.lineWidth = 2;
        ctx.fillRect(bx, by + 8, bw, bh - 8);
        ctx.strokeRect(bx, by + 8, bw, bh - 8);

        ctx.fillStyle = "#8d6e63";
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(bx, by, bw, 10, [6, 6, 0, 0]) : ctx.rect(bx, by, bw, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffd700";
        ctx.fillRect(bx + bw / 2 - 4, by + 6, 8, 9);
        ctx.fillStyle = "#000";
        ctx.fillRect(bx + bw / 2 - 1, by + 9, 2, 4);

    } else if (selectedTheme === "berg") {
        const bx = q.x + 4, by = q.y + 10 + floatOffset, bw = 30, bh = 24;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00e5ff";

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx + 8, by);
        ctx.lineTo(bx + 8, by - 14);
        ctx.stroke();

        ctx.fillStyle = "#ff1744";
        ctx.beginPath();
        ctx.moveTo(bx + 8, by - 14);
        ctx.lineTo(bx + 24, by - 9);
        ctx.lineTo(bx + 8, by - 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ff6d00";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeRect(bx, by, bw, bh);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px 'Poppins'";
        ctx.fillText("?", bx + 11, by + 17);

    } else if (selectedTheme === "boerderij") {
        const bx = q.x + 3, by = q.y + 8 + floatOffset, bw = 32, bh = 24;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffee58";

        ctx.fillStyle = "#fbc02d";
        ctx.strokeStyle = "#8d6e63";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 5) : ctx.rect(bx, by, bw, bh);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(141, 110, 99, 0.6)";
        ctx.beginPath();
        ctx.moveTo(bx, by + 8);
        ctx.lineTo(bx + bw, by + 8);
        ctx.moveTo(bx, by + 16);
        ctx.lineTo(bx + bw, by + 16);
        ctx.stroke();

        ctx.fillStyle = "#4e342e";
        ctx.font = "bold 15px 'Poppins'";
        ctx.fillText("?", bx + 11, by + 18);
    }
    ctx.restore();
}

function drawPlayerCharacter() {
    ctx.save();
    const x = player.x;
    const y = player.y;
    const w = player.width;
    const h = player.height;
    const lookDir = player.dx < 0 ? -1 : (player.dx > 0 ? 1 : 0);

    if (customCharacterAsset) {
        const media = customCharacterAsset;
        const mediaWidth = media.videoWidth || media.naturalWidth || media.width || 0;
        const mediaHeight = media.videoHeight || media.naturalHeight || media.height || 0;
        const mediaReady = media.tagName === "VIDEO"
            ? media.readyState >= 2
            : media.complete !== false;

        if (mediaReady && mediaWidth > 0 && mediaHeight > 0) {
            const maxWidth = 46;
            const maxHeight = 46;
            const scale = Math.min(maxWidth / mediaWidth, maxHeight / mediaHeight);
            const drawWidth = mediaWidth * scale;
            const drawHeight = mediaHeight * scale;
            const drawX = x + w / 2 - drawWidth / 2;
            const drawY = y + h / 2 - drawHeight / 2 - 5;

            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(0, 198, 255, 0.45)";
            ctx.drawImage(media, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
            return;
        }
    }

    if (selectedTheme === "space") {
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00c6ff";

        ctx.fillStyle = "#90a4ae";
        const packX = lookDir >= 0 ? x - 4 : x + w - 2;
        ctx.fillRect(packX, y + 7, 6, 14);

        ctx.fillStyle = "#eceff1";
        ctx.strokeStyle = "#00c6ff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, w, h, 8) : ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#0d47a1";
        const visorX = x + 4 + (lookDir * 2);
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(visorX, y + 4, w - 8, 11, 4) : ctx.rect(visorX, y + 4, w - 8, 11);
        ctx.fill();

        ctx.fillStyle = "#80d8ff";
        ctx.fillRect(visorX + 2, y + 6, 5, 3);

    } else if (selectedTheme === "middeleeuwen") {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffd54f";

        ctx.fillStyle = "#e53935";
        ctx.beginPath();
        ctx.arc(x + w / 2 - (lookDir * 2), y - 3, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#b0bec5";
        ctx.strokeStyle = "#37474f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, w, h, 5) : ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        const slitX = x + 4 + (lookDir * 2);
        ctx.fillStyle = "#263238";
        ctx.fillRect(slitX, y + 7, w - 8, 6);
        ctx.fillStyle = "#fff59d";
        ctx.fillRect(slitX + 3, y + 8, 3, 3);
        ctx.fillRect(slitX + 11, y + 8, 3, 3);

        ctx.fillStyle = "#d32f2f";
        ctx.fillRect(x + w / 2 - 2, y + 16, 4, 9);
        ctx.fillRect(x + w / 2 - 5, y + 19, 10, 3);

    } else if (selectedTheme === "berg") {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#80deea";

        ctx.fillStyle = "#d84315";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y + 3, w, h - 3, 6) : ctx.rect(x, y + 3, w, h - 3);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#0288d1";
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x + 1, y - 1, w - 2, 9, [6, 6, 0, 0]) : ctx.rect(x + 1, y - 1, w - 2, 9);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x + w / 2, y - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        const goggleX = x + 4 + (lookDir * 2);
        ctx.fillStyle = "#ffca28";
        ctx.strokeStyle = "#212121";
        ctx.lineWidth = 1.5;
        ctx.fillRect(goggleX, y + 8, w - 8, 7);
        ctx.strokeRect(goggleX, y + 8, w - 8, 7);

    } else if (selectedTheme === "boerderij") {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffee58";

        ctx.fillStyle = "#ffccbc";
        ctx.fillRect(x + 2, y + 3, w - 4, 12);

        ctx.fillStyle = "#1976d2";
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y + 14, w, h - 14, [0, 0, 5, 5]) : ctx.rect(x, y + 14, w, h - 14);
        ctx.fill();
        ctx.fillRect(x + 4, y + 10, 4, 6);
        ctx.fillRect(x + w - 8, y + 10, 4, 6);

        ctx.fillStyle = "#212121";
        const eyeX = x + 6 + (lookDir * 2);
        ctx.fillRect(eyeX, y + 7, 3, 3);
        ctx.fillRect(eyeX + 8, y + 7, 3, 3);

        ctx.fillStyle = "#fdd835";
        ctx.strokeStyle = "#f57f17";
        ctx.lineWidth = 1.5;
        ctx.fillRect(x - 4, y + 1, w + 8, 4);
        ctx.fillRect(x + 2, y - 5, w - 4, 6);
        ctx.fillStyle = "#d32f2f";
        ctx.fillRect(x + 2, y - 1, w - 4, 2);
    }
    ctx.restore();
}

function drawProjectiles() {
    for (const pObj of projectiels) {
        for (let i = 0; i < pObj.trail.length; i++) {
            const pos = pObj.trail[i];
            const ratio = (i + 1) / pObj.trail.length;

            if (pObj.kind === "arrow") {
                ctx.fillStyle = `rgba(205, 205, 205, ${ratio * 0.35})`;
            } else if (pObj.kind === "snowball") {
                ctx.fillStyle = `rgba(220, 245, 255, ${ratio * 0.45})`;
            } else {
                ctx.fillStyle = `rgba(255, ${Math.floor(90 + ratio * 130)}, 0, ${ratio * 0.65})`;
            }

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pObj.radius * ratio * 0.75, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.save();
        ctx.translate(pObj.x, pObj.y);

        if (pObj.kind === "meteor") {
            ctx.shadowBlur = 22;
            ctx.shadowColor = "#ff6a00";
            const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, pObj.radius);
            grad.addColorStop(0, "#ffffff");
            grad.addColorStop(0.4, "#ffe600");
            grad.addColorStop(1, "#ff4500");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, pObj.radius, 0, Math.PI * 2);
            ctx.fill();

        } else if (pObj.kind === "arrow") {
            ctx.rotate(Math.PI / 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#ffffff";

            ctx.fillStyle = "#8d6e63";
            ctx.fillRect(-12, -2, 24, 4);

            ctx.fillStyle = "#cfd8dc";
            ctx.beginPath();
            ctx.moveTo(12, -4);
            ctx.lineTo(21, 0);
            ctx.lineTo(12, 4);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#e53935";
            ctx.beginPath();
            ctx.moveTo(-12, -2);
            ctx.lineTo(-18, -7);
            ctx.lineTo(-10, -2);
            ctx.closePath();
            ctx.fill();

        } else if (pObj.kind === "snowball") {
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#b3e5fc";
            const snowGradient = ctx.createRadialGradient(
                -pObj.radius * 0.35, -pObj.radius * 0.4, 1,
                0, 0, pObj.radius
            );
            snowGradient.addColorStop(0, "#ffffff");
            snowGradient.addColorStop(0.72, "#e1f5fe");
            snowGradient.addColorStop(1, "#81d4fa");

            ctx.fillStyle = snowGradient;
            ctx.strokeStyle = "#e3f7ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, pObj.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.beginPath();
            ctx.arc(-pObj.radius * 0.32, -pObj.radius * 0.32, pObj.radius * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function drawLightningStrikes() {
    if (selectedTheme !== "boerderij") return;

    const now = Date.now();

    for (const strike of lightningStrikes) {
        const remaining = Math.max(0, strike.expiresAt - now);
        const alpha = Math.min(1, remaining / 260);

        const totalSegments = strike.points.length - 1;
        const currentSegmentFloat = strike.progress * totalSegments;
        const fullSegments = Math.floor(currentSegmentFloat);
        const partialRatio = currentSegmentFloat - fullSegments;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(strike.points[0].x, strike.points[0].y);

        // Teken alle voltooide segmenten tot nu toe
        for (let i = 1; i <= fullSegments; i++) {
            ctx.lineTo(strike.points[i].x, strike.points[i].y);
        }

        // Bereken en teken het vloeiende kopstuk dat nu naar beneden beweegt
        if (fullSegments < totalSegments && partialRatio > 0) {
            const p1 = strike.points[fullSegments];
            const p2 = strike.points[fullSegments + 1];
            const tipX = p1.x + (p2.x - p1.x) * partialRatio;
            const tipY = p1.y + (p2.y - p1.y) * partialRatio;
            ctx.lineTo(tipX, tipY);
        }

        ctx.shadowBlur = 24;
        ctx.shadowColor = "#fff176";
        ctx.strokeStyle = "#fffde7";
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.strokeStyle = "#ffeb3b";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
}

function drawMountainWind() {
    if (
        selectedTheme !== "berg" ||
        mountainWind.activeUntil <= Date.now()
    ) {
        return;
    }

    ctx.save();
    ctx.strokeStyle = "rgba(230, 248, 255, 0.78)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const direction = mountainWind.direction;

    const windLines = selectedDifficulty === "moeilijk"
        ? 24
        : selectedDifficulty === "gemiddeld"
            ? 14
            : 7;

    for (let i = 0; i < windLines; i++) {
        const baseX =
            (i * 113 + mountainWind.visualOffset + canvas.width + 100) %
            (canvas.width + 100) - 50;

        const y =
            34 + ((i * 61 + (Date.now() / 35)) %
                (canvas.height - 60));

        const length =
            (28 + (i % 3) * 15) *
            (selectedDifficulty === "moeilijk" ? 2 : 1);

        ctx.beginPath();
        ctx.moveTo(baseX, y);
        ctx.lineTo(baseX + direction * length, y);

        ctx.moveTo(baseX + direction * length, y);
        ctx.lineTo(baseX + direction * (length - 7), y - 4);

        ctx.moveTo(baseX + direction * length, y);
        ctx.lineTo(baseX + direction * (length - 7), y + 4);

        ctx.stroke();
    }

    ctx.restore();
}

function drawFarmBlackout() {
    if (selectedTheme !== "boerderij" || farmBlackoutUntil <= Date.now()) return;

    const remaining = farmBlackoutUntil - Date.now();
    const alpha = Math.min(0.82, 0.82 * (remaining / 550));
    ctx.save();
    ctx.fillStyle = `rgba(3, 6, 14, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawThemeBackground();

    ctx.save();
    ctx.translate(0, -cameraY);

    for (let p of platforms) {
        drawPlatform(p);
    }

    let time = Date.now() / 200;

    for (let q of questions) {
        if (q.active) {
            let floatOffset = Math.sin(time + q.x) * 4;
            drawQuestItem(q, floatOffset);
        }
    }

    drawProjectiles();
    drawPlayerCharacter();

    ctx.restore();

    drawMountainWind();
    drawFarmBlackout();

    ctx.save();
    ctx.translate(0, -cameraY);
    drawLightningStrikes();
    ctx.restore();
}