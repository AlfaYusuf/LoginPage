import React, { Fragment, Suspense, lazy } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Button, Layout } from "antd";
import { useState } from "react";
import { connect, useSelector } from 'react-redux';
import "./App.css";
import Spinner from "./common/Spinner/Spinner.tsx";
// import SlesVibe from "./Assets/Images/SalesVibe.png";
import StickyText from "./common/StickyText/StickyText.tsx";
import Login from "./Module/General/Login/Login.tsx";
import { increment, decrement } from '../src/Module/redux/actions'
import { reactLocalStorage } from "reactjs-localstorage";

const { Header, Footer, Sider } = Layout;

const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [Islogin, SetIslogin] = useState(0);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [stickyType, setStickyType] = useState("");
  const [stickyTitle, setStickyTitle] = useState("");
  const [stickyMessage, setStickyMessage] = useState("");

  function showSticky(isVisible, type, title, message) {
    setStickyVisible(isVisible);
    setStickyType(type);
    setStickyTitle(title);
    setStickyMessage(message);
  }

  const handleSignOut = () => {

    sessionStorage.clear();
    localStorage.clear();
    reactLocalStorage.clear();
    window.location.reload(); // Ensures state is reset
    showSticky(true, 'success', 'Success', 'Logout successful!');
  };

  const handleStickyClose = () => {
    setStickyVisible(false);
  };

  if (!isAuthenticated) {

    reactLocalStorage.clear();
    return (<Login />)

  }
  else {
    return (
      <>
        <>

          {stickyVisible ? (
            <StickyText
              display={stickyVisible}
              sticky_type={stickyType}
              sticky_title={stickyTitle}
              sticky_message={stickyMessage}
              sendData={handleStickyClose}
            />
          ) : (
            <></>
          )}
        </>

        <Layout>
          <Spinner />


          <Layout className="site-layout">


            <Button onClick={handleSignOut}>Sign Out</Button>

          </Layout>
        </Layout>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  // // debugger
  return {
    Login: state.Login  // Mapping the Redux state `count` to a prop
  };
};

// mapDispatchToProps - maps dispatch to props (optional)
const mapDispatchToProps = {

  increment,
  decrement

};
export default connect(mapStateToProps, mapDispatchToProps)(App);








