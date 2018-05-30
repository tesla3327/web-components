class CounterDisplay extends HTMLElement {
  constructor() {
    super();
    this.props = {};
    this.shadow = this.attachShadow({ mode: 'closed' });
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
    this.shadow.innerHTML = `
      <style>
        ${this.style}
      </style>
      <h1>${this.props.count}</h1>
    `;
  }
}

customElements.define('counter-display', CounterDisplay);

export default CounterDisplay;