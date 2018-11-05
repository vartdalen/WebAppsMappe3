import React, { Component } from 'react';

export class FAQ extends Component {
	displayName = FAQ.name

	constructor(props) {
		super(props);
		this.state = {
			question: '',
			questionOnClick: '',
			answer: '',
			voteUp: 0,
			voteDown: 0
		};

		this.insertQuestion = this.insertQuestion.bind(this);
		this.insertQuestionOnClick = this.insertQuestionOnClick.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.voteDown = this.voteDown.bind(this);
	}

	voteUp() {
		this.setState({
			voteUp: this.state.voteUp + 1
		});
	}
	voteDown() {
		this.setState({
			voteDown: this.state.voteDown + 1
		});
	}

	insertQuestion(event) {
		this.setState({ question: event.target.value });
	}

	insertQuestionOnClick() {
		this.setState({ questionOnClick: this.state.question });
	}

	render() {
		return (
			<div>
				<h1>FAQ</h1>

				<p>Real Time Question: <strong>{this.state.question}</strong></p>
				<p>On Click Question: <strong>{this.state.questionOnClick}</strong></p>
				<p>Upvotes: <strong>{this.state.voteUp - this.state.voteDown}</strong></p>

				<input type="text" name="question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestion}></input>

				<button onClick={this.voteUp}>Upvote</button>
				<button onClick={this.voteDown}>Downvote</button>
				<button onClick={this.insertQuestionOnClick}>New Question</button>
			</div>
		);
	}
}