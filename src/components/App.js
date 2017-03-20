import React from 'react';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: 'React'
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		let name = prompt('Enter a new name');
		this.setState({name});
	}
	render() {
		return (
			<div>
				<div>Hello {this.state.name}</div>
				<button onClick={this.handleClick}>Rename</button>
			</div>
		)
	}
}
