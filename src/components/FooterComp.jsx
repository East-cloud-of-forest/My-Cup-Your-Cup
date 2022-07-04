import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './FooterComp.scss'
import { ButtonComp } from './index-comp/IndexComp'

const Footer = () => {
  return (
    <footer id="App_footer">
      <div className="footer_block footer_cs">
        <div className="footer_cs_box">
          <p>
              부산광역시 남구 대연동 <br/>
              Tel : 3000-3000 (평일 09:00 ~ 18:00) <br />
              Fax : 051-000-0000 <br />
              Mail : mycupyourcup@gmail.com
          </p>
        </div>
        <div className="footer_cs_box">
          <p>
            내잔네잔 <br />
            부산광역시 남구 대연동  <br />
            사업자등록번호 : 000-00-00000 사업자정보 확인 <br />
            통신판매업신고 : 부산남 00 <br />
            책임자 : 뽀로로 <br />
          </p>
        </div>
        <div className="footer_cs_box">
          <p>
            <a href="#">전자금융 분쟁처리 <br /></a>
            Tel : 3000-3000 <br />
            Fax : 051-000-0000 <br />
            Mail : mycupyourcup@gmail.com <br />
            <a href="#">전자상거래법상의 소비자분쟁해결기준</a>  <br />
          </p>
        </div>
      </div>
      <div className="footer_block footer_copyright">
        <p>
        내잔네잔은 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 내잔네잔은 상품·거래 정보 및 가격에 대하여 책임을 지지 않습니다. <br />
        Copyright My Cup Your Cup All rights reserved.
        </p>
      </div>
      <ButtonComp color="mint">
        <FontAwesomeIcon icon={solid("arrow-up")} size="2x" />
      </ButtonComp>

    </footer>
  )
}

export default Footer