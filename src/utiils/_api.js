import { dateFormat } from "./date";
const { default: axios } = require("axios");

const fetchKoficData = async (type, targetDt) => {
  const baseUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice";
  const response = await axios.get(`${baseUrl}/${type}.json`, {
    params: {
      key: process.env.NEXT_PUBLIC_KOFIC_KEY,
      targetDt,
    },
  });
  return response.data;
};

export const kmdb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
const fetchKMDBData = async (value) => {
  const response = await axios.get(`${kmdb_baseURL}`, {
    params: {
      ServiceKey: process.env.NEXT_PUBLIC_KMDB_KEY,
      collection: "kmdb_new2",
      detail: "Y",
      releaseDts: value.dts ? dateFormat(value.dts) : "",
      releaseDte: value.dte ? dateFormat(value.dte) : "",
      listCount: value.count ?? "",
      movieId: value.movieId ?? "",
      movieSeq: value.movieSeq ?? "",
      genre: value.genre ?? "",
      nation: value.nation ?? "",
    },
  });
  return response.data;
};

/* year 라우터에서 사용하는 API */
const fetchKMDB2Data = async (value) => {
  const response = await axios.get(`${kmdb_baseURL}`, {
    params: {
      ServiceKey: process.env.NEXT_PUBLIC_KMDB_KEY,
      collection: "kmdb_new2",
      detail: "Y",
      releaseDts: value.dts ? value.dts : "",
      releaseDte: value.dte ? value.dte : "",
      listCount: value.count ?? "",
    },
  });
  return response.data;
};

export { fetchKoficData, fetchKMDBData, fetchKMDB2Data };
