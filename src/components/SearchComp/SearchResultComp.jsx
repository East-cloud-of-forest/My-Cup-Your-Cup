import './SearchResultComp.scss'
import { Link, useParams } from 'react-router-dom'

const Error = () => {
  return (
    <div className="search_error">
      <h2>검색결과를 찾을 수 없습니다.</h2>
      <ul>
        <li>잘못입력했는지</li>
        <li>단어의 철자가 정확한지</li>
        <li>어쩌고 저쩌고 했는지</li>
        <li>잘 확인했는지</li>
        <li>검색 좀 잘해보세여</li>
      </ul>
      <hr />
      <p className="caption">
        만족스러운 검색결과를 찾지 못하셨다면 아래 기능도 이용해 보세요.
      </p>
      <Link to="/">문의하기</Link>
    </div>
  )
}

const SearchResultComp = () => {
  const { tabkind } = useParams()
  
  return (
    <div>
    </div>
  )
}

export default SearchResultComp
