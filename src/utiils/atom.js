const { atom } = require("recoil");

export const filterAtom = atom({
  key: "filter",
  default: { idx: 0, filter: "전체" },
});
