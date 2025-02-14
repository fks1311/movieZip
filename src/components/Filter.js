import styled from "styled-components";

export default function Filter({ filter, cur, setCur }) {
  return (
    <Frame>
      {filter.map((g, i) => (
        <Button key={i} idx={i} cur={cur.idx} onClick={() => setCur({ idx: i, filter: g })}>
          {g}
        </Button>
      ))}
    </Frame>
  );
}

const Frame = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1.5rem;
  font-family: Freesentation-9Black;
  @media ${({
      theme: {
        media: { middle },
      },
    }) => middle} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, auto));
    text-align: center;
  }
`;

const Button = styled.p`
  padding: 1rem;
  color: ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.color.grey)};
  border: 1px solid ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.color.grey)};
  border-radius: 10px;
`;
