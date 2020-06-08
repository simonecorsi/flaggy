const kebab = require("lodash.kebabcase");

const parse = (key, value) => {
  const hyphens = key.length > 1 ? "--" : "-";

  if (typeof value === "boolean") return [`${hyphens}${key}`];

  value = value.toString();
  if (value.includes(" ") || value.includes("$")) {
    return [`${hyphens}${kebab(key)}="${value}"`];
  }
  return [`${hyphens}${kebab(key)}`, value];
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

if (require.main === module) {
  module.exports = main;
} else {
  module.exports = {
    parse,
    main,
  };
}
