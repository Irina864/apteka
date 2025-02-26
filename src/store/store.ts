import { configureStore } from '@reduxjs/toolkit';
import medicinesReducer from '@/store/productsSlice';
import filterReducer from '@/store/filterSlice';

export const store = configureStore({
  reducer: {
    medicines: medicinesReducer,
    filter: filterReducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
