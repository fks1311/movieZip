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
  gap: 1rem;
  font-size: 1.5rem;
  font-family: Freesentation-9Black;
`;

const Button = styled.p`
  padding: 1rem;
  color: ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.color.grey)};
  border: 1px solid ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.color.grey)};
  border-radius: 10px;
`;
