// 액션
const ADD_ITEM = 'addCart/ADD_ITEM';
const DELETE_ITEM ='addCart/DELETE_ITEM';
const SELECT_ITEM ='addCart/SELECT_ITEM';
const EDIT_ITEM = 'addCart/EDIT_ITEM';
const PLUS_ONE = 'addCart/PLUS_ONE';
const MINUS_ONE = 'addCart/MINUS_ONE';

const initialState = {
    items : []
}

//액션함수
let id = 1;
export const addItem = (item) => ({
    type : ADD_ITEM,
    item : {
        ...item,
        id: id++, // 다음 아이템 추가부터 +1
    }
})
export const selectItem = (id, total) => ({
    type : SELECT_ITEM,
    id,
    total
})
export const deleteItem = (id) => ({
    type : DELETE_ITEM,
    id
})
export const editItem = (id) => ({
    type : EDIT_ITEM,
    id
})
export const plusOne = (id) => ({
    type : PLUS_ONE,
    id
})
export const minusOne = (id) => ({
    type : MINUS_ONE,
    id
})

function cartReducer( state = initialState, action ) {
    switch (action.type) {
        case ADD_ITEM :
            return { items : state.items.concat(action.item) };
        case DELETE_ITEM :
            return { items : state.items.filter( item => item.id !== action.id )};
        case SELECT_ITEM :
            return { 
                items : state.items.map( item => item.id === action.id ? 
                    { ...item, selected: !item.selected, total: action.total } : item )
                }
        case PLUS_ONE :
            return {
                items : state.items.map( item => item.id == action.id ?
                    { ...item, quantity : item.quantity += 1 } : item
                )
            }
        case MINUS_ONE :
            return {
                items : state.items.map( item => item.id == action.id ?
                    { ...item, quantity : item.quantity -= 1 } : item
                )
            }
        default :
            return state;
    }
}
export default cartReducer;