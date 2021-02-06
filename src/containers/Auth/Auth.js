import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";

const Auth = ({ loading, error, isAuthenticated, onAuth }) => {
  const [email, setemail] = useState("");
  const [psw, setPsw] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onAuth(email, psw);
  };

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to="/overview" />;
  }

  let form = (
    <form>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={psw}
        onChange={(e) => setPsw(e.target.value)}
      />
      <br />
      <button
        onClick={(e) => {
          submit(e);
        }}
      >
        Login
      </button>
      <p>{error}</p>
    </form>
  );
  if (loading) {
    form = <div>Loading...</div>;
  }

  return (
    <div className="Auth">
      {authRedirect}

      <div className="Auth">
        <h1>LOGIN</h1>
        <h4>Please login into your account</h4>
        {form}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
