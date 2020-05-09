import ActionTypes from "./ActionTypes";

const UserAction = {
  GetAllUsers: function () {
    return (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      const url = process.env.REACT_APP_ENDPOINT + "api/users";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          }
          throw data;
        })
        .then((res) => {
          dispatch({
            type: ActionTypes.GET_USERS,
            payload: res
          });
        })
        .catch((error) => {
          console.log({ error });
        });
    };
  },
  Delete: function (_id) {
    return (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      try {
        const url = process.env.REACT_APP_ENDPOINT + "api/users/" + _id;
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
};

export default UserAction;
