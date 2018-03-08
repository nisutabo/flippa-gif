class App {
  constructor() {
    this.intro();
  }

  intro() {
    let intro = new Intro();
    this.addStartListener();
  }

  addStartListener() {
    let form = document.getElementById('start-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.categoryId = parseInt(e.target[0].value);
      this.difficulty = e.target[1].value;
      if (this.categoryId && this.difficulty!== "-- Select Difficulty --") {
        this.startGame();
      }
    });
  }

  startGame() {
    this.setGameLayout();
    let game = new Game(this.categoryId, this.setDifficulty());
  }

  setGameLayout() {
    let body = document.getElementsByTagName('body')[0];
    body.innerHTML = `
    <div class="menu-container">
      <div class="item">FLIPPA GIF</div>
      <div class="item">Timer</div>
      <div class="item">Score</div>
      <div class="item">Level: </div>
      <div class="item">Category: </div>
      <div class="item"><i class="big arrow left link icon"></i></div>
    </div>

    <div class="game-container-outer">
      <div class="game-container-inner">
      </div>
    </div>`;
  }

  setDifficulty() {
    let gameContainer = document.getElementsByClassName('game-container-inner')[0];
    gameContainer.classList.add(`${this.difficulty}`);
    switch (this.difficulty) {
    case 'easy':
      return 6;
    case 'medium':
      return 10;
    case 'hard':
      return 21;
    case 'superhard':
      return 36;
    }
  }




}
