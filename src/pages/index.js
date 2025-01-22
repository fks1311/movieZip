import { motion } from "framer-motion";
import { fetchKoficDateData } from "@/utiils/_api";
import { line_break } from "@/utiils/lineBreak";
import { KOFIC_Daily, KOFIC_Weekly } from "@/utiils/date";
import Image from "next/image";
import styled from "styled-components";
import poster from "@/utiils/blankImg.svg";

export default function Home({ dailyBoxOffice, weeklyBoxOffice }) {
  return (
    <Main>
      <Title>
        <h1>MOVIEZIP</h1>
        <h1>BOXOFFICE</h1>
      </Title>
      <MovieContainer>
        <MovieFrame>
          <MovieType>{line_break(dailyBoxOffice.boxofficeType)}</MovieType>
          <MovieList>
            {dailyBoxOffice.dailyBoxOfficeList.map((movie, idx) => (
              <Movie key={idx}>
                <Image src={poster} alt="poster" />
                <MovieItem>
                  <div className="rank">{movie.rank}</div>
                  <div className="info">
                    <span className="name">{movie.movieNm}</span>
                    <p>오늘 관객수 : {movie.audiCnt}</p>
                    <p>누적 관객수 : {movie.audiAcc}</p>
                  </div>
                </MovieItem>
              </Movie>
            ))}
          </MovieList>
        </MovieFrame>
        <MovieFrame>
          <div className="weekyType">
            <MovieType>{line_break(weeklyBoxOffice.boxofficeType)}</MovieType>
            <p>{weeklyBoxOffice.showRange}</p>
          </div>
          <MovieList>
            {weeklyBoxOffice.weeklyBoxOfficeList.map((movie, idx) => (
              <Movie key={idx}>
                <Image src={poster} alt="poster" />
                <MovieItem>
                  <div className="rank">{movie.rank}</div>
                  <div className="info">
                    <span className="name">{movie.movieNm}</span>
                    <p>오늘 관객수 : {movie.audiCnt}</p>
                    <p>누적 관객수 : {movie.audiAcc}</p>
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
  const dailyDate = KOFIC_Daily();
  const weeklyDate = KOFIC_Weekly();

  const [daily, weekly] = await Promise.all([
    fetchKoficDateData("searchDailyBoxOfficeList", dailyDate),
    fetchKoficDateData("searchWeeklyBoxOfficeList", weeklyDate),
  ]);

  // const [dailyData, weeklyData] = await Promise.all(
  //   types.map(type => fetchBoxOfficeData(type, targetDate))
  // );

  return {
    props: {
      dailyBoxOffice: daily.boxOfficeResult,
      weeklyBoxOffice: weekly.boxOfficeResult,
    },
  };
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10rem;
  color: white;
  height: 150vh;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-top: 5rem;
  h1 {
    font-size: 10rem;
    letter-spacing: 0.5rem;
  }
`;

const MovieContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
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
      font-size: 0.8rem;
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
  img {
    height: 30vh;
    width: 30vw;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const Movie = styled.div`
  width: 100%;
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
    font-size: 6rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .name {
      font-size: 1.5rem;
    }
  }
`;
