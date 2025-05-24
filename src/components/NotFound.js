import styled from "styled-components";

export default function NotFound() {
  return <Layout>현재 범위 내에서 검색한 값이 없습니다.</Layout>;
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 2rem;
  font-family: establishRetrosansOTF;
  border-radius: 4px;
  background-color: white;
`;
