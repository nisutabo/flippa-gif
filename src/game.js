class Game {
  constructor(categoryId, cardsNum) {
    this.categoryId = categoryId;
    this.cardsNum = cardsNum;
    this.gameContainer = document.getElementsByClassName('game-container-inner')[0];
    this.fetchCards();
    this.addCardsListeners();
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
      this.checkWin();
    } else {
      setTimeout(() => {
        this.flipBack();
      }, 1200);
    }
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
      outerContainer.innerHTML = `
      <div class="win-container">
        <div class="win-content">
          <h1>WELL DONE!</h1>
          <img src="https://m.popkey.co/864d57/y0XbQ.gif" alt="YAY YOU WON!" />
          <h1>YA FLIPPED 'EM ALL!!!</h1>
        </div>
      </div>`;
    };
  }

}
