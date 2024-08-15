import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import * as params from "@params";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "./lk-player";
import "./lk-track";
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery--getting-started",
    index: 1,

    children: "a",
    pswpModule: () => import("photoswipe"),
  });
  lightbox.init();

  const t = document.querySelector("mwc-textfield-tweak");

  if (t) {
    t.addEventListener("keydown", (e: KeyboardEvent) => {
      console.log("change", e);
      if (e.code === "Enter") {
        document.querySelector("form").submit();
      }
    });
    t.addEventListener("click", (e) => {
      document.querySelector("form").submit();
    });
  }
});

import "./lk-ticket";
import "@material/mwc-textfield";
import "@material/mwc-button";
import "./mwc-textfield-tweak";
@customElement("main-menu")
export class MainMenu extends LitElement {
  // TODO - nicer way to get sections in?
  @state()
  sections: { name: string; title: string }[] = window.sections;

  @state()
  langs: { link: string; name: string }[] = params.langs;

  @state()
  protected _open: boolean = false;

  static styles = css`
    .root {
      background-color: black;
      position: relative;
      z-index: 100;
      padding: 8px;
      position: relative;
    }

    .inline-menu {
      display: flex;
      border: solid 0 white;
      padding: 0;
      padding-top: 8px;
      padding-bottom: 8px;
      margin: 0;
    }

    .inline-menu > li {
      list-style: none;
      font-size: 1.3rem;
      padding: 8px;
    }

    .float-menu {
      display: flex;
      border: solid 0 white;
      padding: 0;
      // padding-top: 20px;
      // padding-bottom: 20px;
      margin: 0;
    }

    .material-icons {
      font-size: 36px;
      color: var(--text-color);
      cursor: pointer;
      display: none;
    }

    .button-holder {
      width: 100%;
      // background-color: black;
      position: relative;
      z-index: 1;
      //padding: 8px;
      display: flex;
      justify-content: space-between;
    }
    .langs-holder {
      padding-top: 16px;
      padding-right: 16px;
    }

    .langs-holder > a {
      color: var(--text-color);
      padding: 8px;
      font-size: 1.4rem;
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: var(--text-color);
      // font-size: 1rem;
      font-weight: 400;
    }
    a:hover {
      color: white;
    }

    .float-menu {
      display: none;
    }

    @media (max-width: 768px) {
      :host {
        width: 100%;
        //height: 40px;
      }

      .material-icons {
        display: inline-block;
      }
      .inline-menu {
        display: none;
      }

      .langs-holder {
        padding-top: 8px;
        padding-right: 0px;
      }

      .langs-holder > a:hover {
        color: white;
      }

      .langs-holder > a {
        padding-left: 0;
        padding-top: 0;
      }

      .float-menu {
        width: 100%;
        display: block;
        position: absolute;
        z-index: 1;
        transition: transform ease-in-out 300ms;
        -webkit-transition: -webkit-transform ease-in-out 300ms;
      }
      .float-menu.closed {
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
      }
      .float-menu.open {
        transform: translateY(0px);
        border-bottom: solid 2px black;
        box-shadow: 0px 0px 40px 20px rgba(0, 0, 0, 0.9);
      }

      li {
        width: 100%;
        list-style: none;

        background-color: var(--text-color);
        border-bottom: solid 1px black;
      }
      .float-menu > li {
        display: flex;
      }
      .float-menu > li > a {
        padding: 16px;
      }
      a {
        // padding: 16px;
        font-size: 1.2rem;
        color: black; // var(--text-color);
      }
    }
  `;

  toggleMenu() {
    this._open = !this._open;
    this.requestUpdate();
  }

  clickLink(name: string) {
    return () => {
      console.log("click link");
      this._open = false;
      this.requestUpdate();
    };
  }

  render() {
    const linkMap = (s) => {
      return html`<li class="" @click=${this.clickLink(s.name)}>
        <a href="#${s.name}">${s.title}</a>
      </li>`;
    };

    return html`
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div class="root">
        <div class="button-holder">
          <span @click=${this.toggleMenu} class="material-icons"
            >${this._open ? "close" : "menu"}</span
          >

          <ul class=${`inline-menu`}>
            ${this.sections.map(linkMap)}
          </ul>
          <div class="langs-holder">
            ${this.langs.map((l) => {
              const currentPath = document.location.pathname;
              const path = l.link.replace(document.location.origin, "");
              console.log("path: ", path, "currentPath:", currentPath);
              const isActive = path === currentPath;
              return html`<a
                class="${isActive ? "current" : ""}"
                href="${l.link}"
                >${l.name}</a
              >`;
            })}
          </div>
        </div>
      </div>
      <ul class=${`float-menu ${this._open ? "open" : "closed"}`}>
        ${this.sections.map(linkMap)}
      </ul>
    `;
  }
}
