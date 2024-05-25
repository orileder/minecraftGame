import GameModule from './gameModule.js';

document.addEventListener("DOMContentLoaded", function() {
    const startGameButton = document.getElementById("start-game-button");
    const introContainer = document.getElementById("intro-container");
    const gameContainer = document.getElementById("game-container");
    const inventoryContainer = document.querySelector('.inventory-container'); 
    console.log("Inventory Container Element:", inventoryContainer);


    console.log("Inventory Container:", inventoryContainer);
const GameModule = new GameModule(gameContainer, inventoryContainer);


    const introModule = new IntroModule(introContainer, gameContainer, GameModule);
    introModule.init();

    startGameButton.addEventListener("click", function() {
        introModule.startGame();
    });
});


class IntroModule {
    
    constructor() {
        this.introContainer = document.getElementById('intro-container');
        this.gameContainer = document.getElementById('game-container');
        this.startButton = document.getElementById('start-game-button');
        this.toolsContainer = document.querySelector('.tools-container');
        this.soundButton = document.getElementById('sound-button');
        this.audio = document.getElementById('myAudio');
    }

    init() {
        this.soundButton.addEventListener('click', () => this.toggleAudio());
        this.startButton.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.hideIntroContainer();
        this.showGameContainer();
    
        const boardContainer = document.querySelector('.board-container');
        this.matrixGame = new GameModule(boardContainer);
        this.matrixGame.initGame();
    }

    hideIntroContainer() {
        this.introContainer.style.display = 'none';
    }

    showGameContainer() {
        this.gameContainer.classList.remove('hidden');
        this.gameContainer.style.display = 'flex';
    }

    toggleAudio() {
        if (this.audio.paused) {
            this.audio.play();
            this.soundButton.textContent = 'Sound: on';
        } else {
            this.audio.pause();
            this.soundButton.textContent = 'Sound: off';
        }
    }
    
}

export default IntroModule;
