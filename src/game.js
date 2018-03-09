class Game {
  constructor(categoryId, cardsNum) {
    this.categoryId = categoryId;
    this.cardsNum = cardsNum;
    this.gameContainer = document.getElementsByClassName('game-container-inner')[0];
    this.scoreElem = document.getElementById('score-value');
    this.scoreChange = document.getElementById('score-change');
    this.fetchCards();
    this.addCardsListeners();
    this.score = 0;
    this.matchedCount = 0;
    this.cardsInPlay = [];
  }

  fetchCards() {
    fetch(`http://localhost:3000/api/categories/${this.categoryId}`)
    .then(res => res.json())
    .then(json => this.selectCards(json.cards));
  }

  selectCards(cards) {
    const allCards = cards.slice();
    allCards.sort((a, b) => {
      return 0.5 - Math.random();
    });
    const randomCards = allCards.slice(0, this.cardsNum);
    this.doubleCards(randomCards);
  }

  doubleCards(cards) {
    let set = [];
    cards.forEach((c) => {
      set.push(c);
      set.push(c);
    });
    this.addCards(set);
  }

  addCards(cards) {
    while (cards.length > 0) {
      const randInd = Math.floor(Math.random() * cards.length);
      const card = cards.splice(randInd, 1)[0];
      new Card(card);
    }
  }

  addCardsListeners() {
    this.gameContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        new Howl({src: ['./sounds/flip.mp3']}).play();
        e.target.parentNode.classList.add("flipped");
        if (this.cardsInPlay.length) {
          this.cardsInPlay.push(e.target.nextElementSibling);
          this.compareFlips();
        } else {
          this.cardsInPlay.push(e.target.nextElementSibling);
        }
      }
    });
  }

  compareFlips() {
    this.checkWin();
    const a = this.cardsInPlay[0].dataset;
    const b = this.cardsInPlay[1].dataset;
    if (a.id === b.id && a.displayid !== b.displayid) {
      setTimeout(() => {
        this.fadeCards();
      }, 1200);
      this.matchedCount += 1;
      this.gainPoints();
      this.checkWin();
    } else {
      setTimeout(() => {
        this.flipBack();
      }, 1200);
      this.losePoint();
    }
  }

  gainPoints(){
    this.scoreChange.innerText = '+20';
    this.scoreChange.className = 'gain';
    this.fade(this.scoreChange);
    this.score += 20;
    this.scoreElem.innerText = this.score;
    this.scoreElem.className = 'gain';
    new Howl({src: ['./sounds/gain.mp3']}).play();
  }

  losePoint() {
    this.scoreChange.innerText = "-1";
    this.scoreChange.className = 'loss';
    this.fade();
    this.score -= 1;
    this.scoreElem.innerText = this.score;
    this.scoreElem.className = 'loss';
  }

  fade() {
   let op = 1;  // initial opacity
   let timer = setInterval(()=> {
     if (op <= 0.1) {
        clearInterval(timer);
     }
     this.scoreChange.style.opacity = op;
     this.scoreChange.style.filter = `alpha(opacity=${op*100})`;
     op -= op * 0.1;
   }, 50);
  }

  fadeCards() {
      this.cardsInPlay.forEach((c) => {
        c.classList.add("disabled");
      });
    this.cardsInPlay = [];
  }

  flipBack() {
    this.cardsInPlay.forEach((c) => {
      c.parentNode.classList.remove("flipped");
    });
    this.cardsInPlay = [];
  }

  checkWin() {
    if (this.matchedCount === this.cardsNum) {
      let outerContainer = this.gameContainer = document.getElementsByClassName('game-container-outer')[0];
      setTimeout(() => {
          outerContainer.innerHTML = `
          <div class="win-container">
            <div class="win-content">
              <h1>WELL DONE!</h1>
                <a href="#" class="back">
                	<img src="https://i.imgur.com/fMZwSSn.gif" alt="You Won!"/>
                <a/>
              <h1>YA FLIPPED 'EM ALL!!!</h1>
            </div>
          </div>`;
      }, 1500);
    }
  }

}
