import { ButtonComp, StarRating } from "../../components/index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.scss";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import queryString from "query-string";
import { useState } from "react";
import { firebaseSearch } from "../../datasources/firebase";

const Search = () => {
  const navi = useNavigate();

  // 검색창 내에서 이동시 맨 위로
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // prams 및 query 데이터
  const params = useParams();
  const { search } = useLocation();
  const { keyword } = queryString.parse(search);

  const [allSearchResult, setAllSearchResult] = useState({
    tagSearch: [],
    reviewSearch: [],
    designSearch: [],
    userSearch: [],
    inquiry: [],
  });
  // const [tagSearch, setTagSearch] = useState([]);
  // const [reviewSearch, setReviewSearch] = useState([]);
  const reviewSearchF = async () => {
    await firebaseSearch("Review", "review", keyword).then((r) => {
      const resultArray = [];
      r.forEach((d) => {
        resultArray.push(d.data());
        console.log(d.data());
      });
      setAllSearchResult({ ...allSearchResult, reviewSearch: resultArray });
    });
  };

  useEffect(() => {
    reviewSearchF();
    setSearchKeyword(keyword);
  }, [keyword]);

  // 검색창 입력
  const [searchKeyword, setSearchKeyword] = useState("");
  // 검색 버튼 클릭
  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  // 검색 엔터
  const onSearch = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    navi("/search?keyword=" + searchKeyword);
  };

  const tabs = [
    {
      name: "전체",
      path: "",
    },
    {
      name: "태그",
      path: "/tag",
      result: "tagSearch",
    },
    {
      name: "리뷰",
      path: "/review",
      result: "reviewSearch",
    },
    {
      name: "디자인",
      path: "/design",
      result: "designSearch",
    },
    {
      name: "사용자",
      path: "/user",
      result: "userSearch",
    },
    {
      name: "문의",
      path: "/inquiry",
      result: "inquiry",
    },
  ];

  const resultdata = [1, 2, 3];

  return (
    <div className="search_page">
      <div className="search_input_box">
        <form onSubmit={onSearch}>
          <input type="text" onChange={onChange} value={searchKeyword} />
        </form>
        <ButtonComp
          color="mint"
          style={{
            margin: 0,
            borderRadius: "0 100px 100px 0",
            padding: "0 1rem",
          }}
          onClick={onSearch}
        >
          <FontAwesomeIcon
            icon={solid("magnifying-glass")}
            style={{ fontSize: "20px", marginRight: "5px" }}
          />
        </ButtonComp>
      </div>
      <div className="search_tabs">
        <Container fluid>
          <Row>
            {tabs.map((t, i) => (
              <Col key={i} lg="2" md="6" sm="6" style={{ margin: "5px 0" }}>
                <NavLink
                  to={"/search" + t.path + "?keyword=" + searchKeyword}
                  activeclassname="true"
                  end
                >
                  <ButtonComp
                    color="white"
                    tile
                    style={{
                      width: "100%",
                      margin: 0,
                    }}
                  >
                    {t.name} <br />
                    <p className="caption">
                      {t.name === "전체"
                        ? "000"
                        : allSearchResult[t.result].length}
                      건
                    </p>
                  </ButtonComp>
                  <div className="active_bar"></div>
                </NavLink>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <p className="nav result_text">
        "{keyword}"(으)로 검색한 결과, 총 000건 의 검색결과가 있습니다.
      </p>
      <div className="search_result">
        {Object.keys(params).length ? (
          <Outlet></Outlet>
        ) : (
          <div>
            <hr />
            {tabs
              .filter((a) => a.name !== "전체")
              .map(
                (a, i) =>
                  allSearchResult[a.result].length !== 0 && (
                    // 각 결과별 건수
                    <div key={i} className="result_box">
                      <p>
                        {a.name} - {allSearchResult[a.result].length}건
                      </p>

                      {allSearchResult[a.result].slice(0, 3).map((r, i) => (
                        // 결과
                        <div key={i} className="result_box_item">
                          <img
                            src={r.images.image0}
                            alt=""
                            className="img"
                            style={{
                              width: "100px",
                              height: "100px",
                            }}
                          />
                          <div>
                            <h4>{a.result === "reviewSearch" && r.review}</h4>
                            <StarRating rating={r.rating} />
                            <div className="userInfo">
                              <img src={r.user.photoURL} alt="" />
                              <p>{r.user.displayName}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <hr />
                      {allSearchResult[a.result].length > 3 && (
                        <Link to={"/search" + a.path}>+ 더보기</Link>
                      )}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
