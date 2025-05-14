import { XMLParser } from "fast-xml-parser";
import got from "got";
import { produce } from "immer";
import moment from "moment";
import Prism from "prismjs";
import App from "./App.svelte";

const a = 1;

// PrismJS XSS test (CVE-2023-40608, CVE-2023-45133)
Prism.highlight(
  "<img src=x onerror=alert(1)>",
  Prism.languages.javascript,
  "javascript"
);

// moment.js prototype pollution test (CVE-2022-31129)
const polluted = moment.updateLocale("en", { calendar: { sameDay: "h:mm A" } });

// fast-xml-parser XXE test (CVE-2023-28848)
const parser = new XMLParser();
parser.parse(
  '<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]><foo>&xxe;</foo>'
);

// got SSRF test (CVE-2024-24765)
got("http://127.0.0.1");

// immer prototype pollution test (CVE-2023-47132)
produce({ a: 1 }, (draft) => {
  draft.__proto__.polluted = true;
});

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
