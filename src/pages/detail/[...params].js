import { fetchKMDBData } from "@/utiils/_api";
import Image from "next/image";
import styled from "styled-components";

export default function Detail({ kmdb }) {
  function addLineBreaks(text) {
    return text.split(/[]/).map((txt, idx) => (
      <PlotTxt idx={idx} key={idx}>
        {txt}
        <br />
      </PlotTxt>
    ));
  }

  return (
    <Main>
      <Movie>
        <Image src={kmdb.posters.split("|")[0]} height={500} width={500} unoptimized={true} alt="poster" />
        <Info sel={kmdb.rating}>
          <div>
            <p id="title">{kmdb.title}</p>
            <p id="title-eng">{kmdb.titleEng.split("(")[0].trim()}</p>
          </div>
          <p id="info">
            {kmdb.repRlsDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}
            <>&nbsp;</>
            <>&nbsp;</>개봉<>&nbsp;</>
            <>&nbsp;</>|<>&nbsp;</>
            <>&nbsp;</>
            {kmdb.runtime}분<>&nbsp;</>
            <>&nbsp;</>|<>&nbsp;</>
            <>&nbsp;</>
            <span>{kmdb.rating}</span>
          </p>
          <div id="detail">
            <p>감독 : {kmdb.directors.director[0].directorNm}</p>
            <p>
              배우 :{" "}
              {kmdb.actors.actor
                .slice(0, 4)
                .map((actor, idx) =>
                  idx < kmdb.actors.actor.slice(0, 4).length - 1 ? `${actor.actorNm}, ` : actor.actorNm
                )}
            </p>
            <p>
              장르 : {kmdb.genre.replace(/,(?=\S)/g, ", ")} / 국가 : {kmdb.nation.replace(/,(?=\S)/g, ", ")}
            </p>
          </div>
        </Info>
      </Movie>
      <Plots>{addLineBreaks(kmdb.plots.plot[0].plotText)}</Plots>
      <Stills>
        <p>
          <span>
            스틸컷 <>&nbsp;</>
          </span>
          <span id="still-count">({kmdb.stlls.split("|").length})</span>
        </p>
        <div>
          {kmdb.stlls.split("|").map((img, idx) => (
            <Image src={img} height={500} width={500} key={idx} unoptimized={true} alt="stills" />
          ))}
        </div>
      </Stills>
    </Main>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const kmdb = await fetchKMDBData({ movieId: params[0], movieSeq: params[1] });
  return { props: { kmdb: kmdb.Data[0].Result[0] } };
}

const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  padding: 8em 2em;
  color: white;
`;
const Movie = styled.div`
  width: 60%;
  display: flex;
  gap: 5rem;
  img {
    height: 45vh;
    width: 20vw;
    border-radius: 10px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  font-family: Freesentation-9Black;
  #title {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  #title-eng {
    font-size: 2rem;
    opacity: 0.8;
  }
  #info {
    font-size: 1.7rem;
    span {
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
  #detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
  }
`;

const Plots = styled.div`
  width: 60%;
  font-family: Freesentation-9Black;
  font-size: 1.5rem;
`;

const PlotTxt = styled.p`
  font-size: 1.5rem;
  line-height: 3rem;
`;

const Stills = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  span {
    font-family: Freesentation-9Black;
    font-size: 2rem;
  }
  #still-count {
    font-size: 1rem;
  }
  div {
    display: grid;
    grid-template-columns: repeat(3, minmax(20vw, auto));
    gap: 1rem;
  }
  img {
    height: 30vh;
    width: 20vw;
    border-radius: 10px;
  }
`;
