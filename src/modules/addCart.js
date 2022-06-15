// 액션
const ADD_ITEM = 'addCart/ADD_ITEM';
const DELETE_ITEM ='addCart/DELETE_ITEM';

// 액션함수
export const addItem = (item) => ({
    type : ADD_ITEM,
    payload : item
})
export const deleteItem = (items) => ({
    type : DELETE_ITEM,
    payload : items
})

// 리듀서
const cartReducer = ( state = [], action) => {
    switch (action.type) {
        case ADD_ITEM :
            return [ ...state, action.payload ];
        case DELETE_ITEM :
            return [ ...action.payload ];
        default :
            return state;
    }
}

export default cartReducer;