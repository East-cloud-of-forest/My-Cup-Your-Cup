import { useDispatch, useSelector } from "react-redux";
import ProductComp from "../components/Cart/ProductComp";

function setQuantity(props) {
    const quantity = useSelector( (state) => {
        quantity : state.quantityReducer.quantity 
    });
    const dispatch = useDispatch();
    
    const plus = useCallback(() => dispatch(plus()), [dispatch])
    const minus = useCallback(() => dispatch(minus()), [dispatch]) 

    return (
        <ProductComp quantity={quantity} plus={plus} minus={minus} />
    );
}

export default setQuantity;