import styled from "styled-components";

export default function Badge({ cur, setCur }) {
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
    "다큐멘터리",
    "뮤지컬",
  ];

  return (
    <Frame>
      {genre.map((g, i) => (
        <Genre key={i} idx={i} cur={cur.idx} onClick={() => setCur({ idx: i, genre: g })}>
          {g}
        </Genre>
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

const Genre = styled.p`
  padding: 1rem;
  color: ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.grey)};
  border: 1px solid ${({ theme, idx, cur }) => (idx === cur ? "white" : theme.grey)};
  border-radius: 10px;
`;
