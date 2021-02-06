import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./Overview.scss";
import * as actions from "../../store/actions/index";

const Overview = ({ token, onLogout }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/test`,
          config
        );
        setData(response.data);
        console.log("data:", response.data);
      } catch (err) {
        setIsError(err.response.data.error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [token]);

  const logout = () => {
    onLogout();
    history.push("/");
  };

  return (
    <div className="Overview">
      <button onClick={logout}>Logout</button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="card-container">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.title}</h3> <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
