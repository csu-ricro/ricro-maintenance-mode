import React, {
  Component
} from 'react';
import $ from 'jquery';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {
  ToolbarTitle
} from 'material-ui/Toolbar';

import AppContainer from './csu-app-template/AppContainer';
import config from './config.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.timerLength = 60;
    this.state = {
      completed: 0,
      timer: this.timerLength
    };
  }
  progress(completed) {
    if (this.state.timer === 0 || completed < 0) {
      this.setState({
        completed: 100
      });
      clearTimeout(this.timer);
      $(location).attr('href', window.location.origin);
    } else {
      this.setState({
        completed
      });
      this.timer = setTimeout(() => this.progress(completed + 100 / this.timerLength), 1000);
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }
  componentDidMount() {
    this.timer = setTimeout(() => this.progress(100 / this.timerLength), 1000);
  }
  render() {
    const size = 300;
    const style = {
      stacked: {
        margin: 0,
        left: 'calc(50% - ' + size / 2 + 'px)',
        position: 'absolute',
        display: 'inline-block',
        width: size + 'px',
        height: size + 'px',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: size + 'px'
      },
      tooltip: {
        left: 'calc(50% - ' + size / 2 + 'px)',
        position: 'absolute',
      },
      container: {
        position: 'relative',
        margin: 'auto',
        height: size + 'px',
        width: size + 'px'
      }
    }
    const header = <ToolbarTitle text={config.app.name} />;
    return (
      <AppContainer config={config} header={header}>
          <div className='text-center'>
            <h1>We'll be right back</h1>
            <h5 style={{color: 'rgba(0, 0, 0, 0.54)'}}>We are currently updating this app. This page will automaticly refresh every {this.timerLength} seconds.</h5>
          </div>
          <div style={style.container}>
            <h2 id='timer' style={style.stacked}>{this.state.timer}</h2>
            <CircularProgress
              style={style.stacked}
              size={size}
              mode='determinate'
              value={this.state.completed}/>
          </div>
          <div
            className='row'
            style={{
              marginTop: '10px',
              marginBottom: '20px'
            }}>
            <div className='col-md-offset-2 col-md-4 text-center'>
              <RaisedButton
                onTouchTap={this.progress.bind(this, -1)}
                label='Refresh Now'
                style={{marginTop: '10px'}}
                fullWidth={true}
                icon={<FontIcon className='material-icons'>refresh</FontIcon>}/>
            </div>
            <div className='col-md-4 text-center'>
              <RaisedButton
                href={config.unit.contactHref}
                label='Contact Us'
                style={{marginTop: '10px'}}
                fullWidth={true}
                icon={<FontIcon className='material-icons'>mail</FontIcon>}/>
            </div>
          </div>
        </AppContainer>
    );
  }
}
export default App;
