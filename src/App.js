import './App.css';
import CustomQuestionForm from './components/CustomQuestionForm/Index';
import EvaluateProvider from './contexts/EvaluateProvider';

function App() {
	return (
		<EvaluateProvider>
			<div className="App">
				<CustomQuestionForm />
			</div>
		</EvaluateProvider>
	);
}

export default App;
