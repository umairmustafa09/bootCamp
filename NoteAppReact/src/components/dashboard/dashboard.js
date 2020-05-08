import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import store from "store";
import "./style.css";

class Dashboard extends Component {
  state = {
    user: this.props.user || {},
    notes: this.props.notes.Notes || [],
    userName: "",
    labels: {
      jan: 0,
      feb: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0
    },

    NotesData: {
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
      ],
      datasets: [
        {
          label: "Notes",
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    }
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
      return {
        notes: props.notes.Notes || []
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
        <h3 className="userMsg">Admin {this.state.userName} Dashboard</h3>
        <button className="logout" onClick={this.handleLogout}>
          log out {this.state.userName}
        </button>
        <div className="chart">
          <Bar
            data={this.state.NotesData}
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
  console.log(state);
  return {
    user: state.userReducer.obj,
    notes: state.noteReducer.notes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
