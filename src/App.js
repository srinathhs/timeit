import React, { Component } from 'react';
import logo from './logo.svg';
import MainContainer from './MainContainer';

class App extends Component {
  render() {
    return (
      <section>
        <header className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Timeit
            </h1>
              <h2 className="subtitle">
                Simple time tracking
            </h2>
            </div>
          </div>
        </header>
        <div className="container">
        

      <MainContainer> </MainContainer>
          </div>

          
        
        
          <footer className="footer">
            <div className="container">
              <div className="content has-text-centered">
                <p>
                  <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
      </p>
                <p>
                  <a className="icon" href="https://github.com/jgthms/bulma">
                    <i className="fa fa-github"></i>
                  </a>
                </p>
              </div>
            </div>
          </footer>
      </section>
        );
  }
}

export default App;
