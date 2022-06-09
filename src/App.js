import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import Mypage from "./pages/MyPage/Mypage";
import LoginMain from "./pages/Login/LoginMain";
import JoinUser from "./pages/Join/JoinUser";
import ReviewComp from "./pages/Review/Review";
import CreatePage from "./pages/Create/CreatePage";
import PayPage from "./pages/Pay/PayPage";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import ReviewFormComp from "./components/Review/ReviewFormComp";
import CreateDesignUploadFormComp from "./components/Review/CreateDesignUploadFormComp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/review" element={<ReviewComp />} />
            <Route path="/review/write" element={<ReviewFormComp />} />
            <Route path="/create" element={<CreatePage />} />
            <Route
              path="/create/write"
              element={<CreateDesignUploadFormComp />}
            />
            <Route path="/Login" element={<LoginMain />} />
            <Route path="/Join" element={<JoinUser />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
