import './App.css';
import Sidebar from './components/Sidebar/Index';
import VQA from './components/VQA/Index';
import EvaluateProvider from './contexts/EvaluateProvider';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { ThemeProvider, useTheme } from '@mui/material';
import Home from './components/Home/Index';

function App() {
	const theme = useTheme()
	return (
		<ThemeProvider theme={theme}>
		<EvaluateProvider>
			<Router>
			<Sidebar />
				<Routes>
					<Route exact path="/" element={<Home/>} />
          			<Route exact path="/vqa" element={<VQA />} />
          			{/* <Route exact path="/vcr" element={<VCR />} /> */}
				</Routes>
			</Router>
		</EvaluateProvider>
		</ThemeProvider>
	);
}

export default App;
