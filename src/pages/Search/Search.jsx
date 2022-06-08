import { ButtonComp } from '../../components/index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.scss'
import { Link } from 'react-router-dom'

const Search = () => {
  return (
    <div className='search_page'>
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
            style={{ fontSize: '20px' }}
          />
        </ButtonComp>
      </div>

      <div className='search_error'>
        <h2>검색결과를 찾을 수 없습니다.</h2>
        <ul>
          <li>잘못입력했는지</li>
          <li>단어의 철자가 정확한지</li>
          <li>어쩌고 저쩌고 했는지</li>
          <li>잘 확인했는지</li>
          <li>검색 좀 잘해보세여</li>
        </ul>
        <hr />
        <p className='caption'>만족스러운 검색결과를 찾지 못하셨다면 아래 기능도 이용해 보세요.</p>
        <Link to="/">문의하기</Link>
      </div>
    </div>
  )
}

export default Search
