import './App.css';
import VQAPage from './pages/VQA';
import VCRPage from './pages/VCR';
import EvaluateProvider from './contexts/EvaluateProvider';
import VocabProvider from './contexts/VocabProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './components/Home/Index';
import MenuBar from './components/MenuBar/Index';

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
			<EvaluateProvider>
				<VocabProvider>
					<Router>
						{/* <Sidebar /> */}
						<MenuBar />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/vqa" element={<VQAPage />} />
							<Route exact path="/vcr" element={<VCRPage />} />
						</Routes>
					</Router>
				</VocabProvider>
			</EvaluateProvider>
		</ThemeProvider>
	);
}

export default App;
