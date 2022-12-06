const {
  example,
  findStartOfPacketMarker,
  findStartOfMsgMarker,
  input,
} = require(".");

test("6a - find start-of-packet marker", () => {
  expect(findStartOfPacketMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(7);
  expect(findStartOfPacketMarker("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
  expect(findStartOfPacketMarker("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
  expect(findStartOfPacketMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
  expect(findStartOfPacketMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
});

test("6b - find start-of-message marker", () => {
  expect(findStartOfMsgMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19);
  expect(findStartOfMsgMarker("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23);
  expect(findStartOfMsgMarker("nppdvjthqldpwncqszvftbrmjlhg")).toBe(23);
  expect(findStartOfMsgMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29);
  expect(findStartOfMsgMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26);
});
