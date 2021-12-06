const { example, breedLanternfish, breedInvincibleLanternfish } = require(".");

test("06a - breed lanternfish", () => {
  expect(breedLanternfish(example, 80)).toBe(5934);
});

test("06a - breed lanternfish (after refactor)", () => {
  expect(breedInvincibleLanternfish(example, 80)).toBe(5934);
});

test("06b - breed invincible lanternfish", () => {
  expect(breedInvincibleLanternfish(example, 256)).toBe(26984457539);
});
