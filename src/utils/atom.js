const { atom } = require("recoil");

export const filterAtom = atom({
  key: "filter",
  default: { idx: 0, filter: "전체" },
});

const getFullYear = new Date().getFullYear();
export const yearFilterAtom = atom({
  key: "yearFilter",
  default: { idx: 0, filter: `${getFullYear}년` },
});
