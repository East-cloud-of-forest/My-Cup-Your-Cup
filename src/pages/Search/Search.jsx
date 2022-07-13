import { ButtonComp, StarRating } from '../../components/index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.scss'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import queryString from 'query-string'
import { useState } from 'react'
import { firebaseSearch } from '../../datasources/firebase'
import { getResult } from '../../modules/searchResult'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { loadingEnd, loadingStart } from '../../modules/loading'

const Search = () => {
  const navi = useNavigate()
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  // 검색창 내에서 이동시 맨 위로
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // prams 및 query 데이터
  const params = useParams()
  const { search } = useLocation()
  const { keyword } = queryString.parse(search)
  const sendResult = useCallback((result) => dispatch(getResult(result)), [
    dispatch,
  ])

  const [allSearchResult, setAllSearchResult] = useState({
    reviewSearch: [],
    designSearch: [],
    userSearch: [],
  })
  const reviewSearchF = async () => {
    startLoading()
    document.body.style.overflow = 'hidden'
    let resultArray = {
      reviewSearch: [],
      designSearch: [],
      userSearch: [],
    }
    await firebaseSearch('Review', 'tages', keyword).then((r) => {
      r.forEach((d) => {
        resultArray.reviewSearch.push(d.data())
      })
    })
    await firebaseSearch('MyDesign', 'tag', keyword).then((r) => {
      r.forEach((d) => {
        resultArray.designSearch.push(d.data())
      })
    })
    await firebaseSearch('user', 'displayName', keyword, true).then((r) => {
      r.forEach((d) => {
        resultArray.userSearch.push(d.data())
      })
    })
    sendResult(resultArray)
    setAllSearchResult(resultArray)
    document.body.style = ''
    endLoading()
  }

  useEffect(() => {
    if (keyword !== '') {
      reviewSearchF()
    }
    setSearchKeyword(keyword)
  }, [keyword])

  // 검색창 입력
  const [searchKeyword, setSearchKeyword] = useState('')
  // 검색 버튼 클릭
  const onChange = (e) => {
    setSearchKeyword(e.target.value)
  }
  // 검색 엔터
  const onSearch = (e) => {
    if (e !== undefined) {
      e.preventDefault()
    }
    navi('/search?keyword=' + searchKeyword)
  }

  const tabs = [
    {
      name: '전체',
      path: '',
    },
    {
      name: '리뷰',
      path: '/review',
      result: 'reviewSearch',
    },
    {
      name: '디자인',
      path: '/design',
      result: 'designSearch',
    },
    {
      name: '사용자',
      path: '/user',
      result: 'userSearch',
    },
  ]

  const [allcount, setAllcount] = useState(0)
  useEffect(() => {
    let count = 0
    for (let i in allSearchResult) {
      count += allSearchResult[i].length
    }
    setAllcount(count)
  }, [allSearchResult])

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
            borderRadius: '0 100px 100px 0',
            padding: '0 1rem',
          }}
          onClick={onSearch}
        >
          <FontAwesomeIcon
            icon={solid('magnifying-glass')}
            style={{ fontSize: '20px', marginRight: '5px' }}
          />
        </ButtonComp>
      </div>
      <div className="search_tabs">
        <Container fluid>
          <Row style={{justifyContent: 'center'}}>
            {tabs.map((t, i) => (
              <Col key={i} lg="3" md="6" sm="6" style={{ margin: '5px 0' }}>
                <NavLink
                  to={'/search' + t.path + '?keyword=' + searchKeyword}
                  activeclassname="true"
                  end
                >
                  <ButtonComp
                    color="white"
                    tile
                    style={{
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    {t.name} <br />
                    <p className="caption">
                      {t.name === '전체'
                        ? allcount
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
        "{keyword}"(으)로 검색한 결과, 총 {allcount}건 의 검색결과가 있습니다.
      </p>
      <div className="search_result">
        {Object.keys(params).length ? (
          <Outlet></Outlet>
        ) : (
          <div>
            <hr />
            {tabs
              .filter((a) => a.name !== '전체')
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
                          {/* 리뷰 결과 */}
                          {a.result === 'reviewSearch' && (
                            <>
                              <img
                                src={r.images.image0.url}
                                alt=""
                                className="img"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                }}
                              />
                              <div>
                                <h4>{r.review}</h4>
                                <div className="tag">
                                  {r.tages.map((t, i) => (
                                    <div className="tagitem" key={i}>
                                      {t}
                                    </div>
                                  ))}
                                </div>
                                <div className="userInfo">
                                  <StarRating rating={r.rating} />
                                  <img src={r.user.photoURL} alt="" />
                                  <p>{r.user.displayName}</p>
                                </div>
                              </div>
                            </>
                          )}
                          {/* 디자인 결과 */}
                          {a.result === 'designSearch' && (
                            <>
                              <img
                                src={r.image}
                                alt=""
                                className="img"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                }}
                              />
                              <div>
                                <h4>{r.title}</h4>
                                <div className="tag">
                                  {r.tag.map((t, i) => (
                                    <div className="tagitem" key={i}>
                                      {t}
                                    </div>
                                  ))}
                                </div>
                                <div className="userInfo">
                                  <img src={r.user.photoURL} alt="" />
                                  <p>{r.user.displayName}</p>
                                </div>
                              </div>
                            </>
                          )}
                          {/* 유저결과 */}
                          {a.result === 'userSearch' && (
                            <div className="onlyUserInfo">
                              <img src={r.photoURL} alt="" />
                              <div className="text">
                                <p>{r.email}</p>
                                <p>{r.displayName}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      <hr />
                      {allSearchResult[a.result].length > 3 && (
                        <Link to={'/search' + a.path}>+ 더보기</Link>
                      )}
                    </div>
                  ),
              )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
