// const [ price, setPrice ] = useState(15000);
const PLUS = 'setQuantity/PLUS';
const MINUS = 'setQuantity/MINUS';

export const plus = () => ({ type : PLUS });
export const minus = () => ({ type : MINUS });

const initialState = {
    quantity : 1,
};

function quantityReducer( state=initialState, action ) {
    switch (action.type) {
        case PLUS :
            return { quantity : state.quantity + 1 };
        case MINUS :
            return { quantity : state.quantity - 1 };
        default :
            return state;
    }
}

export default quantityReducer;