import './SearchResultComp.scss'
import { Link, useParams } from 'react-router-dom'
import { Pagination, StarRating } from '../index-comp/IndexComp'
import { useSelector } from 'react-redux'

const SearchResultComp = () => {
  const { tabkind } = useParams()
  const tabname = (name) => {
    switch (name) {
      case 'review':
        return '리뷰'
      case 'design':
        return '디자인'
      case 'user':
        return '사용자'
    }
  }
  const itemselector = useSelector((a) => a.searchResult)
  const item = () => {
    return (
      (tabkind === 'user' && 'userSearch') ||
      (tabkind === 'review' && 'reviewSearch') ||
      (tabkind === 'design' && 'designSearch')
    )
  }

  return (
    <div>
      <hr />
      <div className="result_box">
        <p>
          {tabname(tabkind)} -{' '}
          {itemselector[item()] && itemselector[item()].length}건
        </p>
        {itemselector[item()] &&
          itemselector[item()].map((r, i) => (
            <div className="result_box_item" key={i}>
              {/* 리뷰 결과 */}
              {item() === 'reviewSearch' && (
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
              {item() === 'designSearch' && (
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
              {item() === 'userSearch' && (
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
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Pagination></Pagination>
      </div>
    </div>
  )
}

export default SearchResultComp
