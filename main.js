import ClickyBoi from './clicky-boi.js';
import './counter-display.js';

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
