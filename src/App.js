import './App.css';
import HomeComp from './components/HomeComp'

function App() {
  return (
    <div className="App">
      <header id="App_Header">
        <div>
          <ul id="Top_nav" className="caption">
            <li>검색</li>
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </div>
        <h1>로고</h1>
        <nav>
          <ul>
            <li>텀블러 제작</li>
            <li>모두의 디자인</li>
            <li>리뷰</li>
            <li>문의하기</li>
          </ul>
        </nav>
        <hr></hr>
      </header>

      <main>
        <HomeComp />
      </main>
    </div>
  );
}

export default App;
