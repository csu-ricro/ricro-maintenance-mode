import React, {
  Component
} from 'react';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import {
  Toolbar,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import CsuSvgLogo, {
  CsuFooter
} from './CsuBranding';

import config from './config.json';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

document.title = document.title === '' ? config.appName + ' - ' + config.unitTitle : document.title;

class App extends Component {
  constructor(props){
    super(props);
    this.timerLength = 60;
    this.state = {
      completed: 0,
      timer: this.timerLength
    };
  }
  componentDidMount() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $('#logobar').addClass('display-none');
        $('#top-toolbar').addClass('sticky');
      } else {
        $('#logobar').removeClass('display-none');
        $('#top-toolbar').removeClass('sticky');
      }
    });
    this.timer = setTimeout(() => this.progress(100/this.timerLength), 1000);
  }
  progress(completed) {
    if (this.state.timer === 0 || completed < 0) {
      this.setState({completed: 100});
      clearTimeout(this.timer);
      $(location).attr('href', window.location.origin);
    } else {
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(completed + 100/this.timerLength), 1000);
      this.setState({timer: this.state.timer-1});
    }
  }
  render() {
    const size = 300;
    const style = {
      stacked: {
        margin: 0,
        left: 'calc(50% - '+size/2+'px)',
        position: 'absolute',
        display: 'inline-block',
        width: size+'px',
        height: size+'px',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: size+'px'
      },
      tooltip:{
        left: 'calc(50% - '+size/2+'px)',
        position: 'absolute',
      },
      container: {
        position: 'relative',
        margin: 'auto',
        height: size+'px',
        width: size+'px'
      }
    }
    return (
      <div>
        <AppBar
          id='logobar'
          iconElementLeft={<CsuSvgLogo />} />
        <Toolbar id='top-toolbar'>
          <ToolbarTitle text={config.appName} />
        </Toolbar>
        <div id='main-content'>
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
                href={config.unitContact}
                label='Contact Us'
                style={{marginTop: '10px'}}
                fullWidth={true}
                icon={<FontIcon className='material-icons'>mail</FontIcon>}/>
            </div>
          </div>
        </div>
        <CsuFooter/>
      </div>
    );
  }
}
export default App;
