import ActionTypes from "./ActionTypes";

const NotesAction = {
  Add: function (obj) {
    return async (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      try {
        const url = process.env.REACT_APP_ENDPOINT + "api/note";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(obj)
        });
        const note = await response.json();
        dispatch({ type: ActionTypes.ADD_NOTE, payload: note });
      } catch (error) {
        if (typeof error.text === "function") {
          error.text().then((errorMessage) => {
            console.log(errorMessage);
            const obj = JSON.parse(errorMessage);
            dispatch({ type: ActionTypes.ADD_NOTE, payload: obj });
          });
        }
      }
    };
  },

  Delete: function (_id) {
    return (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      try {
        const url = process.env.REACT_APP_ENDPOINT + "api/note/" + _id;
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
  },

  Update: function (obj) {
    return async (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      try {
        const url = process.env.REACT_APP_ENDPOINT + "api/note";
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(obj)
        });
        const note = await response.json();
        dispatch({ type: ActionTypes.ADD_NOTE, payload: note });
      } catch (error) {
        console.log(error);
      }
    };
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
  },

  GetAllNotes: function () {
    return (dispatch, getState) => {
      const token = getState().userReducer.obj.data.token;
      const url = process.env.REACT_APP_ENDPOINT + "api/note";
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
