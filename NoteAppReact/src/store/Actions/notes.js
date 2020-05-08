import ActionTypes from "./ActionTypes";

const NotesAction = {
  Add: function (notes) {
    return (dispatch) =>
      dispatch({ type: ActionTypes.ADD_NOTE, payload: notes });
  },
  GetUserNotes: function (_id) {
    return (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      const url = process.env.REACT_APP_ENDPOINT + "api/note/user/" + _id;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then((data) => {
          if (data.status === 401) {
            localStorage.clear();
          } else if (data.status === 200) {
            return data.json();
          }
          throw data;
        })
        .then((res) => {
          dispatch({ type: ActionTypes.ADD_NOTE, payload: res });
        })
        .catch((error) => {
          console.log({ error });
        });
    };
  }
};

export default NotesAction;
