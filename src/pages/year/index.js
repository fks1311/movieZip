import Spinner from "@/components/Spinner";
import Filter from "@/components/Filter";
import { DTE, DTS } from "./duration";
import { fetchKMDB2Data } from "@/utils/_api";
import { yearFilterAtom } from "@/utils/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styled from "styled-components";
import { useAnimate, useMotionValueEvent, useScroll } from "framer-motion";

export default function Year() {
  const router = useRouter();
  const [cur, setCur] = useRecoilState(yearFilterAtom);
  const years = [
    ...Array.from({ length: 5 }, (_, i) => 2025 - i),
    ...Array.from({ length: 5 }, (_, i) => 2020 - i * 10),
  ].map((year) => (year === 1980 ? `${year}년대 이전` : year < 2020 ? `${year}년대` : `${year}년`));

  const { isLoading, data: movie } = useQuery({
    queryKey: ["year", cur.filter],
    queryFn: async () => {
      const response = await fetchKMDB2Data({
        dts: cur.filter === "1980년대 이전" ? "" : DTS(cur.filter),
        dte: DTE(cur.filter),
        count: 500,
      });
      const filterPoster = response.Data[0].Result.filter((remove) => remove.posters !== "");
      const sort = filterPoster.sort((a, b) => b.repRlsDate - a.repRlsDate);
      return sort;
    },
  });

  const [scope, animate] = useAnimate(); // scroll trigger
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    latest >= 10
      ? animate(scope.current, {
          position: "absolute",
          top: `calc(${latest}px + 300px)`,
          right: "3rem",
          color: "white",
          opacity: "1",
        })
      : animate(scope.current, { opacity: "0" });
  });

  const onClick = (movie) => {
    router.push(
      {
        pathname: `detail/${movie.movieSeq}`,
        query: { movieData: JSON.stringify(movie) },
      },
      `/detail/${movie.movieId}/${movie.movieSeq}`
    );
  };

  return (
    <Layout>
      <Filter filter={years} cur={cur} setCur={setCur} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Content>
            {movie === undefined ? (
              <>없음</>
            ) : (
              movie.map((data, idx) => {
                return (
                  <Container key={idx} onClick={() => onClick(data)}>
                    <Image src={data.posters.split("|")[0]} height={700} width={700} unoptimized={true} alt="poster" />
                    <p>{data.title}</p>
                  </Container>
                );
              })
            )}
          </Content>
          <FloatingFilter ref={scope} top={scrollY.current}>
            {cur.filter}
          </FloatingFilter>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: 5em 2em;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  padding-top: 3rem;
  img {
    height: 45vh;
    width: 20vw;
    border-radius: 10px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: HakgyoansimWoojuR;
  font-size: 1.3rem;
  color: white;
  letter-spacing: 0.3rem;
  max-width: 20vw;
`;
const FloatingFilter = styled.div`
  font-size: 1.5rem;
`;
