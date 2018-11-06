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
			voteDown: 0,
			faqs: [],
			loading: true
		};
		fetch('api/FAQs')
			.then(response => response.json())
			.then(data => {
				this.setState({ faqs: data, loading: false });
			});
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