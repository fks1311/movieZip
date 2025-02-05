import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Badge from "./Badge";
import Image from "next/image";
import { fetchKMDBData } from "@/utiils/_api";
import Spinner from "@/components/Spinner";

export default function Genre() {
  const router = useRouter();
  const [cur, setCur] = useState({ idx: 0, genre: "전체" });
  const { isLoading, data: movie } = useQuery({
    queryKey: ["genre", cur.genre],
    queryFn: async () => {
      const response = await fetchKMDBData({ dte: 1, genre: cur.genre === "전체" ? "" : cur.genre, count: 500 });
      return response.Data[0].Result;
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
      <Badge cur={cur} setCur={setCur} />
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

/**
 * 500개씩 api 요청
 * 장르 button 상태관리 적용
 * 개봉 최신순 정렬
 */
