import { dateFormat } from "@/utiils/date";

const getFullYear = new Date().getFullYear();

export const DTS = (filter) => {
  const sel_year = Number(filter.replace(/\D/g, ""));
  return `${sel_year}0101`;
};

export const DTE = (filter) => {
  const sel_year = Number(filter.replace(/\D/g, ""));
  const endDate = dateFormat(0);
  const duration = sel_year === getFullYear ? endDate : sel_year >= 2020 ? `${sel_year}1231` : `${sel_year + 9}1231`;

  return duration;
};
