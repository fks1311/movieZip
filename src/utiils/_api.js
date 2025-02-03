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
  // const baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
  // const params = { ServiceKey: process.env.NEXT_PUBLIC_KMDB_KEY, collection: "kmdb_new2", detail: "Y" };
  // const queryString = new URLSearchParams(params).toString();
  // const requrl = `${baseURL}?${queryString}`;
  // const response = await fetch(requrl);
  // const repo = await response.json();

  const baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
  const response = await axios.get(`${baseURL}`, {
    params: {
      ServiceKey: process.env.NEXT_PUBLIC_KMDB_KEY,
      collection: "kmdb_new2",
      detail: "Y",
      releaseDts: value.dts ? dateFormat(value.dts) : "",
      listCount: value.count ?? "",
      movieId: value.movieId,
      movieSeq: value.movieSeq,
    },
  });
  return response.data;
};

export { fetchKoficData, fetchKMDBData };
