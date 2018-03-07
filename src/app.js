class App {
  constructor() {
    this.cardsPanel = document.getElementById('cards-panel');
    this.addCardsListeners();
    this.fetchCards();
    this.cardsInPlay = [];
  }

  fetchCards() {
    fetch('http://localhost:3000/api/cards')
    .then(res => res.json())
    .then(json => this.selectCards(json));
  }

  selectCards(cards, num=10) {
    const allCards = cards.slice();
    allCards.sort((a, b) => {
      return 0.5 - Math.random();
    });
    const randomCards = allCards.slice(0, num);
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
    this.cardsPanel.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.parentNode.classList.add("flipped");
        if (this.cardsInPlay.length) {
          this.cardsInPlay.push(e.target);
          this.compareFlips();
        } else {
          this.cardsInPlay.push(e.target);
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
      }, 1500)
    } else {
      setTimeout(() => {
        this.flipBack();
      }, 1500);
    }
  }

  fadeCards() {
      this.cardsInPlay.forEach((c) => {
        c.setAttribute('class', 'disabled');
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
