import styled from "styled-components";

export const Layout = styled.div`
  padding: 5em 2em;
  cursor: pointer;
`;

export const Frame = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  justify-content: center;
  justify-items: center;
  padding-top: 3rem;
  img {
    height: 45vh;
    width: 20vw;
    border-radius: 10px;
  }
  @media ${({
      theme: {
        media: { large },
      },
    }) => large} {
    gap: 2rem;
  }
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    grid-template-columns: repeat(auto-fit, minmax(25%, auto));
    gap: 3rem;
    row-gap: 2rem;
    img {
      width: 25vw;
    }
  }
  @media ${({
      theme: {
        media: { small },
      },
    }) => small} {
    grid-template-columns: repeat(auto-fit, minmax(45%, auto));
    gap: 1rem;
    img {
      width: 40vw;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: HakgyoansimWoojuR;
  font-size: 1.3rem;
  color: white;
  letter-spacing: 0.3rem;
  max-width: 20vw;
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    max-width: 25vw;
  }
  @media ${({
      theme: {
        media: { small },
      },
    }) => small} {
    max-width: 40vw;
  }
`;

export const FloatingFilter = styled.div`
  font-size: 1.5rem;
`;
