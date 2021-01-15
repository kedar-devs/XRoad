import { Route, Switch } from 'react-router-dom'
import './App.css'
import CitizenForm from './components/Forms/CitizenForm'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/test-form' component={CitizenForm} />
			</Switch>
		</div>
	)
}

export default App
