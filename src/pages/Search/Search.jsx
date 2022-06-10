import { ButtonComp } from '../../components/index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.scss'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

export const SearchResult = () => {
  return <div></div>
}

const Search = () => {
  const params = useParams()

  const tabs = [
    {
      name: '전체',
      path: '',
    },
    {
      name: '태그',
      path: '/tag',
    },
    {
      name: '리뷰',
      path: '/review',
    },
    {
      name: '디자인',
      path: '/design',
    },
    {
      name: '문의',
      path: '/inquiry',
    },
    {
      name: '사용자',
      path: '/user',
    },
  ]

  const resultdata = [1, 2, 3]

  return (
    <div className="search_page">
      <div className="search_input_box">
        <input type="text" />
        <ButtonComp
          style={{
            margin: 0,
            borderRadius: '0 100px 100px 0',
            padding: '0 1rem',
          }}
        >
          <FontAwesomeIcon
            icon={solid('magnifying-glass')}
            style={{ fontSize: '20px', marginRight: '5px' }}
          />
        </ButtonComp>
      </div>
      <div className="search_tabs">
        <Container fluid>
          <Row>
            {tabs.map((t, i) => (
              <Col key={i} sm="2">
                <NavLink to={'/search' + t.path} activeclassname="true" end>
                  <ButtonComp
                    white
                    tile
                    style={{
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    {t.name} <br />
                    <p className="caption">000건</p>
                  </ButtonComp>
                  <div className="active_bar"></div>
                </NavLink>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <p className="nav result_text">
        "검색어"(으)로 검색한 결과, 총 000건 의 검색결과가 있습니다.
      </p>
      <div className="search_result">
        {Object.keys(params).length ? (
          <Outlet></Outlet>
        ) : (
          <div>
            <hr />
            {tabs
              .filter((a) => a.name !== '전체')
              .map((a) => (
                <div className="result_box">
                  <p>{a.name} - 000건</p>

                  {resultdata.map((a) => (
                    <div className="result_box_item">
                      <div
                        className="img"
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundColor: 'orange',
                        }}
                      ></div>
                      <div>
                        <h4>title</h4>
                        <p>text</p>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <Link to={'/search' + a.path}>+ 더보기</Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
