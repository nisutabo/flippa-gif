class App {
  constructor() {
    this.body = document.getElementsByTagName('body')[0];
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
        this.launchGame();
      }
    });
  }

  setCategory() {
    switch (this.categoryId) {
    case 1:
      return 'Animals';
    case 2:
      return 'Celebrities';
    case 3:
      return 'TV Shows';
    case 4:
      return 'Nicolas Cage';
    }
  }

  launchGame() {
    this.setGameLayout();
    this.addGameListeners();
    new Game(this.categoryId, this.setDifficulty());
    this.startTimer();
  }

  setGameLayout() {
    this.body.innerHTML = `
    <div class="menu-container">
      <div class="item">FLIPPA GIF</div>
      <div id="timer" class="item">0 hr, 0 min, 0 sec</div>
      <div class="item">Score: </div>
      <div id="show" class="w3-container w3-center w3-animate-top"></div>
      <div id="score-value" class="points">0</div>

      <div class="item">Category: ${this.setCategory()}</div>
      <div class="item"><i class="big repeat link icon restart"></i></div>
      <div class="item"><i class="big arrow left link icon back"></i></div>
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

  startTimer() {
    window.setInterval(this.runTimer, 1000);
  }

  runTimer() {
    let timer = document.getElementById('timer');
    let arr = timer.innerHTML.split(', ');
    let hour = parseInt(arr[0].split(' ')[0]);
    let min = parseInt(arr[1].split(' ')[0]);
    let sec = parseInt(arr[2].split(' ')[0]);
    if (sec === 59) {
      if (min === 59) {
        hour++;
        min = 0;
      } else {
        min++;
      }
      sec = 0;
    } else {
      sec++;
    }
    timer.innerHTML = `${hour} hr, ${min} min, ${sec} sec`;
  }

  addGameListeners() {
    this.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('back')) {
        this.intro();
      }
      if (e.target.classList.contains('restart')) {
        this.launchGame();
      }
    });
  }
}
