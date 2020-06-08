const kebab = require("lodash.kebabcase");

const parse = (key, value) => {
  value = value.toString();
  if (key.length === 1) {
    return [`-${key}`, value];
  }
  if (value.includes(" ") || value.includes("$")) {
    return [`--${kebab(key)}="${value}"`];
  }
  return [`--${kebab(key)}`, value];
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

module.exports = main;
