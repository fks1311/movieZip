import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: `search`,
        query: { search: value },
      });
    }
  };

  return (
    <>
      <AiOutlineSearch color="white" />
      <Search placeholder="영화명을 입력하세요" onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeydown} />
    </>
  );
}

const Search = styled(motion.input)`
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
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color};
  }
`;
