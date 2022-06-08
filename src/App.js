import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import Mypage from "./pages/MyPage/Mypage"
import LoginMain from "./pages/Login/LoginMain"
import JoinUser from "./pages/Join/JoinUser"
import ReviewComp from "./pages/Review/Review";
import CreateComp from "./pages/Create/CreateComp";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/review" element={<ReviewComp />} />
            <Route path="/create" element={<CreateComp />} />
            <Route path="/Login" element={<LoginMain />} />
            <Route path="/Join" element={<JoinUser />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
