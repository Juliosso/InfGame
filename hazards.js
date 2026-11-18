// ============================================================================
// THEMA-GEVAREN: PROJECTIELEN, BLIKSEM & BERGWIND
// ============================================================================

function clearPendingProjectiles() {
    projectileSpawnTimeouts.forEach(t => clearTimeout(t));
    projectileSpawnTimeouts = [];
    projectiels = [];
    lightningStrikes = [];
    farmBlackoutUntil = 0;
    mountainWind.activeUntil = 0;
    mountainWind.nextAt = Date.now() + 5000 + Math.random() * 3000;
}

function spawnProjectiles() {
    if (selectedTheme === "boerderij") {
        startFarmStorm();
        return;
    }

    const waarschuwingstips = {
        space: "☄️ Meteorenregen! Ontwijk de vallende meteoren!",
        middeleeuwen: "🏹 Pijlenregen! De pijlen vallen recht naar beneden!",
        berg: "❄️ Sneeuwballen! Ontwijk de vallende sneeuwballen!"
    };

    showToast(waarschuwingstips[selectedTheme] || "⚠️ Pas op voor gevaar!", "rgba(255, 140, 0, 0.92)");

    const settings = getDifficultySettings();
    const count = settings.projectileCount;

    const zones = Array.from(
        { length: count },
        (_, i) => i
    ).sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
        const timeoutId = setTimeout(() => {
            if (isPaused) return;

            const zoneWidth = canvas.width / count;
            const margin = Math.min(20, zoneWidth * 0.2);
            const startX = zones[i] * zoneWidth + margin + Math.random() * Math.max(10, zoneWidth - margin * 2);
            const startY = cameraY - 35;

            let projectile;

            if (selectedTheme === "middeleeuwen") {
                projectile = {
                    kind: "arrow",
                    x: startX,
                    y: startY,
                    dx: 0,
                    dy: (7.5 + Math.random() * 1.5) * settings.projectileSpeed,
                    radius: 6,
                    rotation: Math.PI / 2,
                    trail: []
                };
            } else if (selectedTheme === "berg") {
                projectile = {
                    kind: "snowball",
                    x: startX,
                    y: startY,
                    dx: (Math.random() - 0.5) * 0.45,
                    dy: (4.8 + Math.random() * 1.4) * settings.projectileSpeed,
                    radius: 12 + Math.random() * 3,
                    rotation: 0,
                    trail: []
                };
            } else {
                projectile = {
                    kind: "meteor",
                    x: startX,
                    y: startY,
                    dx: (Math.random() - 0.5) * 2.2,
                    dy: (4.5 + Math.random() * 1.6) * settings.projectileSpeed,
                    radius: 14,
                    rotation: 0,
                    trail: []
                };
            }

            projectiels.push(projectile);
        }, i * 240);

        projectileSpawnTimeouts.push(timeoutId);
    }
}

function startFarmStorm() {
    showToast("🌩️ Het wordt donker... bliksem op komst!", "rgba(65, 72, 90, 0.96)");
    farmBlackoutUntil = Date.now() + 4500;

    const settings = getDifficultySettings();

    for (let i = 0; i < settings.lightningCount; i++) {
        const timeoutId = setTimeout(() => {
            if (isPaused) return;
            createLightningStrike();
        }, 520 + i * 120);

        projectileSpawnTimeouts.push(timeoutId);
    }
}

function createLightningStrike() {
    const targetX = 55 + Math.random() * (canvas.width - 110);
    const startY = Math.max(0, cameraY - 80);
    const endY = Math.min(worldHeight, cameraY + canvas.height - 12);
    const segmentCount = 22;
    const points = [];

    for (let i = 0; i <= segmentCount; i++) {
        const progress = i / segmentCount;
        const x = i === 0 || i === segmentCount
            ? targetX
            : targetX + (Math.random() - 0.5) * 55;
        points.push({
            x,
            y: startY + (endY - startY) * progress
        });
    }

    const now = Date.now();

    // Hoe hoger het niveau, hoe sneller de bliksem naar beneden schiet (maar nog steeds ontwijkbaar)
    const speedPerDifficulty = selectedDifficulty === "moeilijk"
        ? 0.032   // ~0.5 sec van boven naar beneden
        : selectedDifficulty === "gemiddeld"
            ? 0.024 // ~0.7 sec van boven naar beneden
            : 0.018; // ~0.9 sec van boven naar beneden

    lightningStrikes.push({
        points,
        targetX,
        targetY: endY,
        progress: 0,               // Begint helemaal bovenaan (0%)
        speed: speedPerDifficulty, // Groeit elk frame een stukje naar beneden
        bornAt: now,
        expiresAt: now + 2400
    });
}

function updateMountainWind() {
    if (selectedTheme !== "berg") {
        mountainWind.activeUntil = 0;
        return;
    }

    const now = Date.now();
    const settings = getDifficultySettings();

    if (mountainWind.activeUntil <= now && now >= mountainWind.nextAt) {
        mountainWind.activeUntil = now + settings.windDuration;
        mountainWind.nextAt = now + (selectedDifficulty === "moeilijk"
            ? 3500 + Math.random() * 2500
            : 6500 + Math.random() * 5000);
        mountainWind.direction = Math.random() < 0.5 ? -1 : 1;
        mountainWind.visualOffset = 0;

        showToast(
            selectedDifficulty === "moeilijk"
                ? "🌪️ EXTREME SNEEUWSTORM! De wind duwt je hard opzij!"
                : "💨 Windvlaag! De wind duwt je opzij!",
            "rgba(0, 150, 190, 0.92)"
        );
    }

    if (mountainWind.activeUntil > now) {
        // Duwt de speler in precies dezelfde richting (-1 = links, 1 = rechts) als de pijlen
        player.x += mountainWind.direction * settings.windStrength;

        // Laat de visuele windpijlen meebewegen
        mountainWind.visualOffset += mountainWind.direction * (selectedDifficulty === "moeilijk" ? 10 : 5);
    }
}

function distanceToSegment(px, py, a, b) {
    const vx = b.x - a.x;
    const vy = b.y - a.y;
    const lengthSquared = vx * vx + vy * vy;
    if (lengthSquared === 0) return Math.hypot(px - a.x, py - a.y);

    const t = Math.max(0, Math.min(1,
        ((px - a.x) * vx + (py - a.y) * vy) / lengthSquared
    ));
    const closestX = a.x + t * vx;
    const closestY = a.y + t * vy;
    return Math.hypot(px - closestX, py - closestY);
}

function playerHitByLightning(strike) {
    const px = player.x + player.width / 2;
    const py = player.y + player.height / 2;

    const totalSegments = strike.points.length - 1;
    const currentSegmentFloat = strike.progress * totalSegments;
    const fullSegments = Math.floor(currentSegmentFloat);
    const partialRatio = currentSegmentFloat - fullSegments;

    // 1. Controleer alle segmenten die al volledig zijn verschenen
    for (let i = 0; i < fullSegments; i++) {
        if (distanceToSegment(px, py, strike.points[i], strike.points[i + 1]) < 16) {
            return true;
        }
    }

    // 2. Controleer het onderste puntje dat op dit moment aan het groeien is
    if (fullSegments < totalSegments && partialRatio > 0) {
        const p1 = strike.points[fullSegments];
        const p2 = strike.points[fullSegments + 1];
        const tipPoint = {
            x: p1.x + (p2.x - p1.x) * partialRatio,
            y: p1.y + (p2.y - p1.y) * partialRatio
        };
        if (distanceToSegment(px, py, p1, tipPoint) < 16) {
            return true;
        }
    }

    return false;
}