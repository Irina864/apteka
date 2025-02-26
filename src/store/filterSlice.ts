import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export interface FilterObject {
  id: string;
  field: string;
  value: string | number | boolean;
}

export interface FilterItem {
  id: string;
  title: string;
  items: (number | string | boolean)[];
}
interface FilterState {
  filterList: FilterObject[];
  filterItems: FilterItem[];
  sorterState: number;
  cardsState: number;
}

const initialState: FilterState = {
  filterList: [],
  filterItems: [],
  sorterState: 0,
  cardsState: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<{ filter: FilterObject }>) => {
      const { filter } = action.payload;
      if (!state.filterList.includes(filter)) {
        state.filterList.push(filter);
      } else {
        state.filterList = state.filterList.filter(
          (item) => item.id !== filter.id
        );
      }
    },
    removeFilter: (state, action: PayloadAction<{ filter: string }>) => {
      const { filter } = action.payload;
      state.filterList = state.filterList.filter((item) => item.id !== filter);
    },
    cleanFilter: (state) => {
      state.filterList = [];
    },
    addFilterItems: (
      state,
      action: PayloadAction<{ filterItem: FilterItem[] }>
    ) => {
      const { filterItem } = action.payload;
      state.filterItems = filterItem;
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

export const {
  addFilter,
  cleanFilter,
  removeFilter,
  updateSorter,
  updateCardsState,
  addFilterItems,
} = filterSlice.actions;

export const selectFilterList = (state: RootState) => state.filter.filterList;
export const selectSorterState = (state: RootState) => state.filter.sorterState;
export const selectCardsState = (state: RootState) => state.filter.cardsState;

export default filterSlice.reducer;
