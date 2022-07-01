import classNames from "classnames";
import "./AppSidebar.scss";

const CartSidebar = ({
  activeClass,
  active,
  offClick,
  children,
  direction,
  button
}) => {
  return (
    <div className="app_bar">
      <div className="caption">
        {button}
      </div>

      {active ? (
        <div
          className={classNames(
            "app_side_bar_background",
            activeClass ? "app_side_bar_background_active" : null
          )}
          onClick={(e) => {
            e.target === e.currentTarget && offClick();
          }}
        >
          <div className={classNames("app_side_bar", direction)}>
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartSidebar;
