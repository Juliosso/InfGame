// ============================================================================
// LEVEL-OPBOUW (30 PLATEAUS), INSTELLINGEN & GEDEELDE SPELSTATUS
// ============================================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startOverlay = document.getElementById("start-overlay");
const quizOverlay = document.getElementById("quiz-overlay");
const winOverlay = document.getElementById("win-overlay");
const qCategory = document.getElementById("q-category");
const qText = document.getElementById("q-text");
const answersContainer = document.getElementById("answers-container");
const hintBtn = document.getElementById("hint-btn");
const feedbackToast = document.getElementById("feedback-toast");

const worldHeight = 3300;
const requiredScoreToFinish = 9;

const platforms = [
    // Begingrond helemaal onderaan over de volledige breedte (960px)
    { x: 0, y: 3200, width: 960, height: 100, safe: true },

    // Onderste helft (15 plateaus: 3060 t/m 1660)
    { x: 180, y: 3060, width: 150, height: 20, safe: true },
    { x: 400, y: 2960, width: 150, height: 20, safe: true }, // Vraag 1
    { x: 630, y: 2860, width: 150, height: 20, safe: true },
    { x: 330, y: 2760, width: 150, height: 20, safe: true }, // Vraag 2
    { x: 130, y: 2660, width: 150, height: 20, safe: true },
    { x: 380, y: 2560, width: 150, height: 20, safe: true }, // Vraag 3
    { x: 580, y: 2460, width: 150, height: 20, safe: true },
    { x: 280, y: 2360, width: 150, height: 20, safe: true }, // Vraag 4
    { x: 530, y: 2260, width: 150, height: 20, safe: true },
    { x: 330, y: 2160, width: 150, height: 20, safe: true }, // Vraag 5
    { x: 160, y: 2060, width: 150, height: 20, safe: true },
    { x: 430, y: 1960, width: 150, height: 20, safe: true }, // Vraag 6
    { x: 630, y: 1860, width: 150, height: 20, safe: true },
    { x: 380, y: 1760, width: 150, height: 20, safe: true }, // Vraag 7
    { x: 230, y: 1660, width: 150, height: 20, safe: true },

    // Bovenste helft (15 plateaus: 1560 t/m 160)
    { x: 460, y: 1560, width: 150, height: 20, safe: true }, // Vraag 8
    { x: 220, y: 1460, width: 150, height: 20, safe: true },
    { x: 500, y: 1360, width: 150, height: 20, safe: true }, // Vraag 9
    { x: 680, y: 1260, width: 150, height: 20, safe: true },
    { x: 400, y: 1160, width: 150, height: 20, safe: true }, // Vraag 10
    { x: 180, y: 1060, width: 150, height: 20, safe: true },
    { x: 440, y: 960,  width: 150, height: 20, safe: true }, // Vraag 11
    { x: 640, y: 860,  width: 150, height: 20, safe: true },
    { x: 360, y: 760,  width: 150, height: 20, safe: true }, // Vraag 12
    { x: 160, y: 660,  width: 150, height: 20, safe: true },
    { x: 420, y: 560,  width: 150, height: 20, safe: true }, // Vraag 13
    { x: 630, y: 460,  width: 150, height: 20, safe: true },
    { x: 380, y: 360,  width: 150, height: 20, safe: true }, // Vraag 14
    { x: 200, y: 260,  width: 150, height: 20, safe: true },
    { x: 400, y: 160,  width: 150, height: 20, safe: true }, // Vraag 15

    // Finish helemaal bovenaan
    { x: 320, y: 50, width: 320, height: 30, isGoal: true }
];

// 15 vraagposities op elk tweede plateau
const vraagPosities = [
    { x: 456, y: 2920, w: 38, h: 38 }, // Op plateau y=2960
    { x: 386, y: 2720, w: 38, h: 38 }, // Op plateau y=2760
    { x: 436, y: 2520, w: 38, h: 38 }, // Op plateau y=2560
    { x: 336, y: 2320, w: 38, h: 38 }, // Op plateau y=2360
    { x: 386, y: 2120, w: 38, h: 38 }, // Op plateau y=2160
    { x: 486, y: 1920, w: 38, h: 38 }, // Op plateau y=1960
    { x: 436, y: 1720, w: 38, h: 38 }, // Op plateau y=1760
    { x: 516, y: 1520, w: 38, h: 38 }, // Op plateau y=1560
    { x: 556, y: 1320, w: 38, h: 38 }, // Op plateau y=1360
    { x: 456, y: 1120, w: 38, h: 38 }, // Op plateau y=1160
    { x: 496, y: 920,  w: 38, h: 38 }, // Op plateau y=960
    { x: 416, y: 720,  w: 38, h: 38 }, // Op plateau y=760
    { x: 476, y: 520,  w: 38, h: 38 }, // Op plateau y=560
    { x: 436, y: 320,  w: 38, h: 38 }, // Op plateau y=360
    { x: 456, y: 120,  w: 38, h: 38 }  // Op plateau y=160
];

// Vallende gevaren per moeilijkheidsgraad
const difficultySettings = {
    makkelijk: {
        hazardInterval: 11,
        projectileCount: 6,
        projectileSpeed: 0.85,
        windStrength: 0.35, // Lichte duw
        windDuration: 2000,
        lightningCount: 4
    },
    gemiddeld: {
        hazardInterval: 8,
        projectileCount: 10,
        projectileSpeed: 1.1,
        windStrength: 0.65, // Duidelijke duw
        windDuration: 3000,
        lightningCount: 6
    },
    moeilijk: {
        hazardInterval: 5,
        projectileCount: 15,
        projectileSpeed: 1.65,
        windStrength: 1.15, // Sterke stormduw
        windDuration: 5000,
        lightningCount: 10
    }
};

function getDifficultySettings() {
    return difficultySettings[selectedDifficulty] || difficultySettings.gemiddeld;
}

const themeNames = {
    space: "🚀 Space",
    middeleeuwen: "⚔️ Middeleeuwen",
    berg: "🏔️ Bergbeklimmen",
    boerderij: "🚜 Boerderij"
};

const difficultyNames = {
    makkelijk: "Makkelijk",
    gemiddeld: "Normaal",
    moeilijk: "Moeilijk"
};

// Gedeelde spelstatus
let toastTimeout = null;
let lastFinishLockToastAt = 0;
let gameLoopStarted = false;
let hardModeUnlocked = false;

let customCharacterAsset = null;
let customCharacterUrl = null;
let customCharacterVideo = null;

let playerName = "Speler";
let selectedDifficulty = "gemiddeld";
let selectedTheme = "space";

let questions = [];
let currentQuestionObj = null;
let hintsLeft = 3;

let score = 0;
let correctCount = 0;
let wrongCount = 0;
let activeSecondsPlayed = 0;
let timerInterval = null;
let elapsedTimeStr = "00:00";
let isPaused = true;

// Thema-gevaren
let projectiels = [];
let projectileSpawnTimeouts = [];
let lightningStrikes = [];
let farmBlackoutUntil = 0;

const mountainWind = {
    activeUntil: 0,
    nextAt: 0,
    direction: 1,
    visualOffset: 0
};

const startCheckpoint = { x: 180, y: 3150 };

// Vaste, identieke beweegsnelheid en sprongkracht voor elk thema
const FIXED_PLAYER_SPEED = 4.2;
const FIXED_PLAYER_GRAVITY = 0.55;
const FIXED_PLAYER_JUMP = -11.5;

const player = {
    x: startCheckpoint.x,
    y: startCheckpoint.y,
    width: 26,
    height: 28,
    speed: FIXED_PLAYER_SPEED,
    dx: 0,
    dy: 0,
    jumpPower: FIXED_PLAYER_JUMP,
    gravity: FIXED_PLAYER_GRAVITY,
    grounded: false,
    canDoubleJump: true,
    jumpCount: 0,
    maxJumps: 2
};

let cameraY = worldHeight - canvas.height;

const backgroundParticles = [];
for (let i = 0; i < 150; i++) {
    backgroundParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * worldHeight,
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.25 + 0.1
    });
}

let keys = { right: false, left: false, up: false };