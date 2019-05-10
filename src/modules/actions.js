import { FETCH_BEERS, NO_MORE_BEERS, SET_CURR_PAGE } from "./constants";

const fetchBeers = page => {
  const params = {
    per_page: 60,
    page
  };
  return {
    type: FETCH_BEERS,
    payload: {
      request: {
        method: "get",
        params
      }
    }
  };
};

const shutDeliveryDown = () => {
  return {
    type: NO_MORE_BEERS
  };
};

const setCurrPage = page => {
  return {
    type: SET_CURR_PAGE,
    payload: page
  };
};

export const fetchBeersAndPaginate = () => async (dispatch, getState) => {
  const { currentPage } = getState().beers;
  if (currentPage === 8) {
    dispatch(shutDeliveryDown());
  } else {
    dispatch(setCurrPage(currentPage + 1));
    const { currentPage: nextPage } = getState().beers;
    await dispatch(fetchBeers(nextPage));
  }
};
