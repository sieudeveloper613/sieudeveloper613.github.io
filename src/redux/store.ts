// export default undefined;
import { configureStore } from '@reduxjs/toolkit';
import Pagingreducer from './Paging/Paging';
import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        paging: Pagingreducer.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;
