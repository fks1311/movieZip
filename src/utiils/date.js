/**
 * 일별은 하루 전 데이터까지만 나옴
 * 주간/주말에 대한 박스오피스는 전 주 기준으로 나옴
 */
const Min10 = (date) => {
  return date < 10 ? `0${date}` : date;
};

const dateFormat = (period) => {
  const today = new Date();
  const todayAgo = new Date(today.setDate(today.getDate() - period));

  const YYYY = todayAgo.getFullYear();
  const MM = todayAgo.getMonth() + 1;
  const DD = todayAgo.getDate();

  return `${YYYY}${Min10(MM)}${Min10(DD)}`;
};

export { dateFormat };
