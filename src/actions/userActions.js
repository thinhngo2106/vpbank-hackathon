import Axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from '../constants/userConstants';



export const listUsers = (
  pageNumber
  ) => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
  
      const { data } = await Axios.get('https://xly6reysoi.execute-api.us-east-1.amazonaws.com/api-vpbank/accounts',);

      console.log(data)

      dispatch({ type: USER_LIST_SUCCESS, payload: data });


    } catch (error) {
      console.log(error)
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};