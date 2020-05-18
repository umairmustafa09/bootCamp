import ActionTypes from "./ActionTypes";
import store from "store";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      let url = process.env.REACT_APP_ENDPOINT + "auth/signup";
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then((resposne) => {
          if (resposne.status === 200) {
            return resposne.json();
          }
          throw resposne;
        })
        .then((data) => {
          dispatch({ type: ActionTypes.SIGNUP_USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.SIGNUP_USER, payload: obj });
            });
          }
        });
    };
  },

  Login: function (obj) {
    return (dispatch) => {
      const url = process.env.REACT_APP_ENDPOINT + "auth/signin";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          if (data.data.token) {
            store.set("user", {
              token: data.data.token,
              _id: data.data.user._id
            });
            dispatch({ type: ActionTypes.LOGIN_USER, payload: data });
            return data.data;
          }
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.LOGIN_USER, payload: obj });
            });
          }
        });
    };
  },

  AutoLogin: function (obj) {
    return (dispatch) => {
      const url = process.env.REACT_APP_ENDPOINT + "auth/signin/" + obj._id;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          if (data.data.token) {
            store.set("user", {
              token: data.data.token,
              _id: data.data.user._id
            });
            dispatch({ type: ActionTypes.LOGIN_USER, payload: data });
            return data.data;
          }
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.LOGIN_USER, payload: obj });
            });
          }
        });
    };
  },

  Logout: function () {
    return (dispatch) => {
      dispatch({ type: ActionTypes.LOGOUT_USER, payload: {} });
    };
  }
};

export default UserAction;
