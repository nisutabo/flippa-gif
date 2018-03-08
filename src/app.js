class App {
  constructor() {
    this.body = document.getElementsByTagName('body')[0];
    // this.intro();
    this.startGame();
  }

  intro() {
    let intro = new Intro();
    this.addStartListener();
  }

  addStartListener() {
    let form = document.findElementById('start-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(e.target);
      // start game
    });
  }

  startGame() {
    this.setGameLayout();
    let game = new Game();
  }

  setGameLayout() {
    this.body.innerHTML = `
    <div class="game-container-outer">
      <div class="game-container-inner medium">
      </div>
    </div>`;
  }
}
