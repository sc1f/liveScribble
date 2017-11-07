import React, { Component } from 'react';
import LiveTextArea from './LiveTextArea';
import Users from './Users';
import '../../public/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
              <div className="meta">
                <h1 className="header">livescribble</h1>
                <p className="share-prompt">share this link for others to edit:</p>
                <a id="share-link" href="#livescribble123">https://livescribb.le/123</a>
                <p className="footer">created by <a href="https://juntan.me" target="_blank" ref="noopener noreferrer">jun tan</a></p>
              </div>
              <div className="entry">
                <LiveTextArea/>
                <Users/>
              </div>
            </div>
        );
    }
}

export default App;
