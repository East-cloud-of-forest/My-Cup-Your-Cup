
// 리덕스
// 액션
const ADD_ITEM = 'addCart/ADD_ITEM';
const DELETE_ITEM ='addCart/DELETE_ITEM';
const SELECT_ITEM ='addCart/SELECT_ITEM';
const EDIT_ITEM = 'addCart/EDIT_ITEM';

const initialState = {
    items : [
        // { 
        //     id: 1, 
        //     color : "pink",
        //     material: "스테인리스", 
        //     size: "대", 
        //     strow: "사용", 
        //     price: 20000, 
        //     selected: true, 
        //     image: 'https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg'
        // },
        // { id: 2, color: "white", material: "스테인리스", size: "중", strow: "사용", price: 15000, selected: true, image: 'https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg'},
    ]
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
        default :
            return state;
    }
}
export default cartReducer;

// const cartSlice = createSlice({
//     name : 'addCart',
//     initialState,
//     reducers : {
//         addItem: (state, action) => {
//             action.payload.id += state.items[1].id;
//             state.items.concat(action.payload);
            
//         },
//         deleteItem: (state, action ) => {
//             state.items.filter( (item) => item.id !== action.payload.id )
//         }
//     }
// })

// export const { addItem, deleteItem } = cartSlice.actions;
// export default cartSlice.reducer;