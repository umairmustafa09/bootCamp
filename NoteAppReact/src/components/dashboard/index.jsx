import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Card, Button, Form, Navbar, InputGroup } from "react-bootstrap";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import UsersAction from "../../store/Actions/users";
import moment from "moment";
import store from "store";
import "../style.css";

class Dashboard extends Component {
  state = {
    user: this.props.user || {},
    users: this.props.users || [],
    notes: this.props.notes.Notes || [],
    searched: [],
    userName: "",
    noteMonths: new Array(12).fill(0),
    notesData: {},
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
      this.props.getUsers();
      this.setState({
        userName: `${data.user.firstName} ${data.user.lastName}`
      });
    } else {
      store.remove("loggedIn");
      return this.props.history.push("/login");
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.users !== state.users) {
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
        users: props.users || [],
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

  remove = (index) => {
    const users = this.state.searched
      ? this.state.searched
      : this.state.users.data.user;
    const userToDelete = users.splice(index, 1);
    const afterDel = users;
    this.setState({ users: afterDel });
    this.props.deleteUser(userToDelete[0]._id);
  };

  search = (e) => {
    try {
      const users = this.state.users.data.user.filter((users) => {
        const regex = new RegExp(e.target.value, "gi");
        const fullname = `${users.firstName} ${users.lastName}`;
        return fullname.match(regex);
      });
      this.setState({ searched: users, isSearchEnabel: true });
    } catch (e) {
      return [];
    }
  };

  renderNotes = () => {
    const users = this.state.users;
    if (users.data)
      return this.state.users.data.user.map((user, i) => (
        <Card className="text-left noteContainer" key={i}>
          <Card.Header>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>@{user.username}</Card.Text>
            <Card.Text>
              User sign up on {user.createdAt.substr(0, 10)}
            </Card.Text>
            <Button
              className="move-right_Float"
              variant="info"
              onClick={() => {
                this.remove(i);
              }}
            >
              remove
            </Button>
          </Card.Body>
        </Card>
      ));
    else return <div />;
  };

  displaySearch = () => {
    return this.state.searched.map((user, i) => {
      return (
        <Card className="text-left noteContainer" key={i}>
          <Card.Header>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>@{user.username}</Card.Text>
            <Card.Text>
              User sign up on {user.createdAt.substr(0, 10)}
            </Card.Text>
            <Button
              className="move-right_Float"
              variant="info"
              onClick={() => {
                this.remove(i);
              }}
            >
              remove
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  render() {
    return (
      <div>
        <Navbar className="bg-light justify-content-between">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                Admin: {this.state.userName}
              </InputGroup.Text>
              <Button
                className="move-left"
                variant="info"
                onClick={this.handleLogout}
              >
                Log out
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
          <Form.Control
            type="text"
            placeholder="Input user name to filter users"
            id="input"
            onChange={this.search}
          />
        </Navbar>
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
        <br />
        <h3>Users List</h3>
        <div>{this.displaySearch()}</div>
        {this.state.isSearchEnabel ? <div /> : <div>{this.renderNotes()}</div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => {
      dispatch(NotesAction.GetAllNotes());
    },
    getUsers: () => {
      dispatch(UsersAction.GetAllUsers());
    },
    logoutUser: () => {
      dispatch(UserAction.Logout());
    },
    deleteUser: (_id) => {
      dispatch(UsersAction.Delete(_id));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.obj,
    users: state.usersReducer.obj,
    notes: state.noteReducer.notes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
