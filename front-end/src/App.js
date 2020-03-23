import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Navbar } from "../src/Components/Navbar";
import MainPage from "../src/Components/MainPage";
import SellItemForm from "../src/Components/Forms/SellItemForm";
import UserItemPage from "../src/Components/ProfilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../src/GlobalStateManagement/Reducer/Reducer";

const { Content, Footer } = Layout;
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <Navbar />
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/" component={MainPage}></Route>
                <Route path="/sell" component={SellItemForm}></Route>
                <Route path="/edit/*" component={SellItemForm}></Route>
                <Route path="/user-item" component={UserItemPage}></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2019 Created by Haylee Luu / Daphne Hegedus/ Jessica Liu with ♥
          </Footer>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
