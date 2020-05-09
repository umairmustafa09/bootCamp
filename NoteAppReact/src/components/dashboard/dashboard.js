import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import moment from "moment";
import store from "store";
import "./style.css";

class Dashboard extends Component {
  state = {
    user: this.props.user || {},
    notes: this.props.notes.Notes || [],
    userName: "",
    noteMonths: new Array(12).fill(0),
    notesData: "",
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sempt",
      "Oct",
      "Nov",
      "Dec"
    ]
  };

  componentDidMount = () => {
    const data = this.state.user.data;
    if (data) {
      this.props.getNotes();
      this.setState({
        userName: `${data.user.firstName} ${data.user.lastName}`
      });
    } else {
      store.remove("loggedIn");
      return this.props.history.push("/login");
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.notes !== state.notes) {
      const notes = props.notes.Notes;
      if (notes) {
        props.notes.Notes.forEach((note) => {
          const timeObject = moment(note.createdAt).toObject();
          const month = Number(timeObject.months);
          state.noteMonths[month] = state.noteMonths[month] + 1;
        });
      }
      return {
        notes: props.notes.Notes || [],
        notesData: {
          labels: state.labels,
          datasets: [
            {
              label: "Notes",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: state.noteMonths
            }
          ]
        },
        noteMonths: state.noteMonths
      };
    }
  }

  handleLogout = () => {
    store.remove("loggedIn");
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h3 className="userMsg">Admin Dashboard: {this.state.userName}</h3>
        <button className="logout" onClick={this.handleLogout}>
          log out {this.state.userName}
        </button>
        <div className="chart">
          <Bar
            data={this.state.notesData}
            options={{
              title: {
                display: true,
                text: "NOTE GRAPH",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => {
      dispatch(NotesAction.GetAllNotes());
    },
    logoutUser: () => {
      dispatch(UserAction.Logout());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    notes: state.noteReducer.notes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
