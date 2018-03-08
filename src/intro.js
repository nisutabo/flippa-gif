class Intro {
  constructor() {
    this.setIntroLayout();
    this.addForm();
    this.addFormListener();
  }

  setIntroLayout() {
    body.innerHTML = `
    <div class="intro-outer">
      <div class="intro-inner">
        <div class="intro-content">
          <h1>FLIPPA GIF</h1>
          <a class="btn" href="#">Start</a>
        </div>
      </div>
    </div>`;
  }

  addForm() {
    let introContent = document.findElementsByClass('intro-content')[0];
    let formHTML = ``;
    // add form - category, difficulty
    // id: start-form
    //display difficulty choices
    //listener - render new Game based on difficulty
    introContent.innerHTML = form;
  }

}
