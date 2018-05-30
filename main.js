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


class AppRoot extends HTMLElement {
  constructor() {
    super();

    this.state = {
      count: 0
    };

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.styleNode = document.createElement('style');
    this.counter = document.createElement('counter-display');

    // Make some buttons
    this.resetButton = ClickyBoi.make('Reset', () => this.setState({ count: 0 }));
    this.incrementBtn = ClickyBoi.make('+', () => this.setState({ count: this.state.count + 1 }));
    this.decrementBtn = ClickyBoi.make('-', () => this.setState({ count: this.state.count - 1 }));

    this.shadow.appendChild(this.styleNode);
    this.shadow.appendChild(this.counter);
    this.shadow.appendChild(this.decrementBtn);
    this.shadow.appendChild(this.resetButton);
    this.shadow.appendChild(this.incrementBtn);
  }

  get buttonText() {
    return this.state.count < 5
      ? 'Reset'
      : 'ITS GONE TOO FAR';
  }

  get style() {
    return `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `;
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.resetButton.text = this.buttonText;
    this.styleNode.textContent = this.style;
    this.counter.count = this.state.count;
    this.decrementBtn.disabled = this.state.count === 0;
  }
}

customElements.define('app-root', AppRoot);
customElements.define('counter-display', CounterDisplay);
customElements.define('clicky-boi', ClickyBoi);
