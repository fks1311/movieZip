import Filter from "@/components/Filter";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { filterAtom } from "@/utils/atom";
import { fetchKMDBData } from "@/utils/_api";
import { useQuery } from "@tanstack/react-query";
import { useAnimate, useMotionValueEvent, useScroll } from "framer-motion";
import { Container, FloatingFilter, Frame, Layout } from "@/styles/common";

export default function Nation() {
  const router = useRouter();
  const nation = ["전체", "국내", "해외"];
  const [cur, setCur] = useRecoilState(filterAtom);
  const nationFilter = (cur) => {
    switch (cur) {
      case "전체":
        return "";
      case "국내":
        return "대한민국";
      default:
        "";
    }
  };

  const { isLoading, data: movie } = useQuery({
    queryKey: ["nation", cur.filter],
    queryFn: async () => {
      const response = await fetchKMDBData({ nation: nationFilter(cur.filter), count: 500 });
      const filterPoster = response.Data[0].Result.filter((remove) => remove.posters !== "").sort(
        (a, b) => b.repRlsDate - a.repRlsDate
      );
      const filterKR = filterPoster
        .filter((kr) => kr.nation !== "대한민국")
        .sort((a, b) => b.repRlsDate - a.repRlsDate);
      return cur.filter === "해외" ? filterKR : filterPoster;
    },
  });

  const [scope, animate] = useAnimate(); // scroll trigger
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    latest >= 10
      ? animate(scope.current, {
          position: "absolute",
          top: `calc(${latest}px + 300px)`,
          right: "5rem",
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
      <Filter filter={nation} cur={cur} setCur={setCur} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Frame>
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
          </Frame>
          <FloatingFilter ref={scope} top={scrollY.current}>
            {cur.filter}
          </FloatingFilter>
        </>
      )}
    </Layout>
  );
}
