import React, { Component } from 'react';

export class FAQ extends Component {
	displayName = FAQ.name

	constructor(props) {
		super(props);
		this.state = {
			question: '',
			voteUp: 0,
			voteDown: 0,
			questions: [],
			loading: true
		};
		this.insertQuestion = this.insertQuestion.bind(this);
		this.insertQuestionState = this.insertQuestionState.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.voteDown = this.voteDown.bind(this);
		this.fetchQuestionsTable = this.fetchQuestionsTable.bind(this);
		this.fetchQuestionsTable();
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

	insertQuestionState() {
		this.setState({ questionOnClick: this.state.question });

		const array = this.state.questions;
		const question = this.state.question;
		array.push({ question });
		this.setState({ questions: array });
		alert(JSON.stringify(this.state.questions));
	}

	fetchQuestionsTable() {
		fetch('api/Questions')
			.then(response => response.json())
			.then(data => {
				this.setState({ questions: data, loading: false });
			});
	}

	submitQuestion(event) {
		event.preventDefault();

		fetch('api/Questions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 'question': this.state.question })
		}).then(() => this.fetchQuestionsTable());
	}

	static renderQuestionsTable(questions) {
		return (
			<table className='table'>
				<thead>
					<tr>
						<th>Array Index</th>
						<th>DB Index</th>
						<th>Question</th>
						<th>Answer</th>
						<th>Upvotes</th>
						<th>Downvotes</th>
					</tr>
				</thead>
				<tbody>
					{questions.map((question, index) =>
						<tr key={index}>
							<td>{index}</td>
							<td>{question.id}</td>
							<td>{question.question}</td>
							<td>{question.answer}</td>
							<td>{question.voteUp}</td>
							<td>{question.voteDown}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: FAQ.renderQuestionsTable(this.state.questions);
		return (
			<div>
				<h1>FAQ</h1>
				<div>
					{contents}
				</div>
				<p>Real Time Question: <strong>{this.state.question}</strong></p>
				<p>On Click Question: <strong>{this.state.questionOnClick}</strong></p>
				<p>Upvotes: <strong>{this.state.voteUp - this.state.voteDown}</strong></p>
				<form onSubmit={this.submitQuestion}>
					<input type="text" name="question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestion} />
					<input type="submit" value="Submit" />
				</form>

				<button onClick={this.voteUp}>Upvote</button>
				<button onClick={this.voteDown}>Downvote</button>
				<button onClick={this.insertQuestionState}>New Question</button>
			</div>
		);
	}
}