import { ButtonComp } from '../../components/index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.scss'
import { NavLink, Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

export const SearchResult = () => {
  return (
    <div>
      
    </div>
  )
}

const Search = () => {
  const searchresult = true
  const tabs = [
    {
      name:'전체',
      path: ''
    },
    {
      name:'태그',
      path: '/tag'
    },
    {
      name:'리뷰',
      path: '/review'
    },
    {
      name:'디자인',
      path: '/design'
    },
    {
      name:'문의',
      path: '/inquiry'
    },
    {
      name:'사용자',
      path: '/user'
    },
  ]

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
            {tabs.map(
              (t, i) => (
                <Col key={i} sm="2">
                  <NavLink to={'/search'+t.path} activeclassname="true" end>
                    <ButtonComp
                      white
                      tile
                      style={{
                        width: "100%",
                        margin: 0
                      }}
                    >{t.name}</ButtonComp>
                    <div className='active_bar'></div>
                  </NavLink>
                </Col>
              ),
            )}
          </Row>
        </Container>
      </div>

      <Outlet></Outlet>
    </div>
  )
}

export default Search
