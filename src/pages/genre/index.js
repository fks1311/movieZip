import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styled from "styled-components";
import Filter from "@/components/Filter";
import Spinner from "@/components/Spinner";
import { fetchKMDBData } from "@/utiils/_api";
import { useRecoilState } from "recoil";
import { filterAtom } from "@/utiils/atom";

export default function Genre() {
  const router = useRouter();
  const [cur, setCur] = useRecoilState(filterAtom);
  const { isLoading, data: movie } = useQuery({
    queryKey: ["genre", cur.filter],
    queryFn: async () => {
      const response = await fetchKMDBData({ genre: cur.filter === "전체" ? "" : cur.filter, count: 500 });
      return response.Data[0].Result;
    },
  });

  const genre = [
    "전체",
    "드라마",
    "액션",
    "코메디",
    "로맨스",
    "범죄",
    "스릴러",
    "공포",
    "SF",
    "판타지",
    "애니메이션",
    "뮤지컬",
  ];

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
      <Filter filter={genre} cur={cur} setCur={setCur} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Frame>
          {movie === undefined ? (
            <>없음</>
          ) : (
            movie
              .filter((data) => data.posters !== "")
              .map((data, idx) => {
                return (
                  <Container key={idx} onClick={() => onClick(data)}>
                    <Image src={data.posters.split("|")[0]} height={700} width={700} unoptimized={true} alt="poster" />
                    <p>{data.title}</p>
                  </Container>
                );
              })
          )}
        </Frame>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: 5em 2em;
`;
const Frame = styled.div`
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
`;
