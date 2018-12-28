import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer';
import ClipList from './components/ClipList';
import { Layout } from 'antd';
import { Button } from 'antd';
import './styles/App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [
        { startTime: 0, endTime: 40 },
        { startTime: 12, endTime: 40 },
        { startTime: 8, endTime: 40 }
      ],
      creating: false
    };
  }

  playClip = e => {
    console.log(e);
  };

  createClip = e => {
    console.log(e);
  };

  render() {
    const { clips } = this.state;
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
            <ClipList
              clips={clips}
              onPlayClick={this.playClip}
              onNewClipClick={this.createClip}
            />
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default App;
