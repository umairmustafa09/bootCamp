import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Card, Button, Form, Navbar, InputGroup, Modal } from "react-bootstrap";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import UsersAction from "../../store/Actions/users";
import emptyLogo from "../../services/logo/empty.png";
import isLoggedIn from "../../helper/is_logged_in";
import moment from "moment";
import store from "store";
import "../style.css";

class Dashboard extends Component {
  state = {
    user: this.props.user || {},
    users: this.props.users || [],
    notes: this.props.notes.Notes || [],
    usersLength: 0,
    searched: [],
    userFullName: "",
    username: "",
    index: 0,
    noteMonths: [],
    chartData: {},
    showModel: false,
    isSearchEnable: false,
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
    if (!isLoggedIn()) return this.props.history.push("/login");
    this.retrieveNotesAndUsers(this.state.user);
  };

  retrieveNotesAndUsers = async (user) => {
    if (user.data) {
      if (user.data.user.role === "S") this.props.history.goBack();
      else {
        this.props.getNotes();
        this.props.getUsers();
      }
    }
  };

  componentDidUpdate = (prevState) => {
    if (prevState.user !== this.props.user)
      this.retrieveNotesAndUsers(this.props.user);
  };

  static getDerivedStateFromProps(props, state) {
    const data = props.user.data;
    if (data) {
      const notes = props.notes.Notes;
      const noteMonths = new Array(12).fill(0);
      if (notes) {
        props.notes.Notes.forEach((note) => {
          const timeObject = moment(note.createdAt).toObject();
          const month = Number(timeObject.months);
          noteMonths[month] = noteMonths[month] + 1;
        });
      }
      return {
        notes: props.notes.Notes || [],
        users: props.users || [],
        userFullName: `${data.user.firstName} ${data.user.lastName}`,
        username: data.user.username,
        noteMonths: noteMonths,
        chartData: {
          labels: state.labels,
          datasets: [
            {
              label: "click to show note traffic",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: noteMonths
            }
          ]
        }
      };
    }
    return null;
  }

  handleLogout = () => {
    store.remove("user");
    this.props.logoutUser();
    window.location.reload();
  };

  modelShow = (index) => this.setState({ showModel: true, index: index });
  modelClose = () => this.setState({ showModel: false });

  remove = () => {
    this.modelClose();
    const users = this.state.users.data;
    const userToDelete = users.splice(this.state.index, 1);
    const afterDel = users;
    this.setState({ users: afterDel });
    this.props.deleteUser(userToDelete[0]._id);
  };

  search = (e) => {
    try {
      const users = this.state.users.data.filter((users) => {
        const regex = new RegExp(e.target.value, "gi");
        const fullname = `${users.firstName} ${users.lastName}`;
        return fullname.match(regex);
      });
      users.length === this.state.users.data.length
        ? this.setState({ isSearchEnable: false })
        : this.setState({ isSearchEnable: true });
      this.setState({ searched: users });
    } catch (e) {
      return [];
    }
  };

  renderNotes = () => {
    const users = this.state.users;
    if (users.data)
      if (users.data.length === 0)
        return (
          <div>
            <img className="image_style" src={emptyLogo} alt="emptyLogo" />;
            <h3>There are no user</h3>
          </div>
        );
      else
        return this.state.users.data.map((user, i) => (
          <Card className="text-left boxContainer" key={i}>
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
                  this.modelShow(i);
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
        <Card className="text-left boxContainer" key={i}>
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
          </Card.Body>
        </Card>
      );
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.showModel} onHide={this.modelClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete user ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.modelClose}>
              Cancel
            </Button>
            <Button variant="info" onClick={this.remove}>
              Delete user
            </Button>
          </Modal.Footer>
        </Modal>
        <Navbar className="bg-light justify-content-between">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                @{this.state.username}
              </InputGroup.Text>
              <Button variant="info" onClick={this.handleLogout}>
                Log out
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
          <Form.Control
            type="text"
            placeholder="Type user name to filter users"
            id="input"
            onChange={this.search}
          />
        </Navbar>
        {!this.state.isSearchEnable ? (
          <React.Fragment>
            <div className="container">
              <h3>Admin: {this.state.userFullName}</h3>
            </div>
            <div className="chart">
              {this.props.notes.Notes ? (
                <Bar
                  data={this.state.chartData}
                  options={{
                    title: {
                      display: true,
                      text: "NOTE GRAPH",
                      fontSize: 30
                    },
                    legend: {
                      display: true,
                      position: "right"
                    }
                  }}
                />
              ) : (
                <div />
              )}
            </div>
            <br />
            <h3>Users List</h3>
            <div>{this.renderNotes()}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="container">
              <h3>Filter users {this.state.searched.length}</h3>
            </div>
            <div>{this.displaySearch()}</div>
          </React.Fragment>
        )}
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
