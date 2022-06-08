
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import MypageComp from "../src/pages/MyPage/MypageComp"
import LoginMain from "./pages/Login/LoginMain"
import JoinUser from "./pages/Join/JoinUser"
import ReviewComp from "./pages/Review/Review";
import CreatePage from "./pages/Create/CreatePage";
import PayPage from "./pages/Pay/PayPage";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/mypage" element={<MypageComp />} />
            <Route path="/review" element={<ReviewComp />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/Login" element={<LoginMain />} />
            <Route path="/Join" element={<JoinUser />} />
            <Route path="/pay" element={<PayPage/>} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
