import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export const getProducts = createAsyncThunk<IMedicine[], void>(
  'medicines/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:9080/api/products`);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const responseJson: IMedicine[] = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: 'Network error' });
    }
  }
);

export interface IMedicine {
  id: number;
  title: string;
  price: number;
  image: string;
  characteristics: {
    country: string;
    brand: string;
    dossage: string;
    releaseForm: string;
    storageTemperature: string;
    quantityPerPackage: number;
    expirationDate: string;
    isByPrescription: boolean;
    manufacturer: string;
  };
}

interface IMedicinesState {
  medicinesList: IMedicine[];
  isLoading: boolean;
}

const initialState: IMedicinesState = {
  medicinesList: [],
  isLoading: false,
};

const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<IMedicine[]>) => {
        state.medicinesList = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getProducts.rejected, (state, action) => {
      console.error('rejected:', action.payload);
      state.isLoading = false;
    });
  },
});

export const selectMedicinesList = (state: RootState) =>
  state.medicines.medicinesList;
export const selectIsLoading = (state: RootState) => state.medicines.isLoading;

export default medicinesSlice.reducer;
