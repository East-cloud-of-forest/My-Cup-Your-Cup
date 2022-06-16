import { Link, Outlet } from "react-router-dom";
import { Logo } from "../../components/index-comp/IndexComp";
import "./EnterUser.scss";

const EnterUser = () => {
  return (
    <div>
      <div className="enter_logo">
        <Link to="/">
          <Logo style={{ width: "200px", display: "inline-block" }} />
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default EnterUser;
