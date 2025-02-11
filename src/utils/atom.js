import { v1 } from "uuid";

const { atom } = require("recoil");

export const filterAtom = atom({
  key: `filter${v1}`,
  default: { idx: 0, filter: "전체" },
});

const getFullYear = new Date().getFullYear();
export const yearFilterAtom = atom({
  key: `yearFilter${v1}`,
  default: { idx: 0, filter: `${getFullYear}년` },
});
