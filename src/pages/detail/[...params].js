import Image from "next/image";
import styled from "styled-components";
import { fetchKMDBData } from "@/utils/_api";

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
            {kmdb.repRlsDate === "" ? (
              <></>
            ) : (
              <>
                <>&nbsp;</>
                <>&nbsp;</>개봉<>&nbsp;</>
                <>&nbsp;</>|<>&nbsp;</>
                <>&nbsp;</>
              </>
            )}
            {kmdb.repRlsDate === "" ? (
              <>
                runtime : {kmdb.runtime}분<>&nbsp;</>
              </>
            ) : (
              <>
                {kmdb.runtime}분<>&nbsp;</>
                <>&nbsp;</> | <>&nbsp;</>
              </>
            )}
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
      {kmdb.stlls === "" ? (
        <></>
      ) : (
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
      )}
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
  letter-spacing: 0.15rem;
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
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    img {
      height: 50vh;
      width: 60vw;
    }
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
    line-height: 6rem;
    margin-bottom: 1rem;
  }
  #title-eng {
    font-size: 2rem;
    line-height: 2.5rem;
    opacity: 0.8;
  }
  #info {
    font-size: 1.7rem;
    span {
      color: ${({ sel, theme }) => {
        switch (sel) {
          case "전체관람가":
            return theme.color.all;
          case "12세관람가":
          case "12세이상관람가":
            return theme.color._12;
          case "15세관람가":
          case "15세이상관람가":
            return theme.color._15;
          case "청소년관람불가":
            return theme.color._19;
          case "18세관람가(청소년관람불가)":
            return theme.color._19;
        }
      }};
    }
  }
  #detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.3rem;
    line-height: 2rem;
    letter-spacing: 0.2rem;
  }
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    width: 100%;
    #title {
      font-size: 3rem;
      line-height: 4rem;
    }
    #title-eng {
      font-size: 1.5rem;
    }
    #info {
      line-height: 2.3rem;
    }
  }
`;

const Plots = styled.div`
  width: 60%;
  font-family: HakgyoansimWoojuR;
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
    font-family: HakgyoansimWoojuR;
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
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    div {
      grid-template-columns: repeat(2, minmax(53%, auto));
      justify-items: center;
    }
    img {
      width: 30vw;
    }
  }
  @media ${({
      theme: {
        media: { small },
      },
    }) => small} {
    div {
      grid-template-columns: repeat(1, minmax(100%, auto));
      justify-items: center;
    }
    img {
      width: 55vw;
    }
  }
`;
