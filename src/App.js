import React, { Component } from "react";
import waterfall from "./video/waterfall.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const emailRegex = RegExp(/\S+@()+\.\S+/);

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const data = {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        },
      };
      postData("https://api.raisely.com/v3/check-user", data)
        .then(data.json)
        .then((data) => alert(data.data.status));
    } else {
      console.log(this.state.formErrors);
      console.error("FORM INVALID-DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email adress";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.State));
  };
  render() {
    const { formErrors } = this.state;
    return (
      <section>
        <video id="vid" autoPlay loop muted>
          <source src={waterfall} type="video/mp4" />
        </video>
        <nav id="bar" className="navbar">
          <li className="nav-item   ">
            <a className="nav-link " href="#" id="raisley">
              Home
            </a>
          </li>
          <li className="nav-item col-2 ">
            <a className="nav-link" href="#">
              ABOUT
            </a>
          </li>
          <li className="nav-item col-2 ">
            <a className="nav-link" href="#">
              CONTACT
            </a>
          </li>
          <li
            className="nav-item col-2 
        "
          >
            <a className="nav-link" href="#">
              LIBRARY
            </a>
          </li>
          <li
            className="nav-item col-2 
        "
          >
            <a className="nav-link" href="#">
              BLOG
            </a>
          </li>
        </nav>

        <form
          className="form container bg-primary"
          onSubmit={this.handleSubmit}
        >
          <h4 className="header container-fluid"> REGISTER HERE </h4>
          <div
            id="detail"
            className="form-group  py-4 "
            action="/"
            method="post"
          >
            <label htmlFor>First Name</label>
            <input
              className={formErrors.firstName.length > 0 ? "error " : ""}
              name="firstName"
              type="text"
              placeholder="firstname"
              onChange={this.handleChange}
            />
            <br />
            {formErrors.firstName.length > 0 && (
              <span className="errormessage">{formErrors.firstName}</span>
            )}
            <br />
            <label htmlFor>Last Name</label>
            <input
              className={formErrors.lastName.length > 0 ? "error " : ""}
              name="lastName"
              type="text"
              placeholder="lastname"
              onChange={this.handleChange}
            />
            <br />
            {formErrors.lastName.length > 0 && (
              <span className="errormessage">{formErrors.lastName}</span>
            )}
            <br />
            <label htmlFor id="email">
              Email{" "}
            </label>
            <input
              className={formErrors.email.length > 0 ? "error" : ""}
              name="email"
              type="email"
              NoValidate
              placeholder="email"
              onChange={this.handleChange}
            />
            <br />
            {formErrors.email.length > 0 && (
              <span className="errormessage">{formErrors.email}</span>
            )}
            <br />
            <label htmlFor>Password </label>
            <input
              className={formErrors.password.length > 0 ? "error " : ""}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <br />
            {formErrors.password.length > 0 && (
              <span className="errormessage">{formErrors.password}</span>
            )}
            <br />
            <div>
              <button
                id="btn"
                type="submit"
                onClick={(e) => this.handleSubmit(e)}
              >
                create account
              </button>
              <br />
              <small>Already Have an Account?</small>
              <small>log in</small>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
