import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from "../modules/addCart"
import Cart from "../pages/Cart/Cart";

export function addCartContainer(props) {
    const { items, addedItem } = useSelector( (state)=> (
        {
            items : state.cartReducer.items,
            addedItem : state.cartReducer.addedItem
        }
    ))
    const dispatch = useDispatch();
    const onAdd = useCallback( (item)=> dispatch(addItem(item)));
    const onDelete = useCallback( (id)=> dispatch(deleteItem(id)));

    return (
        <Cart 
            items={items} // 이거는 cart page에 props로 전달해야하지않나..? 
            addedItem={addedItem} 
            onAdd={onAdd}
            onDelete={onDelete}
        />
    )
    

}