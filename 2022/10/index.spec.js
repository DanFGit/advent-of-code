const { example, runClockCircuit, input } = require(".");

test("9a - find the six interesting signal strengths", () => {
  expect(runClockCircuit(example).strength).toBe(13140);
});

// prettier-ignore
test("9b - find letters on screen", () => {
  expect(runClockCircuit(example).pixels).toStrictEqual([
    true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false,
    true, true, true, false, false, false, true, true, true, false, false, false, true, true, true, false, false, false, true, true, true, false, false, false, true, true, true, false, false, false, true, true, true, false, false, false, true, true, true, false,
    true, true, true, true, false, false, false, false, true, true, true, true, false, false, false, false, true, true, true, true, false, false, false, false, true, true, true, true, false, false, false, false, true, true, true, true, false, false, false, false,
    true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false,
    true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true,
    true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false,
  ]);
});
