import React, { Component } from 'react';

export class TableQuestions extends Component {
	displayName = TableQuestions.name

	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			loading: true
		};
		this.fetchQuestionsTable();
	}

	fetchQuestionsTable() {
		fetch('api/Questions')
			.then(response => response.json())
			.then(data => {
				this.setState({ questions: data, loading: false });
			});
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
		: TableQuestions.renderQuestionsTable(this.state.questions);
		return (
			<div>
				{contents}
			</div>
		);
	}
}