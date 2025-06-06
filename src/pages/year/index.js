import Spinner from "@/components/Spinner";
import Filter from "@/components/Filter";
import { DTE, DTS } from "../../utils/duration";
import { fetchKMDB2Data } from "@/utils/_api";
import { yearFilterAtom } from "@/utils/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useAnimate, useMotionValueEvent, useScroll } from "framer-motion";
import { Container, Frame, Layout } from "@/styles/common";
import { FloatingFilter } from "@/components/FloatingFilter";
import NotFound from "@/components/NotFound";

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
          <Frame>
            {movie === undefined ? (
              <NotFound />
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
          </Frame>
          {movie === undefined ? (
            <></>
          ) : (
            <FloatingFilter ref={scope} top={scrollY.current}>
              {cur.filter}
            </FloatingFilter>
          )}
        </>
      )}
    </Layout>
  );
}
