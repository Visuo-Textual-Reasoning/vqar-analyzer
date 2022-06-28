import './App.css';
import VQAPage from './pages/VQA';
import VCRPage from './pages/VCR';
import Login from './components/Login/Index';
import EvaluateProvider from './contexts/EvaluateProvider';
import VocabProvider from './contexts/VocabProvider';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './components/Home/Index';
import MenuBar from './components/MenuBar/Index';

// console.log(process.env)
if (process.env.NODE_ENV !== 'production'){
	console = {}
	console.log = function(){}

	window.console = console;
}

function App() {
	const theme = useTheme();

	const myTheme = createTheme(theme, {
		palette: {
			secondary: {
				main: '#ff7b00',
				light: '#ff9500',
				dark: '#e36414',
				contrastText: '#fff'
			},
			primary: {
				main: '#2d6a4f',
				dark: '#1b4332',
				light: '#74c69d',
				contrastText: '#fff'
			}
		},
		typography: {
			fontFamily: [ 'Cascadia code', 'monospace' ].join(', ')
		}
	});
	console.log(useTheme());
	return (
		<ThemeProvider theme={myTheme}>
			<AuthProvider>
				<EvaluateProvider>
					<VocabProvider>
						{/* <Router> */}
						<HashRouter>
							{/* <Sidebar /> */}
							<MenuBar />
							<Routes>
								<Route exact path="/" element={<Home />} />
								<Route exact path="/vqa" element={<VQAPage />} />
								<Route exact path="/vcr" element={<VCRPage />} />
								<Route exact path="/login" element={<Login />} />
							</Routes>
						</HashRouter>
						{/* </Router> */}
					</VocabProvider>
				</EvaluateProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
