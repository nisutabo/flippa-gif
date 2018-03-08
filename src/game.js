class Game {
  constructor(categoryId, cardsNum) {
    this.categoryId = categoryId;
    this.cardsNum = cardsNum;
    this.gameContainer = document.getElementsByClassName('game-container-inner')[0];
    this.fetchCards();
    this.addCardsListeners();
    this.matchedCount = 0;
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
    this.checkWin();
    const a = this.cardsInPlay[0].dataset;
    const b = this.cardsInPlay[1].dataset;
    // SCORE KEEPING SECTION
    let score = document.getElementById("score-value");
    let show = document.getElementById("show");
    let scoreValue = parseInt(score.innerHTML);


    if (a.id === b.id && a.displayid !== b.displayid) {

      setTimeout(() => {
        this.fadeCards();
      }, 1200);
      this.matchedCount += 1;


      show.innerHTML = "+20"
      show.classList.remove('loss')
      show.classList.add('gain')
      this.fade(show)
      scoreValue += 20
      score.classList.remove('loss')
      score.classList.add('gain')
      score.innerHTML = scoreValue


      this.checkWin();
    } else {
      setTimeout(() => {
        this.flipBack();
      }, 1200);


      scoreValue -= 1
      show.innerHTML = "-1"
      show.classList.remove('gain')
      show.classList.add('loss')
      this.fade(show)
      score.classList.remove('gain')
      score.classList.add('loss')
      score.innerHTML = scoreValue
    }
  }

  fade(element) {
   var op = 1;  // initial opacity
   var timer = setInterval(function () {
       if (op <= 0.1){
           clearInterval(timer);
       }
       element.style.opacity = op;
       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
       op -= op * 0.1;
   }, 50);
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

  checkWin() {
    if (this.matchedCount === this.cardsNum) {
      let outerContainer = this.gameContainer = document.getElementsByClassName('game-container-outer')[0];
      setTimeout(() => {
          outerContainer.innerHTML = `
          <div class="win-container">
            <div class="win-content">
              <h1>WELL DONE!</h1>
                <a href="#" class="back">
                	<img src="https://i.imgur.com/fMZwSSn.gif" alt="You Won!"/>
                <a/>
              <h1>YA FLIPPED 'EM ALL!!!</h1>
            </div>
          </div>`;
      }, 1500);
    }
  }

}
