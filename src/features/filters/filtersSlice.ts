import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const filters = ["viewCount", "rating", "date"] as const;
export const filtersNames = {
  rating: "Trending now",
  viewCount: "Most viewed",
  date: "Most recent",
};
export type FilterType = typeof filters[number];

export type IInitialState = {
  filters: typeof filters;
  activeFilter: FilterType;
};

const initialState: IInitialState = {
  activeFilter: "rating",
  filters,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<FilterType>) {
      state.activeFilter = action.payload;
    },
  },
});

export const selectActiveFilter = (state: RootState) =>
  state.filters.activeFilter;
export const selectFilters = (state: RootState) => state.filters.filters;
export const { updateFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
