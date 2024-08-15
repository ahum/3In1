import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
// import "./lk-ticket";

const comingSoon = () => html`<svg
  viewBox="0 0 240 140"
  xmlns="http://www.w3.org/2000/svg"
>
  <style>
    .cs {
      fill: var(--secondary-text-color);
      text-shadow: rgba(0, 0, 0, 0.3) 2px 2px 2px;
      font-size: 35px;
      font-style: italic;
      text-transform: capitalize;
      transform: rotate(-10deg);
    }
  </style>

  <text
    x="44%"
    y="60%"
    dominant-baseline="middle"
    text-anchor="middle"
    textLength="5em"
    class="cs"
  >
    Coming Soon
  </text>
</svg>`;
@customElement("lk-ticket")
export class LkTicket extends LitElement {
  // TODO - nicer way to get sections in?

  // @property({ type: Boolean })
  // public double: boolean = false;

  @property({ type: String })
  public mode: "audio" | "video" | "photos";

  @property({ type: Boolean, attribute: "coming-soon" })
  public comingSoon: boolean;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .root {
      display: block;
      position: relative;
    }

    img {
      width: 100%;
    }

    .slot-holder {
      position: absolute;
      top: 10.5%;
      left: 17.5%;
      right: 17.5%;
      bottom: 11%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    ::slotted(*) {
      width: 100%;
    }

    .audio {
      top: 17.5%;
      left: 23.5%;
      right: 16%;
      bottom: 15.5%;
    }

    .photos {
      top: 8.5%;
    }
    @media (max-width: 768px) {
      .slot-holder {
        position: absolute;
      }
      .audio {
        bottom: 18%;
      }
    }
  `;
  render() {
    const url = `/img/ticket-${this.mode}-800.png`;
    return html`<div class="root">
      <img src="${url}" />
      <div class="slot-holder ${this.mode}">
        ${this.comingSoon ? comingSoon() : html`<slot></slot>`}
      </div>
    </div>`;
  }
}
