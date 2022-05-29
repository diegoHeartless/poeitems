import React, {useEffect, useRef, useState} from 'react';
import './MediaWikiSitewide.css'
import 'antd/dist/antd.css';
import './App.css';

import CreateItem from "./component/CreateItem";

import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { Layout, Menu } from 'antd';
import MainRouter from "./router/MainRouter";
import {Link} from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function App() {
        return (
        <div className="App">
            <MainRouter/>
        </div>
    )
}

export default App;
