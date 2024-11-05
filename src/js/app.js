import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { SplashScreen } from "@capacitor/splash-screen";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

      root.innerHTML = `
        <div>
          <main>
            <p>
              <button class="button" id="start">Start (clicked <span id="start-click">0</span> times)</button>
            </p>
            <p>
              <button class="button" id="stop">Stop (clicked <span id="stop-click">0</span> times)</button>
            </p>
            <p>Listening before start: <span id="is-listening-before"></span></p>
            <p>Listening after start: <span id="is-listening-after"></span></p>
            <p id="text"></p>
          </main>
        </div>
    `;
    }

    connectedCallback() {
      const self = this;

      const text = self.shadowRoot.querySelector("#text");
      const startClick = self.shadowRoot.querySelector("#start-click");
      const stopClick = self.shadowRoot.querySelector("#stop-click");
      const isListeningBefore = self.shadowRoot.querySelector(
        "#is-listening-before"
      );
      const isListeningAfter = self.shadowRoot.querySelector(
        "#is-listening-after"
      );

      let startClickCount = 0;
      let stopClickCount = 0;

      self.shadowRoot
        .querySelector("#start")
        .addEventListener("click", async function (_e) {
          startClickCount++;
          startClick.innerHTML = startClickCount;

          isListeningBefore.innerHTML = `${
            (await SpeechRecognition.isListening()).listening
          } (start button counter: ${startClickCount})`;

          await SpeechRecognition.requestPermissions();

          await SpeechRecognition.start({
            language: "de-DE",
            partialResults: true,
            popup: false,
            maxResults: 1,
          });

          SpeechRecognition.addListener("partialResults", (data) => {
            text.innerHTML = JSON.stringify(data);
          });

          isListeningAfter.innerHTML = `${
            (await SpeechRecognition.isListening()).listening
          } (start button counter: ${startClickCount})`;
        });

      self.shadowRoot
        .querySelector("#stop")
        .addEventListener("click", async function (_e) {
          stopClickCount++;
          stopClick.innerHTML = stopClickCount;

          await SpeechRecognition.stop();
        });
    }
  }
);
