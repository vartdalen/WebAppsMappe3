import React, { Component } from 'react';

export class FAQ extends Component {
	displayName = FAQ.name

	constructor(props) {
		super(props);
		this.state = {
			faqs: [],
			loading: true
		};
		fetch('api/FAQs')
			.then(response => response.json())
			.then(data => {
				this.setState({ faqs: data, loading: false });
			});
	}

	static renderFAQsTable(faqs) {
		return (
			<table className='table'>
				<thead>
					<tr>
						<th>Question</th>
						<th>Answer</th>
						<th>Upvotes</th>
						<th>Downvotes</th>
					</tr>
				</thead>
				<tbody>
					{faqs.map(faq =>
						<tr key={faq.Id}>
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
		: FAQ.renderFAQsTable(this.state.faqs);

		return (
			<div>
				<h1>FAQ</h1>
				{contents}
			</div>
		);
	}
}