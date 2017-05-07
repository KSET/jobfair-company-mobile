import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { combineReducers, createStore } from 'redux';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  /* combineReducers and your normal create store things here! */
  combineReducers({
    navigation: NavigationReducer,
    // other reducers
  })
);

export default store;
