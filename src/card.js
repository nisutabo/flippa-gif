const Card= (() => {
  let displayId = 1;

  return class Card {
    constructor({id, name, img_url}) {
      this.id = id;
      this.name = name;
      this.img_url = img_url;
      this.displayId = displayId++;

      this.cardsPanel = document.getElementById('cards-panel');
      this.renderCardBack();
      this.flips = [];
    }

    renderCardBack() {
      let cardImg = document.createElement('img');
      cardImg.setAttribute('class', 'ui column');
      cardImg.setAttribute('data-id', this.id);
      cardImg.setAttribute('data-displayid', this.displayId);
      cardImg.setAttribute('data-imgurl', this.img_url);
      cardImg.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');
      this.cardsPanel.appendChild(cardImg);
    }
  };
})();
