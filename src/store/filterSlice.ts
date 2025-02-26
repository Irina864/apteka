import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

interface FilterState {
  filterList: string[];
  sorterState: number;
  cardsState: number;
}

const initialState: FilterState = {
  filterList: [],
  sorterState: 0,
  cardsState: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<{ filter: string }>) => {
      const { filter } = action.payload;
      if (!state.filterList.includes(filter)) {
        state.filterList.push(filter);
      }
    },
    removeFilter: (state, action: PayloadAction<{ filter: string }>) => {
      const { filter } = action.payload;
      state.filterList = state.filterList.filter((item) => item !== filter);
    },
    updateSorter: (state, action: PayloadAction<{ sorter: number }>) => {
      const { sorter } = action.payload;
      state.sorterState = sorter;
    },
    updateCardsState: (
      state,
      action: PayloadAction<{ cardsState: number }>
    ) => {
      const { cardsState } = action.payload;
      state.cardsState = cardsState;
    },
  },
});

export const { addFilter, removeFilter, updateSorter, updateCardsState } =
  filterSlice.actions;

export const selectFilterList = (state: RootState) => state.filter.filterList;
export const selectSorterState = (state: RootState) => state.filter.sorterState;
export const selectCardsState = (state: RootState) => state.filter.cardsState;

export default filterSlice.reducer;
