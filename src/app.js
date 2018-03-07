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
        if (this.cardsInPlay.length) {
          this.cardsInPlay.push(e.target);
          this.compareFlips(this.cardsInPlay);
          this.cardsInPlay = [];
        } else {
          this.cardsInPlay.push(e.target);
        }
      }
    });
  }

  renderCardFront(elem) {
    let front_url = elem.dataset.imgurl;
    elem.setAttribute('src', front_url);
  }

  compareFlips(cards) {
    const a = cards[0].dataset;
    const b = cards[1].dataset;
    if (a.id === b.id && a.displayid !== b.displayid) {
      this.fadeCards(cards);
    } else {
      console.log(a, b);
      console.log(a.id === b.id);
      console.log(a.displayId !== b.displayId);
      this.renderCardBacks(cards);
    }
  }

  renderCardBacks(elems) {
    setTimeout(() => {
      elems.forEach((c) => {
        c.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');
      });
    }, 1500);
  }

  fadeCards(cards) {
    setTimeout(() => {
      cards.forEach((c) => {
        c.setAttribute('class', 'disabled');
      });
    }, 1500);
  }



}
