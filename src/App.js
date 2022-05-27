import './App.scss';
import HomeComp from './components/HomeComp'

function App() {
  return (
    <div className="App">
      <header id="App_header" className='text-center'>
        <h1>로고</h1>
        <nav id="App_nav">
          <ul>
            <li><p>제작</p></li>
            <li><p>모두의 디자인</p></li>
            <li><p>리뷰</p></li>
            <li><p>문의하기</p></li>
          </ul>
        </nav>
        <div>
          <ul id="main_subnav" className="caption">
            <li>검색</li>
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </div>
      </header>

      <main>
        <HomeComp />
      </main>

      <footer id="App_footer">
        푸터
      </footer>
    </div>
  );
}

export default App;
