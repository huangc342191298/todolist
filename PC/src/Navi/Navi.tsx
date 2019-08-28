import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//引入路由
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
//引入组件
import todolist from './Todo';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import './Navi.css'
const { Header, Content, Footer, Sider } = Layout;


class SiderDemo extends Component<any,any> {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Router>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                        <Icon type="ordered-list" />
                            <span className="nav-text">To Do List</span>
                            <Link to="/todolist"> </Link>
                        </Menu.Item>
                        {/* <Menu.Item key="2">
                            <Icon type="plus-circle" />
                            <span className="nav-text">添加</span>
                            <Link to="/App"></Link>
                        </Menu.Item> */}
                        {/* <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information ToDo List</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>huangc</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                          <Route exact path="/todolist" component={todolist} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2019 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout></Router>
        );
    }
}
export default SiderDemo;