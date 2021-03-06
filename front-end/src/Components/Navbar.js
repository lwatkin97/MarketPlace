import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SignInPopup } from "../Components/Popup/SignInPopup";
import { SignUpPopup } from "../Components/Popup/SignUpPopup";
import * as UserManagement from "../API/UserManagementAPI";
import { Link } from "react-router-dom";
import "./Style/Navbar.scss";
const { Header } = Layout;
const { SubMenu } = Menu;

export function Navbar() {
  const [signInVisible, setSigninPopup] = useState(false);
  const [signUpVisible, setSignupPopup] = useState(false);
  const [isSignedin, setSignin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const handleSigninClick = () => {
    setSigninPopup(true);
  };
  const handleSignupClick = () => {
    setSignupPopup(true);
  };

  const onCancelSignin = () => {
    setSigninPopup(false);
  };

  const refreshPage = () => {
    window.location.reload(false);
    console.log("window is refreshed");
  };

  const onCreateSignin = (values) => {
    UserManagement.login(values).then((reponse) => {
      if (!reponse.error) {
        console.log(reponse);
        refreshPage();
        localStorage.setItem("token", reponse.token);
        localStorage.setItem("username", reponse.user.username);
        setSignin(true);
        setSignInError(false);
        setSigninPopup(false);
      } else {
        setSignInError(true);
      }
    });
  };

  const onCancelSignUp = () => {
    setSignupPopup(false);
  };

  const onCreateSignUp = (values) => {
    UserManagement.signup(values).then((reponse) => {
      if (!reponse.error) {
        localStorage.setItem("token", reponse.token);
        localStorage.setItem("username", reponse.username);
        setSignin(true);
        setSignUpError(false);
        setSignupPopup(false);
      } else {
        setSignUpError(true);
      }
    });
  };

  const handleLogout = () => {
    setSignin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    refreshPage();
  };

  const generateSignInNav = (
    <Menu
      className="menu-item-group"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1">
        <Link to="/">Home </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/sell">Sell your clothes </Link>
      </Menu.Item>
      <SubMenu
        title={<span className="submenu-title-wrapper">My account</span>}
      >
        <Menu.Item key="setting:1">
          <Link to="/user-item"> Items you're selling </Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to="/user-order"> Your order history </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="4" onClick={handleLogout}>
        Logout
      </Menu.Item>
      <Menu.Item key="5">
        {" "}
        <Link to="/chatrooms"> Chat </Link>
      </Menu.Item>
      <Menu.Item key="6">
        {" "}
        <Link to="/basket"> My Basket </Link>
      </Menu.Item>
    </Menu>
  );

  const generatenotSignInNav = (
    <Menu
      className="menu-item-group"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1">
        <Link to="/">Home </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSigninClick}>
        Sign in
      </Menu.Item>
      <SignInPopup
        visible={signInVisible}
        onCreate={onCreateSignin}
        onCancel={onCancelSignin}
        hasError={signInError}
      />
      <Menu.Item key="3" onClick={handleSignupClick}>
        Sign up
      </Menu.Item>
      <SignUpPopup
        visible={signUpVisible}
        onCreate={onCreateSignUp}
        onCancel={onCancelSignUp}
        hasError={signUpError}
      />
      <Menu.Item key="4">Your basket</Menu.Item>
    </Menu>
  );

  return (
    <Header>{isSignedin ? generateSignInNav : generatenotSignInNav}</Header>
  );
}
