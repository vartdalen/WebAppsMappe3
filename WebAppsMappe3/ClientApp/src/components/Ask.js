import React, { Component } from 'react';

export class Ask extends Component {
	displayName = Ask.name

	constructor(props) {
		super(props);
		this.state = {
			question: '',
			questions: [],
			loading: true
		};
		this.insertQuestionToInput = this.insertQuestionToInput.bind(this);
		this.insertQuestionState = this.insertQuestionState.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.voteDown = this.voteDown.bind(this);
		this.fetchQuestionsTable = this.fetchQuestionsTable.bind(this);
		this.fetchQuestionsTable();
	}

	voteUp(id) {
		this.setState({
		});
		this.state.questions[id].voteUp += 1;
	}
	voteDown() {
		this.setState({
		});
	}

	insertQuestionToInput(event) {
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

	render() {
		let contents = this.state.loading
		if (contents) { return (<p><em>Loading...</em></p>); }
		else {
			return (
				<div>
					<h1>Ask</h1>
					<div>
						<table className='table'>
							<thead>
								<tr>
									<th>Votes</th>
									<th>Array Index</th>
									<th>DB Index</th>
									<th>Question</th>
									<th>Answer</th>
									<th>Upvotes</th>
									<th>Downvotes</th>
								</tr>
							</thead>
							<tbody>
								{this.state.questions.map((question, index) =>
									<tr key={index}>
										<td class="vote" data-reactid=".0.1:$2.0">
											<div class="vote-icons" data-reactid=".0.1:$2.0.1">
												<div class="upvote" data-reactid=".0.1:$2.0.1.0">
													<i onClick={() => { this.voteUp(index) }} class="glyphicon glyphicon-chevron-up" data-reactid=".0.1:$2.0.1.0.0"></i>
												</div>
												<span class="upvote-count" data-reactid=".0.1:$2.0.2">{question.voteUp - question.voteDown}</span>
												<div class="downvote" data-reactid=".0.1:$2.0.1.1">
													<i class="glyphicon glyphicon-chevron-down" data-reactid=".0.1:$2.0.1.1.0"></i>
												</div>
											</div>
										</td>
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
					</div>
					<p>Real Time Question: <strong>{this.state.question}</strong></p>
					<p>On Click Question: <strong>{this.state.questionOnClick}</strong></p>
					<form onSubmit={this.submitQuestion}>
						<input type="text" name="question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestionToInput} />
						<input type="submit" value="Submit" />
					</form>

					<button onClick={this.voteUp}>Upvote</button>
					<button onClick={this.insertQuestionState}>New Question</button>
				</div>
			);
		}
	}
}
