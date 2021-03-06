"use strict";
const dashify = require("./libs/dashify");

const parse = (key, value) => {
  const hyphens = key.length > 1 ? "--" : "-";

  if (typeof value === "boolean") return [`${hyphens}${key}`];

  value = value.toString();
  if (value.includes(" ") || value.includes("$")) {
    return [`${hyphens}${dashify(key)}="${value}"`];
  }
  return [`${hyphens}${dashify(key)}`, value];
};

function main(opts = {}, stringify = false) {
  const parsed = Object.entries(opts).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      value.map((v) => (acc = acc.concat(parse(key, v))));
    } else {
      acc = acc.concat(parse(key, value));
    }
    return acc;
  }, []);
  if (stringify) return parsed.join(" ");
  return parsed;
}

module.exports =
  process.env.NODE_ENV !== "test"
    ? main
    : {
        parse,
        main,
      };
