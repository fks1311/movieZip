import { fetchKMDB2Data, fetchKoficData } from "@/utils/_api";
import { dateFormat } from "@/utils/date";
import styled from "styled-components";

export default function Search({ ko, km, filter }) {
  console.group();
  console.log("KOFIC : ", ko);
  console.log("KMDB : ", km);
  console.log(">>", filter);
  console.groupEnd();

  return <Layout></Layout>;
}

export async function getServerSideProps(params) {
  const search = params.query.search;
  const [kofic, kmdb] = await Promise.all([
    fetchKoficData({ type: "movie/searchMovieList", movieNm: search }),
    fetchKMDB2Data({ dts: "19300101", dte: dateFormat(1), count: 500 }),
  ]);
  const filter = kmdb.Data[0].Result.filter((kmdbCode) =>
    kofic.movieListResult.movieList.find((nm) => nm.movieNm === kmdbCode.title.replace(/^ /, ""))
  );

  const ko = kofic.movieListResult.movieList;
  const km = kmdb.Data[0].Result;

  return { props: { filter, ko, km } };
}

const Layout = styled.div``;
