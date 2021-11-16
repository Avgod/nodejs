import React from 'react';

import { Layout, Menu } from 'antd';
import {
  HomeFilled,
  DatabaseFilled,
  DashboardFilled,
  AuditOutlined,
  ExclamationOutlined,
  LogoutOutlined,
  UserOutlined,
  ProjectFilled,
  CheckSquareFilled,
  ControlFilled,
  BorderOuterOutlined,
  PicCenterOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import EmployeeData from './components/employeeData';
import ProjectData from './components/projectData';
import Checklist from './components/checklist';
import RolesAndResponse from './components/rolesAndResponsibilities';
import NewAudit from './components/newAudit';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Reports from './components/reports';
import Logout from './components/logout';
import UpdateAudit from './components/updateAudit';

import './index.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const New = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeFilled />}>
              <Link to="/audit-tool/home">
                HOME
                  </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<DatabaseFilled />} title="DATA MANAGEMENT">
              <Menu.Item key="2" icon={<UserOutlined />}><Link to="/audit-tool/data-management/employee-data">Employee Data</Link></Menu.Item>
              <Menu.Item key="3" icon={<ProjectFilled />}><Link to="/audit-tool/data-management/project-data">Project Data</Link></Menu.Item>
              <Menu.Item key="4" icon={<CheckSquareFilled />}><Link to="/audit-tool/data-management/checklist">Checklist</Link></Menu.Item>
              <Menu.Item key="5" icon={<ControlFilled />}><Link to="/audit-tool/data-management/roles-responsibilities">Roles & Responsibilities</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<DashboardFilled />}>
              <Link to="/audit-tool/dashboard">
                DASHBOARD
                  </Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<AuditOutlined />} title="AUDIT">
              <Menu.Item key="7" icon={<BorderOuterOutlined />}><Link to="/audit-tool/audit/new-audit">New Audit</Link></Menu.Item>
              <Menu.Item key="8" icon={<PicCenterOutlined />}><Link to="/audit-tool/audit/update-audit">Update Audit</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<ExclamationOutlined />}>
              <Link to="/audit-tool/reports">
                REPORTS
                  </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<LogoutOutlined />}>
              <Link to="/audit-tool/logout">
                LOGOUT
                  </Link>
            </Menu.Item>
          </Menu>
        </>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          AUDIT TOOL
        </Header>
        <Content style={{ margin: '40px 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route exact path="/audit-tool/home">
                <Home />
              </Route>
              <Route exact path="/audit-tool/data-management/employee-data">
                <EmployeeData />
              </Route>
              <Route exact path="/audit-tool/data-management/project-data">
                <ProjectData />
              </Route>
              <Route exact path="/audit-tool/data-management/checklist">
                <Checklist />
              </Route>
              <Route exact path="/audit-tool/data-management/roles-responsibilities">
                <RolesAndResponse />
              </Route>
              <Route exact path="/audit-tool/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/audit-tool/audit/new-audit">
                <NewAudit />
              </Route>
              <Route exact path="/audit-tool/audit/update-audit">
                <UpdateAudit />
              </Route>
              <Route exact path="/audit-tool/reports">
                <Reports />
              </Route>
              <Route exact path="/audit-tool/logout">
                <Logout />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  </Router>
);

export default New;
