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
    }

    renderCard() {
      let cardContainer = document.createElement('div');
      cardContainer.setAttribute('class', 'card-container');
      let cardContent = document.createElement('div');
      cardContent.setAttribute('id', 'card');
      cardContainer.appendChild(cardContent);
      cardContent.appendChild(this.cardFront());
      cardContent.appendChild(this.cardBack());
      this.cardsPanel.appendChild(cardContainer);
    }

    cardFront() {
      let frontImg = document.createElement('img');
      frontImg.setAttribute('class', 'ui column front');
      frontImg.setAttribute('data-id', this.id);
      frontImg.setAttribute('data-displayid', this.displayId);
      frontImg.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');
      return frontImg;
    }

    cardBack() {
      let backImg = document.createElement('img');
      backImg.setAttribute('class', 'ui column back');
      backImg.setAttribute('data-id', this.id);
      backImg.setAttribute('data-displayid', this.displayId);
      backImg.setAttribute('src', this.img_url);
      return backImg;
    }
  };
})();
