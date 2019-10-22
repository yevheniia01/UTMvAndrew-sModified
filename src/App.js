import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import theme from './theme';

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </ThemeProvider>
    );
  }
}

export default App;