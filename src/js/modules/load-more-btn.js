export class Button {
  isVisible = true;

  constructor(btnRef) {
    this.btnRef = btnRef;
  }
  enable() {
    this.btnRef.disabled = false;
  }
  disable() {
    this.btnRef.disabled = true;
  }
  show() {
    this.btnRef.classList.remove('is-hidden');
    this.isVisible = true;
  }
  hide() {
    this.btnRef.classList.add('is-hidden');
    this.isVisible = false;
  }
}
