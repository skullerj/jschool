import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './components/VideoPlayer';
import ClipList from './components/ClipList';
import ClipForm from './components/ClipForm';
import KeyboardControls from './components/KeyboardControls';
import ShareButton from './components/ShareButton';
import { Layout } from 'antd';

import './styles/App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    const { creating } = this.props;
    return (
      <Layout>
        <Header style={{ padding: '0 14px' }}>
          <div className="header">
            <span className="logo">{`< Video Player />`}</span>
            <ShareButton />
          </div>
        </Header>
        <Layout className="main">
          <Layout>
            <Content className="content">
              <VideoPlayer src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4" />
            </Content>
            <Footer className="footer">
              <KeyboardControls />
            </Footer>
          </Layout>
          <Sider width={350} theme="light">
            {creating ? <ClipForm /> : <ClipList />}
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  creating: state.creatingClip
});

export default connect(mapStateToProps)(App);
