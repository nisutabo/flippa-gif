const Card= (() => {
  let displayId = 1;

  return class Card {
    constructor({id, name, img_url}) {
      this.id = id;
      this.name = name;
      this.img_url = img_url;
      this.displayId = displayId++;

      this.gameContainer = document.getElementsByClassName('game-container-inner')[0];
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
      this.gameContainer.appendChild(cardContainer);
    }

    cardFront() {



      let frontImg = document.createElement('img');
      frontImg.setAttribute('class', 'front');
      frontImg.setAttribute('data-id', this.id);
      frontImg.setAttribute('data-displayid', this.displayId);
      frontImg.setAttribute('src', 'https://pbs.twimg.com/profile_images/544985527997304833/0DNfZq49_400x400.png');
      return frontImg;
    }

    cardBack() {
      let backImg = document.createElement('img');
      backImg.setAttribute('class', 'back');
      backImg.setAttribute('data-id', this.id);
      backImg.setAttribute('alt', this.name);
      backImg.setAttribute('data-displayid', this.displayId);
      backImg.setAttribute('src', this.img_url);
      return backImg;
    }
  };
})();
