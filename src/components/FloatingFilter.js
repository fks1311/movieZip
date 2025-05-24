import { forwardRef } from "react";
import styled from "styled-components";

export const FloatingFilter = forwardRef((props, ref) => {
  return (
    <Layout ref={ref} top={props.top}>
      {props.children}
    </Layout>
  );
});

const Layout = styled.div`
  font-size: 1.5rem;
  color: white;
`;
