import React, { Component } from 'react';

export class TableQuestions extends Component {
	displayName = TableQuestions.name

	constructor(props) {
		super(props);
		this.state = {
			faqs: [],
			loading: true
		};
		fetch('api/Questions')
			.then(response => response.json())
			.then(data => {
				this.setState({ faqs: data, loading: false });
			});
	}

	static renderQuestionsTable(faqs) {
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
					{faqs.map((faq, index )=>
						<tr key={index}>
							<td>{index}</td>
							<td>{faq.id}</td>
							<td>{faq.question}</td>
							<td>{faq.answer}</td>
							<td>{faq.voteUp}</td>
							<td>{faq.voteDown}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
		? <p><em>Loading...</em></p>
		: TableQuestions.renderQuestionsTable(this.state.faqs);

		return (
			<div>
				{contents}
			</div>
		);
	}
}