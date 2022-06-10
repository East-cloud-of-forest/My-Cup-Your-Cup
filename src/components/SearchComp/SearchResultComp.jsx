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
  const tabname = (name) => {
    switch (name) {
      case 'tag':
        return '태그'
      case 'review':
        return '리뷰'
      case 'design':
        return '디자인'
      case 'inquiry':
        return '문의'
      case 'user':
        return '사용자'
    }
  }
  const item = []
  for (let i = 0; i < 15; i++) {
    item.push(i)
  }

  return (
    <div className="search_result">
        <hr />
        <div className="result_box">
          <p>{tabname(tabkind)} - 000건</p>

          {item.map((a) => (
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

        </div>

        <div>
          12345678910
        </div>
    </div>
  )
}

export default SearchResultComp
