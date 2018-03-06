const Card= (() => {
  let displayId = 1;
  return class Card {
    constructor({id, name, img_url}) {
      this.id = id;
      this.name = name;
      this.img_url = img_url;
      this.displayId = displayId++;
      this.cardsPanel = document.getElementById('cards-panel');
      this.renderCard();
      this.flips = [];
    }

    renderCard() {
      let cardImg = document.createElement('img');
      cardImg.setAttribute('class', 'card');
      // cardImg.setAttribute('class', 'ui card');
      cardImg.setAttribute('data-id', this.id);
      cardImg.setAttribute('data-display-id', this.displayId);
      cardImg.setAttribute('src', this.img_url);
      this.cardsPanel.appendChild(cardImg);
    }
  };
})();
