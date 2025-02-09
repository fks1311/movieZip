import { motion } from "framer-motion";
import { line_break } from "@/utils/lineBreak";
import { fetchKMDBData, fetchKoficData } from "@/utils/_api";
import { dateFormat } from "@/utils/date";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

export default function Home({ dailyFilter, weeklyFilter }) {
  const router = useRouter();
  const daily = dailyFilter.sort((a, b) => a.rank - b.rank);
  const weekly = weeklyFilter.sort((a, b) => a.rank - b.rank);

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
    <Main>
      <Title>
        <h1>MOVIEZIP</h1>
        <h1>BOXOFFICE</h1>
      </Title>
      <MovieContainer>
        <MovieFrame>
          <MovieType>{line_break("일별 박스오피스")}</MovieType>
          <MovieList>
            {daily.map((movie, idx) => (
              <Movie key={idx} onClick={() => onClick(movie)}>
                <Image src={movie.posters.split("|")[0]} height={700} width={700} unoptimized={true} alt="poster" />
                <MovieItem sel={movie.rating}>
                  <div className="rank">{movie.rank}</div>
                  <div className="info">
                    <span className="name">{movie.movieNm}</span>
                    <p>오늘 관객수 : {movie.audiCnt}</p>
                    <p>누적 관객수 : {movie.audiAcc}</p>
                    <span id="rating">{movie.rating}</span>
                  </div>
                </MovieItem>
              </Movie>
            ))}
          </MovieList>
        </MovieFrame>
        <MovieFrame>
          <div className="weekyType">
            <MovieType>{line_break("주말 박스오피스")}</MovieType>
            {/* <p>{weeklyBoxOffice.showRange}</p> */}
            <p>* 지난 주 기준</p>
          </div>
          <MovieList>
            {weekly.map((movie, idx) => (
              <Movie key={idx} onClick={() => onClick(movie)}>
                <Image src={movie.posters.split("|")[0]} height={700} width={700} unoptimized={true} alt="poster" />
                <MovieItem sel={movie.rating}>
                  <div className="rank">{movie.rank}</div>
                  <div className="info">
                    <span className="name">{movie.movieNm}</span>
                    <p>오늘 관객수 : {movie.audiCnt}</p>
                    <p>누적 관객수 : {movie.audiAcc}</p>
                    <span id="rating">{movie.rating}</span>
                  </div>
                </MovieItem>
              </Movie>
            ))}
          </MovieList>
        </MovieFrame>
      </MovieContainer>
    </Main>
  );
}

export async function getStaticProps() {
  const dailyDate = dateFormat(1);
  const weeklyDate = dateFormat(7);

  const [daily, weekly, kmdb] = await Promise.all([
    fetchKoficData({ type: "boxoffice/searchDailyBoxOfficeList", targetDt: dailyDate }),
    fetchKoficData({ type: "boxoffice/searchWeeklyBoxOfficeList", targetDt: weeklyDate }),
    fetchKMDBData({ dts: 90, count: 300 }),
  ]);

  const dailyFilter = kmdb.Data[0].Result.filter((kmdbCode) =>
    daily.boxOfficeResult.dailyBoxOfficeList.find((nm) => nm.movieNm === kmdbCode.title.replace(/^ /, ""))
  ).map((item1) => ({
    ...item1,
    ...daily.boxOfficeResult.dailyBoxOfficeList.find((nm) => nm.movieNm === item1.title.replace(/^ /, "")),
  }));

  const weeklyFilter = kmdb.Data[0].Result.filter((kmdbCode) =>
    weekly.boxOfficeResult.weeklyBoxOfficeList.find((nm) => nm.movieNm === kmdbCode.title.replace(/^ /, ""))
  ).map((item1) => ({
    ...item1,
    ...weekly.boxOfficeResult.weeklyBoxOfficeList.find((nm) => nm.movieNm === item1.title.replace(/^ /, "")),
  }));

  return {
    props: {
      dailyBoxOffice: daily.boxOfficeResult,
      weeklyBoxOffice: weekly.boxOfficeResult,
      dailyFilter,
      weeklyFilter,
    },
  };
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding: 3em 0px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  // margin-top: 5rem;
  padding: 10rem;
  h1 {
    font-size: 10rem;
    letter-spacing: 0.5rem;
  }
`;

const MovieContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 0em 3em;
`;

const MovieFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  .weekyType {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    p {
      font-size: 1rem;
      letter-spacing: 0.2rem;
    }
  }
`;
const MovieType = styled.div`
  font-size: 2rem;
  white-space: nowrap;
  text-align: center;
  line-height: 3rem;
  letter-spacing: 0.3rem;
`;
const MovieList = styled(motion.div)`
  display: flex;
  gap: 3rem;
  padding: 3rem;
  overflow-x: scroll;
  cursor: pointer;
  img {
    width: 25vw;
    height: 50vh;
    object-fit: fill;
    border-radius: 10px;
  }
`;
const Movie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const MovieItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  .rank {
    font-size: 8.5rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .name {
      font-size: 1.5rem;
      letter-spacing: 0.2rem;
      line-height: 2rem;
    }
    #rating {
      color: ${({ sel, theme }) => {
        switch (sel) {
          case "전체관람가":
            return theme.all;
          case "12세이상관람가":
            return theme._12;
          case "15세이상관람가":
            return theme._15;
          case "청소년관람불가":
            return theme._19;
        }
      }};
    }
  }
`;
