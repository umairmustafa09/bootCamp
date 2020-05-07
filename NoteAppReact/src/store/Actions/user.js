import ActionTypes from "./ActionTypes";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      let url = process.env.REACT_APP_SIGNUP_API;
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
      const url = process.env.REACT_APP_LOGIN_API;
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
  }
};

export default UserAction;
