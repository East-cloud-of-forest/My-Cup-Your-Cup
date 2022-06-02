import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import MypageComp from "./components/Mypage/MypageComp";
<<<<<<< HEAD
import ReviewComp from "./pages/Review/Review";
import CreateComp from "./components/createcomp/CreateComp";
=======
import ReviewPage from "./components/Review/ReviewPage";
import CreateComp from "./pages/Create/CreateComp";
>>>>>>> d60e904a8479316fab66404bda295643db0588dc

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
            <Route path="/create" element={<CreateComp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
