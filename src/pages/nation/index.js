import styled from "styled-components";
import Filter from "@/components/Filter";
import { useRecoilState } from "recoil";
import { filterAtom } from "@/utils/atom";
import { useQuery } from "@tanstack/react-query";
import { fetchKMDBData } from "@/utils/_api";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useRouter } from "next/router";

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
      const filterPoster = response.Data[0].Result.filter((remove) => remove.posters !== "");
      const filterKR = filterPoster.filter((kr) => kr.nation !== "대한민국");
      return cur.filter === "해외" ? filterKR : filterPoster;
    },
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
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: 5em 2em;
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
