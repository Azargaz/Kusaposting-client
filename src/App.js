import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'typeface-roboto';
import "./App.css";

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#48a999',
			main: '#00796b',
			dark: '#004c40',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#a98274',
			main: '#795548',
			dark: '#4b2c20',
			contrastText: '#ffffff',
		}
	}
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<Router>
					<Navbar />
					<div className="container">					
						<Switch>
							<Route exact path="/" component={home} />
							<Route exact path="/login" component={login} />
							<Route exact path="/signup" component={signup} />
						</Switch>
					</div>
				</Router>
			</div>
		</MuiThemeProvider>		
	);
}

export default App;
