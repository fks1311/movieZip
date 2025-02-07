import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { useResetRecoilState } from "recoil";
import { filterAtom } from "@/utils/atom";

export default function Nav() {
  const nav = ["Genre", "Year", "Nation"];
  const router = useRouter();
  const [value, setValue] = useState("");
  const resetFilter = useResetRecoilState(filterAtom);

  const onClick = (nav) => {
    router.push(`/${nav.toLowerCase()}`);
    resetFilter();
  };

  const handleKeydown = (e) => {};

  return (
    <Layout>
      <Home
        onClick={() => {
          router.push("/");
          resetFilter();
        }}
      >
        MovieZip
      </Home>
      <List>
        {nav.map((nav, idx) => (
          <Button key={idx} $curPath={router.asPath} nav={`/${nav.toLowerCase()}`} onClick={() => onClick(nav)}>
            {nav}
          </Button>
        ))}
      </List>
      <div>
        <AiOutlineSearch color="white" />
        <SearchBar
          placeholder="검색어를 입력하세요"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>
    </Layout>
  );
}

const Layout = styled.nav`
  display: flex;
  font-size: 2rem;
  cursor: pointer;
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
`;
const Button = styled.div`
  color: ${({ $curPath, nav, theme }) => $curPath === nav && theme.color};
  &:hover {
    color: ${({ theme }) => theme.color};
  }
`;
const SearchBar = styled(motion.input)`
  position: absolute;
  right: 3%;
  border: none;
  outline: none;
  background: none;
  color: white;
  min-width: 230px;
  padding-bottom: 5px;
  margin-right: 1rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.grey}`};
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color};
  }
`;
