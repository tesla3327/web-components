class ClickyBoi extends HTMLElement {
  static make(text, handleClick) {
    const newButton = document.createElement('clicky-boi');
    newButton.text = text;
    newButton.addEventListener('button-click', handleClick);

    return newButton;
  }
  
  constructor() {
    super();

    this.props = {};

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.styleNode = document.createElement('style');
    this.button = document.createElement('button');
    this.button.onclick = this.handleClick.bind(this);
    
    this.shadow.appendChild(this.button);
    this.shadow.appendChild(this.styleNode);
  }

  connectedCallback() {
    this.render();
  }

  get style() {
    return `
      button {
        margin: 5px;
        background: white;
        padding: 10px;
        font-size: 16px;
        -webkit-appearance: none;
        border-radius: 5px;
        cursor: ${this.props.disabled ? 'not-allowed' : 'pointer'};
      }
    `;
  }

  set text(val) {
    this.props.text = val;
    this.render();
  }

  set disabled(val) {
    this.props.disabled = val;
    this.render();
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.emit('button-click');
  }

  emit(name) {
    const event = new Event(name, { composed: true });
    this.dispatchEvent(event);
  }

  render() {
    // Rendering is imperative :/
    this.styleNode.textContent = this.style;
    this.button.textContent = this.props.text;
    this.button.disabled = this.props.disabled;
  }
}

customElements.define('clicky-boi', ClickyBoi);

export default ClickyBoi;