const { default: axios } = require("axios");

const fetchKoficDateData = async (type, targetDt) => {
  const baseUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice";
  const response = await axios.get(`${baseUrl}/${type}.json`, {
    params: {
      key: process.env.NEXT_PUBLIC_KOFIC_KEY,
      targetDt,
    },
  });
  return response.data;
};

export { fetchKoficDateData };
