import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPlayer from './components/VideoPlayer';
import ClipList from './components/ClipList';
import ClipForm from './components/ClipForm';
import { Layout } from 'antd';
import { Button } from 'antd';
import './styles/App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    const { creating } = this.props;
    return (
      <Layout>
        <Header>
          <span className="logo">{`< Video Player />`}</span>
          <Button type="primary">Share</Button>
        </Header>
        <Layout className="main">
          <Layout>
            <Content className="content">
              <VideoPlayer src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4" />
            </Content>
            <Footer className="footer">Controls will show up here</Footer>
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
