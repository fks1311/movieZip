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

const fetchKMDBData = async (value) => {
  const baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
  const response = await axios.get(`${baseURL}`, {
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

export { fetchKoficData, fetchKMDBData };
