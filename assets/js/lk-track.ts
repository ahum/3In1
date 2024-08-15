import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

export type PT = { url: string; title: string };
export class PlayTrackEvent extends CustomEvent<PT> {
  constructor(url, title) {
    super("play-track", { bubbles: true, detail: { url, title } });
  }
}
export class StopTrackEvent extends CustomEvent<PT> {
  constructor(url, title) {
    super("stop-track", { bubbles: true, detail: { url, title } });
  }
}

const svg = html`
  <?xml version="1.0" encoding="UTF-8"?>
  <svg
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 104.54 104.54"
  >
    <g id="Layer_1-2">
      <path
        d="M52.27,0C23.4,0,0,23.4,0,52.27s23.4,52.27,52.27,52.27,52.27-23.4,52.27-52.27S81.14,0,52.27,0Zm-14.13,78.05V26.49l44.65,25.78-44.65,25.78Z"
      />
    </g>
  </svg>
`;

const playing = html` <?xml version="1.0" encoding="UTF-8"?>
  <svg
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 104.54 104.54"
  >
    <defs>
      <style>
        .cls-1 {
          --secondary-text-color: #960411;
          fill: var(--secondary-text-color, green);
        }
      </style>
    </defs>
    <g>
      <path
        class="cls-1"
        d="M52.27,0C23.4,0,0,23.4,0,52.27s23.4,52.27,52.27,52.27,52.27-23.4,52.27-52.27S81.14,0,52.27,0Zm-14.13,78.05V26.49l44.65,25.78-44.65,25.78Z"
      />
    </g>
  </svg>`;

@customElement("lk-track")
export class LkTrack extends LitElement {
  @state()
  public isPlaying: boolean = false;

  @property()
  public title: string;
  @property()
  public url: string;

  static styles = css`
    :host([is-last="true"]) {
      border-bottom: solid 3px rgba(0, 0, 0, 0);
    }
    :host {
      display: block;
      background-color: rgba(100, 50, 9, 0);
      width: 100%;
      border-bottom: solid 2px black;
    }
    .root {
      display: grid;
      align-items: center;
      padding: 0px;
    }

    .label {
      flex: 1;
      cursor: pointer;
      text-select: none;
      text-transform: capitalize;
      display: inline-block;
      color: black;
      font-size: 1rem;
      // line-height: 2rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      // height: 50px;
    }

    .is-playing {
      color: var(--secondary-text-color, purple);
    }

    .button-holder {
      flex: 1;
      min-width: 30px;
      cursor: pointer;
      padding-right: 10px;
    }

    @media;
  `;

  private click() {
    this.dispatchEvent(new PlayTrackEvent(this.url, this.title));
  }

  public play() {
    console.log("play!!", this.title);
    const a = this.shadowRoot.querySelector("audio");
    this.isPlaying = true;
    a.play();
    this.requestUpdate();
  }
  public stop() {
    // console.log("stop!!", this.title);
    const a = this.shadowRoot.querySelector("audio");
    this.isPlaying = false;
    a.pause();
    this.requestUpdate();
  }

  private toggle() {
    if (this.isPlaying) {
      this.dispatchEvent(new StopTrackEvent(this.url, this.title));
    } else {
      this.dispatchEvent(new PlayTrackEvent(this.url, this.title));
    }
  }
  render() {
    return html`<div class="root">
      <div class="button-holder" @click=${this.toggle}>
        ${this.isPlaying ? playing : svg}
      </div>
      <span
        @click=${this.click}
        class="${`label ${this.isPlaying && "is-playing"}`}"
        >${this.title}</span
      >
      <audio src=${this.url}></audio>
    </div>`;
  }
}
