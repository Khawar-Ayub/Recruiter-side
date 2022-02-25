import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../action";
import { login } from "../../action";
import axios from "axios";
import "./header.css";
import { CgMenuRight } from "react-icons/cg";
import { BsChevronDown } from "react-icons/bs";
import Avatar from "react-avatar";
import logo from "../../images/logo.png";

export default function Header(props) {
  const [header, setHeader] = useState("header");
  const [error, seterror] = useState();
  const [dropdown, setdropdown] = useState(false);

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setHeader("header2") : setHeader("header");
  };
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    if (props.whiteColor === true) {
      setHeader("header2");
    }
    authUser();
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const handleLogout = async () => {
    const response = await axios
      .get(`http://localhost:5000/user/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(logout());
          navigate("/");
        } else {
          console.log("error");
          seterror(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
        seterror(err.response.data.message);
      });
  };

  const authUserAPICall = async () => {
    const response = await axios.get("http://localhost:5000/user/authUser", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response;
  };
  const authUser = () => {
    authUserAPICall()
      .then((res) => {
        if (res.status === 200) {
          dispatch(login({ email: res.data.email, isLoggedIn: true }));
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
      });
  };
  return (
    <div className={header}>
      <div className="header-left-container">
        <img src={logo} alt="WeHire" />
      </div>
      <div className="header-right-container">
        <div className="header-right-wrapper">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {user.isLoggedIn ? (
              <div className="header-loggedin">
                <div
                  className="header-loggedin-wrapper"
                  onClick={() => setdropdown(!dropdown)}
                >
                  <Avatar
                    name={user.email}
                    color="var(--button)"
                    maxInitials={2}
                    round={true}
                    size={window.innerWidth > 767 ? 40 : 33}
                    className="avatar"
                  />
                  <BsChevronDown
                    size={window.innerWidth < 767 ? 12 : 14}
                    style={{ marginLeft: "5px" }}
                  />
                </div>
                <ul id={dropdown ? "header-dropdown" : ""}>
                  <li>Update Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            ) : (
              <>
                <li>
                  <Link to="/signup">Join Now</Link>
                </li>
                <li>
                  <Link to="/signin" className="signin-button">
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="menu-bar">
        <CgMenuRight cursor="pointer" />
      </div>
    </div>
  );
}
