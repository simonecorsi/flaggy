const test = require("ava");
const { main, parse } = require("../index");

test("should parse boolean", (t) => {
  t.deepEqual(parse("a", true), ["-a"]);
});

test("should parse long string", (t) => {
  t.deepEqual(parse("txt", "long string"), ['--txt="long string"']);
});

test("should parse substritutible string", (t) => {
  t.deepEqual(parse("txt", "$PWD/home"), ['--txt="$PWD/home"']);
});

test("should kebab key", (t) => {
  t.deepEqual(parse("camelCase", "$PWD/home"), ['--camel-case="$PWD/home"']);
});

test("Should parse an object to argv", (t) => {
  const r = main({
    camelCase: "$PWD/HOME",
    txt: "long string",
    a: true,
  });
  t.deepEqual(r, ['--camel-case="$PWD/HOME"', '--txt="long string"', "-a"]);
});

test("Should parse an object to string flags", (t) => {
  const r = main(
    {
      camelCase: "$PWD/HOME",
      txt: "long string",
      number: 123,
      a: true,
      list: [1, 2],
    },
    true
  );
  t.is(
    r,
    '--camel-case="$PWD/HOME" --txt="long string" --number 123 -a --list 1 --list 2'
  );
});
