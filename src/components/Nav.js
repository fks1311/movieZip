import styled from "styled-components";

export default function Nav() {
  const nav = ["Daily", "Weekly", "Genre", "Year", "Nation"];

  return (
    <Layout>
      <Home>MovieZip</Home>
      <List>
        {nav.map((nav, idx) => (
          <div key={idx}>{nav}</div>
        ))}
      </List>
    </Layout>
  );
}

const Layout = styled.nav`
  display: flex;
  font-size: 2rem;
`;
const Home = styled.div`
  color: ${({ theme }) => theme.color};
`;
const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;
  color: white;
  div {
    &:hover {
      color: ${({ theme }) => theme.color};
    }
  }
`;
