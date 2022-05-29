import {BrowserRouter as Router, Link, useRoutes,} from "react-router-dom";

import React from "react";

import CreateItem from "../component/CreateItem";
import OneItem from "../component/item";
import {Layout} from "antd";
import Menu from "antd/es/menu";
import AllItems from "../component/AllItems";
const { Header, Content, Footer, Sider } = Layout;


const Routers = () => {
    return useRoutes([
        {path: "/", element: <CreateItem/>},
        {path: "/test", element: <AllItems/>},
        /* {path: "test2", element: <DragAndDropLayer/>}*/
    ]);
};

function MainRouter()  {
    //console.log(store)
    return (
        //<Provider >
            <Router>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" > <Link to="/test"> item1</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/"> create</Link></Menu.Item>
                        <Menu.Item key="3" >
                            Register
                        </Menu.Item>
                        <Menu.Item key="4">Sign in</Menu.Item>
                    </Menu>
                </Header>
                <Routers/>
            </Router>
      //  </Provider>
    );
}
export default MainRouter