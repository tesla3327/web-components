import ClickyBoi from './clicky-boi.js';
import './counter-display.js';

const createElement = (tag, opts, children) => {
  const { props, attrs, events } = opts;
  const element = document.createElement(tag);

  for (let prop in props) {
    element[prop] = props[prop];
  }

  for (let attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }

  for (let event in events) {
    element.addEventListener(event, events[event]);
  }

  if (children && Array.isArray(children)) {
    for (let child of children) {
      element.appendChild(child);
    }
  }

  return element;
};

class AppRoot extends HTMLElement {
  constructor() {
    super();

    this.state = {
      count: 0
    };

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.styleNode = document.createElement('style');
    this.shadow.appendChild(this.styleNode);
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
        justify-content: center;
        width: 100%;
      }

      counter-display {
        text-align: center
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
    const resetButton = createElement(
      'clicky-boi',
      {
        props: {
          text: this.buttonText
        },
        events: {
          'button-click': () => this.setState({ count: 0 })
        }
      }
    );

    const incrementBtn = createElement('clicky-boi', {
      props: { text: '+' },
      events: { 'button-click': () => this.setState({ count: this.state.count + 1}) }
    });

    const decrementBtn = createElement('clicky-boi', {
      props: { text: '-' },
      events: { 'button-click': () => this.setState({ count: this.state.count - 1}) }
    });

    const counter = createElement('counter-display', {
      props: { count: this.state.count }
    });

    const newChild = createElement('div', {}, [
      this.styleNode,
      counter,
      createElement('div', {}, [
        decrementBtn,
        resetButton,
        incrementBtn
      ])
    ]);

    this.styleNode.textContent = this.style;

    if (this.shadow.children[0]) {
      this.shadow.replaceChild(newChild, this.shadow.children[0]);
    } else {
      this.shadow.appendChild(newChild);
    }
  }
}

customElements.define('app-root', AppRoot);
