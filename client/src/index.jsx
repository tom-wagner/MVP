import React from 'react';
import ReactDOM from 'react-dom';
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

  	}
  }

  render () {
    return (
      <div>
        <div>Do You Need An Umbrella?</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));