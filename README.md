## Movie Zip

## use

- Next.js => page router 기반
- axios
- react-query
- styled-components
- framer-motion
- recoil

## Todo

- Nav

  - [x] sticky

  - [ ] searchBar

    - [ ] search api 생성
    - [ ] enter => search api

  - [x] 현재 선택된 Nav 활성화

- Home

  - [x] 박스오피스 랭킹 => 일별/주말

  - [x] fetching data
    - [x] 병렬 호출
    - [x] 결과 데이터 필터링
    - [x] sorting rank
    - [x] filter blank posters

- detail

  - [x] 배우 최대 4명

  - [x] 개봉일 유무 확인
  - [x] still 유무 확인

- Genre & Nation & Year

  - [ ] api 추가 호출

  - [x] useQuery 활용
  - Filter

    - [x] Filter Button 컴포넌트화
    - [ ] ALL => filter button 이전 상태 적용
    - [x] ALL => nav button 변경 시 초기화 상태 적용 <br />
          <s>- [ ] ALL => sticky</s>
    - [x] ALL => 현재 선택 filter button 값 floating
    - [x] ALL => poster의 유무에 따른 필터링
    - [x] Nation => 현 nation에 따른 필터링
    - [x] Year => 연도 배열 생성
    - [x] Year => 조건별 dts/dte

  - [ ] 개봉 최신순 정렬
  - [ ] 스크롤 포커스
  - [x] loading spinner
