import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { LkTrack, PlayTrackEvent } from "./lk-track";
// import "./lk-ticket";

const svg = html`
  <?xml version="1.0" encoding="UTF-8"?>
  <svg
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 104.54 104.54"
  >
    <defs>
      <style>
        .shape {
          fill: var(--svg-color, green);
        }
      </style>
    </defs>
    <g>
      <path
        class="shape"
        d="M52.27,0C23.4,0,0,23.4,0,52.27s23.4,52.27,52.27,52.27,52.27-23.4,52.27-52.27S81.14,0,52.27,0Zm-14.13,78.05V26.49l44.65,25.78-44.65,25.78Z"
      />
    </g>
  </svg>
`;

// <linearGradient
//   gradientUnits="userSpaceOnUse"
//   y1="986.67"
//   x2="0"
//   y2="-2.623"
// >
//   <stop stop-color="#ffce3b" />
//   <stop offset="1" stop-color="#fef4ab" />
// </linearGradient>
// <linearGradient
//   y1="986.67"
//   x2="0"
//   y2="-2.623"
//   gradientUnits="userSpaceOnUse"
// >
//   <stop stop-color="#ffce3b" />
//   <stop offset="1" stop-color="#ffd762" />
// </linearGradient>
const playing = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
    <defs>
      <clipPath>
        <path
          d="m69.63 12.145h-.052c-22.727-.292-46.47 4.077-46.709 4.122-2.424.451-4.946 2.974-5.397 5.397-.044.237-4.414 23.983-4.122 46.71-.292 22.777 4.078 46.523 4.122 46.761.451 2.423 2.974 4.945 5.398 5.398.237.044 23.982 4.413 46.709 4.121 22.779.292 46.524-4.077 46.761-4.121 2.423-.452 4.946-2.976 5.398-5.399.044-.236 4.413-23.981 4.121-46.709.292-22.777-4.077-46.523-4.121-46.761-.453-2.423-2.976-4.946-5.398-5.397-.238-.045-23.984-4.414-46.71-4.122"
        />
      </clipPath>
      <style>
        .circle {
          fill: var(--svg-color, green);
        }
      </style>
    </defs>
    <path
      d="m4 0c-2.216 0-4 1.784-4 4 0 2.216 1.784 4 4 4 2.216 0 4-1.784 4-4 0-2.216-1.784-4-4-4m-1.5 2.5h1v3h-1v-3m2 0h1v3h-1v-3"
      transform="translate(0-.002)"
      class="circle"
      fill="red"
    />
  </svg>
`;
const oldPplaying = html` <?xml version="1.0" encoding="UTF-8"?>
  <svg
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 104.54 104.54"
  >
    <defs>
      <style>
        .cls-1 {
          fill: var(--svg-playing-color, green);
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

/**
 *
 * "
 * cls-1,.cls-2,.cls-3{fill:none;}.cls-2{stroke-width:8px;}.cls-2,.cls-3{stroke:#000;}
 *
 * .cls-4{fill:#ffb6b6;}
 * .cls-5{fill:#950210;}
 * .cls-6{fill:#bd8a60;}
 * .cls-7{fill:#aa784e;}
 * .cls-3{stroke-miterlimit:4;stroke-width:8px;}.cls-8{fill:url(#radial-gradient);}.cls-9{isolation:isolate;}
 *
 */
@customElement("lk-player")
export class LkPlayer extends LitElement {
  static styles = css`
    :host {
      height: 100%;
    }

    .root {
      overflow: hidden;
      padding: 8px;
      padding-top: 0;
      padding-bottom: 0;
      box-sizing: border-box;
      background-color: rgba(244, 0, 0, 0);
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: space-evenly;
      --svg-color: var(--text-color);
      --svg-playing-color: white;
      cursor: pointer;

      border: solid 0px red;
    }

    .line {
      grid-column-start: 1;
      grid-column-end: 3;
      border-bottom: solid 1px var(--text-color);
      height: 1px;
    }
    .line.hidden {
      border-bottom: solid 2px rgba(0, 0, 0, 0);
    }

    svg {
      vertical-align: text-top;
    }
    .button {
      cursor: pointer;
      flex: 0.15;
    }
    .label {
      flex: 1;
      position: relative;
      top: 5%;
      padding-left: 8px;
      cursor: pointer;
      user-select: none;
      text-transform: capitalize;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      // color: var(--text-color);
      font-size: 1.4rem;
    }

    .label.current {
      // color: var(--text-color);
    }

    .rowWrapper.last-row {
      border-bottom: solid 1px rgba(0, 0, 0, 0);
    }
    .rowWrapper {
      display: flex;
      cursor: pointer;
      align-items: center;
      height: 100%;
      border-bottom: solid 1px var(--text-color);
    }

    .touched {
      color: white; //var(--text-color);
    }

    .touched path {
      fill: white;
    }

    @media (hover: hover) {
      .label:hover {
        color: white; //var(--text-color);
      }
      .rowWrapper:hover {
        color: white;
      }
      .rowWrapper:hover path {
        fill: white;
      }
      .rowWrapper:hover div.label {
        color: white important!;
      }
    }

    @media (max-width: 768px) {
      .label {
        font-size: 1rem;
      }

      .root {
        grid-column-gap: 2px;
        grid-row-gap: 2px;
        line-height: 14px;
      }

      .line {
        border-bottom: solid 1px var(--text-color);
      }
      .line.hidden {
        border-bottom: solid 0px white; //rgba(0, 0, 0, 0);
      }
    }
  `;

  @state()
  private touched: any;

  @state()
  private current: LkTrack;

  @property()
  public songs: LkTrack[] = [];

  constructor() {
    super();
    this.addEventListener("play-track", (e: PlayTrackEvent) => {
      // console.log("play track?", e.detail);
      e.preventDefault();
      e.stopImmediatePropagation();

      if (e.target === this.current) {
        return;
      }
      if (this.current) {
        this.current.stop();
      }

      this.current = e.target as any;
      this.current.play();
    });
    this.addEventListener("stop-track", (e: PlayTrackEvent) => {
      // console.log("stop track?", e.detail);
      e.preventDefault();
      e.stopImmediatePropagation();

      if (this.current) {
        this.current.stop();
      }
      this.current = undefined;
    });
  }

  public playTrack(t: LkTrack) {
    console.log("play track");
    this.current = t;
    this.requestUpdate();
  }

  public toggleTrack(t: LkTrack) {
    if (this.current === t) {
      this.current = undefined;
    } else {
      this.current = t;
    }

    this.requestUpdate();
  }

  public touchStart(s) {
    console.log("touch start");
    this.touched = s;
    this.requestUpdate();
  }
  public touchEnd() {
    console.log("touch end");
    this.touched = undefined;
    this.requestUpdate();
  }

  trackHtml = (s, index) => {
    const isLast = index === this.songs.length - 1;
    const a = this.current?.url === s.url;
    const isTouched = this.touched === s;
    return html` <div
      @touchstart=${() => this.touchStart(s)}
      @touchend=${() => this.touchEnd()}
      class="rowWrapper ${isLast && "last-row"}"
    >
      <div
        @click=${() => this.toggleTrack(s)}
        class="button ${a && `current`} ${isTouched && `touched`}"
      >
        ${a ? playing : svg}
      </div>
      <div
        @click=${() => this.toggleTrack(s)}
        class="label ${a && `current`} ${isTouched && `touched`}"
      >
        ${s.title}
      </div>
    </div>`;
  };

  // <div class="line ${isLast && "hidden"}"></div>
  render() {
    if (this.songs) {
      // console.log("songs?", this.songs, typeof this.songs);
      return html`<div class="root">
        ${this.current &&
        html`<audio autoplay src=${this.current.url}></audio>`}
        ${this.songs.map(this.trackHtml)}
      </div>`;
    }
  }
  // <slot></slot>
}
