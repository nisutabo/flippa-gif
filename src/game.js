class Game {
  constructor(categoryId, difficulty) {
    this.categoryId = categoryId;
    this.cardsNum = difficulty;
    this.gameContainer = document.getElementsByClassName('game-container-inner')[0];
    this.addCardsListeners();
    this.fetchCards();
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
    const a = this.cardsInPlay[0].dataset;
    const b = this.cardsInPlay[1].dataset;
    if (a.id === b.id && a.displayid !== b.displayid) {
      setTimeout(() => {
        this.fadeCards();
      }, 1200);
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

}
