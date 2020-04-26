import ActionTypes from "./ActionTypes";

const NotesAction = {
  Add: function (notes) {
    return (dispatch) =>
      dispatch({ type: ActionTypes.ADD_NOTE, payload: notes });
  }
};

export default NotesAction;
