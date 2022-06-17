import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items : [
        { id: 1, material: "스테인리스", size: "대", strow: "사용", price: 20000, image: 'https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg'},
        { id: 2, material: "스테인리스", size: "중", strow: "사용", price: 15000, image: 'https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg'},

    ]
}

const cartReducer = createSlice({
    name : 'addCart',
    initialState,
    reducers : {
        addItem: (state, action) => {
            action.addedItem.id += state.items[1].id;
            state.items.concat(action.addedItem);
            
        },
        deleteItem: (state, action ) => {
            state.items.filter( (item) => item.id !== action.addedItem.id )
        }
    }
})

export default cartReducer;

// 리덕스
// 액션
// const ADD_ITEM = 'addCart/ADD_ITEM';
// const DELETE_ITEM ='addCart/DELETE_ITEM';
// 액션함수
// export const addItem = (item) => ({
//     type : ADD_ITEM,
//     payload : item
// })
// export const deleteItem = (items) => ({
//     type : DELETE_ITEM,
//     payload : items
// })
// ( state = [], action) => {
//     switch (action.type) {
//         case ADD_ITEM :
//             return [ ...state, action.payload ];
//         case DELETE_ITEM :
//             return [ ...action.payload ];
//         default :
//             return state;
//     }
// }
