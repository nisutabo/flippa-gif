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

    // renderCardBack() {
    //   let cardImg = document.createElement('img');
    //   cardImg.setAttribute('class', 'ui column');
    //   cardImg.setAttribute('data-id', this.id);
    //   cardImg.setAttribute('data-displayid', this.displayId);
    //   cardImg.setAttribute('data-imgurl', this.img_url);
    //   cardImg.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');
    //   this.cardsPanel.appendChild(cardImg);
    // }

    renderCard() {
      let cardContainer = document.createElement('div');
      cardContainer.setAttribute('class', 'card-container');

      let cardContent = document.createElement('div');
      cardContent.setAttribute('id', 'card');
      cardContainer.appendChild(cardContent);

      let backImg = document.createElement('img');
      backImg.setAttribute('class', 'ui column back');
      backImg.setAttribute('data-id', this.id);
      backImg.setAttribute('data-displayid', this.displayId);
      backImg.setAttribute('src', this.img_url);

      let frontImg = document.createElement('img');
      frontImg.setAttribute('class', 'ui column front');
      frontImg.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');

      cardContent.appendChild(backImg);
      cardContent.appendChild(frontImg);

      this.cardsPanel.appendChild(cardContainer);
    }
  };
})();
