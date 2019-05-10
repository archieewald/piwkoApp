import { success, failure } from "./utils";
import * as constants from "./constants";

const initialState = {
  beers: [],
  isLoading: true,
  hasFetchFailed: false,
  isThereMoreBeers: true,
  currentPage: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.NO_MORE_BEERS:
      return {
        ...state,
        isThereMoreBeers: false
      };

    case constants.SET_CURR_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case constants.FETCH_BEERS:
      return { ...state, isLoading: true };
    case failure(constants.FETCH_BEERS):
      return { ...state, isLoading: false, hasFetchFailed: true };
    case success(constants.FETCH_BEERS):
      const beers = action.payload.data;
      return {
        ...state,
        isLoading: false,
        beers: [...state.beers, ...beers]
      };

    default:
      return state;
  }
};

export default reducer;
