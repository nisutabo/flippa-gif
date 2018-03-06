class App {
  constructor() {
    this.cardsPanel = document.getElementById('cards-panel');
    this.addCardsListeners();
    this.fetchCards();
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
    this.addCards(randomCards);
  }

  addCards(cards) {
    for (let i = 0; i < 2; i ++) {
      cards.forEach((card) => new Card(card));
    }
  }

  addCardsListeners() {
    this.cardsPanel.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        this.renderCardFront(e.target);
        if (this.firstFlip) {
          this.secondFlip = e.target.dataset;
          this.compareFlips(this.firstFlip, this.secondFlip);
          this.firstFlip = 0;
        } else {
          this.firstFlip = e.target.dataset;
        }
      }
    });
  }

  renderCardFront(elem) {
    let front_url = elem.dataset.imgurl;
    elem.setAttribute('src', front_url);
  }

  compareFlips(a, b) {
    if (a.id === b.id && a.displayId !== b.displayId) {
      console.log('yay!');
    } else {
      console.log('try again');
      console.log(a);
    }
  }



}
