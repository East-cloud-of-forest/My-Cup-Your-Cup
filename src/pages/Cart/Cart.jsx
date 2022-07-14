import React, { useCallback, useState } from "react";
import "./Cart.scss";
import ProductComp from "../../components/Cart/ProductComp";
import TotalPriceComp from "../../components/Cart/TotalPriceComp";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  minusOne,
  plusOne,
  selectItem,
} from "../../modules/addCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const { items } = useSelector((state) => ({
    items: state.cartReducer.items,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteItem = useCallback(
    (id) => dispatch(deleteItem(id)),
    [dispatch]
  );
  const onSelectItem = useCallback(
    (id) => dispatch(selectItem(id)),
    [dispatch]
  );
  const onPlusOne = useCallback((id) => dispatch(plusOne(id)), [dispatch]);
  const onMinusOne = useCallback((id) => dispatch(minusOne(id)), [dispatch]);

  // 로컬스토리지에 저장 - 최상위컴포넌트에 작성할 것
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(items));
  }, []);
  // JSON.parse( window.localStorage.getItem('cart'))

  return (
    <div className="cart-container">
      <div className="item_list">
        <h2>장바구니</h2>
        <div>
          {items.length >= 1 ? (
            items.map((item, i) => (
              <ProductComp
                item={item}
                key={item.id}
                onDeleteItem={onDeleteItem}
                onSelectItem={onSelectItem}
                onPlusOne={onPlusOne}
                onMinusOne={onMinusOne}
                idx={i}
              />
            ))
          ) : (
            <p style={{ margin: "50px 0 50px 50px" }}>
              장바구니가 비어있습니다.
            </p>
          )}
        </div>
      </div>
      <div className="pay">
        {
          /* 가격 출력되는 곳 */
          items.length >= 1 && <TotalPriceComp items={items} />
        }
      </div>
    </div>
  );
}

export default Cart;
