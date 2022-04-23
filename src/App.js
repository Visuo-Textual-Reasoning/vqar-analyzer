import './App.css';
import Sidebar from './components/Sidebar/Index';
import VQA from './components/VQA/Index';
import EvaluateProvider from './contexts/EvaluateProvider';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
	return (
		<EvaluateProvider>
			<Router>
			<Sidebar />
				<Routes>
					<Route exact path="/" element={<VQA />} />
          			<Route exact path="/vqa" element={<VQA />} />
          			{/* <Route exact path="/vcr" element={<VCR />} /> */}
				</Routes>
			</Router>
		</EvaluateProvider>
	);
}

export default App;
