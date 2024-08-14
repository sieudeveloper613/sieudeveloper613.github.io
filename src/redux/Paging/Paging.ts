import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    row: 10,
    TotalPage: 1,
    currentPage: 1,
    data: [],
    isShowMenu:false
};

const Pagingreducer = createSlice({
    name: 'paging',
    initialState,
    reducers: {
        setIsShowMenu: (state, action) => {
            state.isShowMenu = action.payload;
        },
        Pagingrow: (state, action) => {
            state.row = action.payload.row;
            state.currentPage = 1
        },
        PagingByButton: (state, action) => {
            const checkee = action.payload.data
            //14

            state.currentPage = action.payload.currentPage;
            if(action.payload.data.length > 0) {
                const skip = Number(state.row) * (state.currentPage - 1)
                state.data = checkee.slice(skip, Number(state.row) + skip)
            }
            if(state.currentPage === 1) {
                state.data = checkee.slice(0, Number(state.row))
            }
        },
        
    },
});

export default Pagingreducer;
