import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import beerReducer from './reducer';

export * from './actions';
export * from './selectors';

export default combineReducers({
  beers: beerReducer,
  form: formReducer,
});