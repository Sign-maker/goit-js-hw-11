export class Loader {
  constructor(loaderRef, text) {
    this.loaderRef = loaderRef;
    this.text = text;
  }
  show() {
    this.loaderRef.textContent = '';
    this.loaderRef.classList.add('loader');
  }
  hide() {
    this.loaderRef.classList.remove('loader');
    this.loaderRef.textContent = this.text;
  }
}
