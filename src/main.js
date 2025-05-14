import App from "./App.svelte";
// Add packages with known CVEs for SCA testing
import ansiRegex from "ansi-regex";
import axios from "axios";
import debug from "debug";
import globParent from "glob-parent";
import Handlebars from "handlebars";
import _ from "lodash";
import { marked } from "marked";
import minimist from "minimist";
import moment from "moment";
import ms from "ms";
import fetch from "node-fetch";
import nthCheck from "nth-check";
import setValue from "set-value";

// Use the packages to make them reachable
const arr = [1, 2, 3];
const doubled = _.map(arr, (n) => n * 2);
console.log("Doubled:", doubled);

const now = moment().format();
console.log("Current time:", now);

const args = minimist(["-a", "foo", "-b", "bar"]);
console.log("Parsed args:", args);

const html = marked("# Hello SCA!");
console.log("Marked HTML:", html);

// Make 2024 CVE packages reachable
axios
  .get("https://example.com")
  .then((r) => console.log("axios:", r.status))
  .catch(() => {});
const template = Handlebars.compile("Hello, {{name}}!");
console.log("Handlebars:", template({ name: "SCA" }));
fetch("https://example.com")
  .then((r) => console.log("node-fetch:", r.status))
  .catch(() => {});

// Make auto-fixable vulnerable packages reachable
const dbg = debug("test:namespace");
dbg("Debug message");
console.log("ms parse:", ms("2 days"));
console.log("glob-parent:", globParent("/foo/bar/*.js"));
console.log("nth-check:", nthCheck(2, 5));
console.log("ansi-regex:", ansiRegex().test("\u001B[4mtest\u001B[0m"));
const obj = {};
setValue(obj, "a.b.c", 123);
console.log("set-value:", obj);

const a = 1;

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
