import styled from "styled-components";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <DefaultLayout>
      <Nav />
      {children}
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div``;
