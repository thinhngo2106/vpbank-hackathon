import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    } from '../constants/userConstants';


  const initialState = {
    users: [],
    lastEvaluatedKey: null,
    status: 'idle',
    error: null,
  };

export const userListReducer = (state = { loading: true, users: [], status: 'idle' }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { 
        ...state,
        loading: true };
    case USER_LIST_SUCCESS:
      return { 
        ...state,
        loading: false, 
        status: 'succeeded',
        users: [...state.users, ...JSON.parse(action.payload.items)],
        lastEvaluatedKey: JSON.parse(action.payload.lastEvaluatedKey)
       };
    case USER_LIST_FAIL:
      return { ...state,loading: false, error: action.payload };
    default:
      return state;
  }
};