import { TextField } from "@material/mwc-textfield";
import { Button } from "@material/mwc-button";
import { LitElement, html, css } from "lit";
customElements.define(
  "mwc-textfield-tweak",
  class extends TextField {
    /** @inheritdoc */
    static styles = [
      super.styles,
      css`
        .mdc-text-field {
          border-radius: 4px;
        }
      `,
    ];
  }
);

customElements.define(
  "mwc-button-tweak",
  class extends Button {
    /** @inheritdoc */
    static styles = [
      super.styles,
      css`
        .mdc-button--outlined {
          transition: none;
        }
        .mdc-button--outlined:hover {
          border-color: white;
        }
        .mdc-button--outlined:hover .mdc-button__label {
          color: white;
        }
      `,
    ];
  }
);
