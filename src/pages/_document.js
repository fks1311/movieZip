import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { Reset } from "styled-reset";

// 서버 사이드 렌더링
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <Reset />
                <App {...props} />
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

/**
 * _document.js
 * 오직 서버 사이드에서만 렌더링
 *
 * custom _document.js
 * styled-components를 적용하기 위해 커스텀 진행
 *
 * 작동 방식
 * 1. styled-components의 ServerStyleSheet 객체를 생성 => 스타일 추출 및 렌더링을 위해
 * 2. sheet.collectStyles(<App {...props} />)를 통해 렌더링된 페이지에서 스타일을 추출
 * 3. sheet.getStyleElement()를 사용하여 스타일 태그를 반환
 * 4. getInitialProps() 작업이 완료되면, render() 실행 => <Head />, <Main />, NextScript />의 HTML 구조로 반환
 * 5. * 이 과정에서 서버사이드의 Html이 올바르게 렌더링 되려면 <Head />, <Main />, NextScript /> 가 필요 => next.js 공식문서
 * 6. 추출된 styled-components의 스타일도 <head> 태그 내에 포함(style 태그)되어 클라이언트에게 전달
 * 7. 서버는 최종적으로 완성된 HTML을 클라이언트에게 전달
 * 8. 클라이언트는 HTML 파일을 전달받아 렌더링하며, 페이지가 로드되면 클라이언트 사이드에서 hydration 작업을 진행
 *    (하이드레이션 과정에서 React는 서버에서 렌더링된 HTML을 React 컴포넌트로 변환)
 * 9. 리액트 앱이 클라이언트에서 활성화
 */
