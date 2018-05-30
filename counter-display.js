class CounterDisplay extends HTMLElement {
  constructor() {
    super();

    this.props = {};

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.countNode = document.createElement('h1');
    this.styleNode = document.createElement('style');

    this.shadow.appendChild(this.countNode);
    this.shadow.appendChild(this.styleNode);
  }
  
  get color() {
    return this.props.count % 2
      ? 'teal'
      : 'orange';
  }

  get style() {
    return `
      * {
        font-family: 'Helvetica', sans-serif;
        color: ${this.color};
      }

      h1 {
        font-size: 50px;
      }
    `;
  }

  set count(count) {
    this.props.count = count;
    this.render();
  }

  render() {
    this.styleNode.textContent = this.style;
    this.countNode.textContent = this.props.count;
  }
}

customElements.define('counter-display', CounterDisplay);

export default CounterDisplay;