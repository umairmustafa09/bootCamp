import ActionTypes from "./ActionTypes";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) =>
      dispatch({ type: ActionTypes.SIGNUP_USER, payload: obj });
  },
  Login: function (obj) {
    return (dispatch) =>
      dispatch({ type: ActionTypes.LOGIN_USER, payload: obj });
  }
};

export default UserAction;
