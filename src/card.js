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
      //let body = document.getElementsByTagName('body')
      // let cardImg = document.createElement('img');
      // let divSquare = document.createElement('div')
      // let divContent = document.createElement('div');
      //
      // cardImg.setAttribute('class', 'same-size');
      // cardImg.setAttribute('data-id', this.id);
      // cardImg.setAttribute('data-displayid', this.displayId);
      // cardImg.setAttribute('data-imgurl', this.img_url);
      // cardImg.setAttribute('src', 'http://moziru.com/images/leaf-clipart-cartoon-16.jpg');
      // divContent.appendChild(cardImg);
      // divSquare.appendChild(divContent);
      // this.cardsPanel.appendChild(divSquare);

      //this.cardsPanel.appendChild(cardImg);

      let cardPanel =  `
      <div class="square">
          <div class="content">
            <img class="same-size" src="${this.img_url}" alt="panther">
          </div>
        </div>
      `
      document.getElementById('cards-panel').innerHTML += cardPanel
    }
  };
})();
