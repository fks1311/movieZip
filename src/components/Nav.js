import { useRouter } from "next/router";
import { useAnimate, useMotionValueEvent, useScroll } from "framer-motion";
import styled from "styled-components";
import { useResetRecoilState } from "recoil";
import { filterAtom } from "@/utils/atom";
import SearchBar from "./SearchBar";

export default function Nav() {
  const nav = ["Genre", "Year", "Nation"];
  const router = useRouter();
  const [scope, animate] = useAnimate(); // scroll trigger
  const { scrollY } = useScroll();
  const resetFilter = useResetRecoilState(filterAtom);

  useMotionValueEvent(scrollY, "change", (latest) => {
    latest >= 1
      ? animate(
          scope.current,
          { backgroundColor: "rgb(46, 55, 70, 0.7)" },
          { ease: "linear" },
          { backdropFilter: "blur(10px)" }
        )
      : animate(scope.current, { backgroundColor: "transparent" });
  });

  const onClick = (nav) => {
    router.push(`/${nav.toLowerCase()}`);
    resetFilter();
  };

  return (
    <Layout ref={scope}>
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
      {/* <div>
        <SearchBar />
      </div> */}
    </Layout>
  );
}

const Layout = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  padding: 3rem;
  font-size: 2rem;
  cursor: pointer;
`;
const Home = styled.div`
  color: ${({ theme }) => theme.color.color};
`;
const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 5rem;
  color: white;
  @media ${({
      theme: {
        media: { small },
      },
    }) => small} {
    justify-content: center;
  }
`;
const Button = styled.div`
  color: ${({ $curPath, nav, theme }) => $curPath === nav && theme.color.color};
  &:hover {
    color: ${({ theme }) => theme.color.color};
  }
`;
