import React, { Component } from 'react';

export class Ask extends Component {
	displayName = Ask.name

	constructor(props) {
		super(props);
		this.state = {
			question: '',
			answer: '',
			questions: [],
			loading: true
		};
		this.insertQuestionToInput = this.insertQuestionToInput.bind(this);
		this.insertAnswerToInput = this.insertAnswerToInput.bind(this);
		this.insertQuestionStateToArray = this.insertQuestionStateToArray.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.voteDown = this.voteDown.bind(this);
		this.fetchQuestionsTable = this.fetchQuestionsTable.bind(this);

		this.fetchQuestionsTable();
	}

	voteUp(index, dbIndex) {
		const questionsUpVoted = this.state.questions.slice()
		questionsUpVoted[index].voteUp += 1

		fetch('api/Questions/' + dbIndex, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'id': dbIndex,
				'question': questionsUpVoted[index].question,
				'answer': questionsUpVoted[index].answer,
				'voteUp': questionsUpVoted[index].voteUp,
				'voteDown': questionsUpVoted[index].voteDown
			})
		})
		this.setState({ questions: questionsUpVoted })
	}

	voteDown(index, dbIndex) {
		const questionsDownVoted = this.state.questions.slice()
		questionsDownVoted[index].voteDown += 1

		fetch('api/Questions/' + dbIndex, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'id': dbIndex,
				'question': questionsDownVoted[index].question,
				'answer': questionsDownVoted[index].answer,
				'voteUp': questionsDownVoted[index].voteUp,
				'voteDown': questionsDownVoted[index].voteDown
			})
		})
		this.setState({ questions: questionsDownVoted });
	}

	insertQuestionToInput(event) {
		this.setState({ question: event.target.value });
	}

	insertAnswerToInput(event) {
		this.setState({ answer: event.target.value });
	}

	insertQuestionStateToArray() {
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
				this.setState({ questions: data, loading: false, answer: '' });
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

	submitAnswer(event, index, dbIndex) {
		event.preventDefault();
		const questionsAnswered = this.state.questions.slice()
		questionsAnswered[index].answer = this.state.answer

		fetch('api/Questions/' + dbIndex, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'id': dbIndex,
				'question': questionsAnswered[index].question,
				'answer': questionsAnswered[index].answer,
				'voteUp': questionsAnswered[index].voteUp,
				'voteDown': questionsAnswered[index].voteDown
			})
		}).then(() => this.fetchQuestionsTable());
	}

	render() {
		let contents = this.state.loading
		if (contents) { return (<p><em>Loading...</em></p>); }
		else {
			return (
				<div>
					<h1>Ask</h1>
					<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						{this.state.questions.map((question, index) =>
							<div key={index} className="panel panel-default">
								<div className="panel-heading" role="tab" id={'heading' + index}>
									<div className="row" data-reactid=".0.1:$2.0.1">
										<div className="upvote col-sm-12" data-reactid=".0.1:$2.0.1.0">
											<i onClick={() => { this.voteUp(index, question.id) }} className="glyphicon glyphicon-chevron-up" data-reactid=".0.1:$2.0.1.0.0"></i>
										</div>
										<div className="upvote-count col-sm-1" data-reactid=".0.1:$2.0.2">{question.voteUp - question.voteDown}</div>
										<div className="panel-title col-sm-11">
											<a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + index} aria-expanded="false" aria-controls="collapseOne">
												{question.question}
											</a>
										</div>
										<div className="downvote col-sm-12" data-reactid=".0.1:$2.0.1.1">
											<i onClick={() => { this.voteDown(index, question.id) }} className="glyphicon glyphicon-chevron-down" data-reactid=".0.1:$2.0.1.1.0"></i>
										</div>
									</div>
								</div>
								<div id={'collapse' + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
									<div className="panel-body">
										{question.answer}
										<form onSubmit={(e) => { this.submitAnswer(e, index, question.id) }}>
											<input type="text" name="answer" placeholder="Insert answer here" value={this.state.answer} onChange={this.insertAnswerToInput} />
											<input type="submit" value="Submit" />
										</form>
									</div>
								</div>
							</div>
						)}
					</div>
					<p>Real Time Question: <strong>{this.state.question}</strong></p>
					<form onSubmit={this.submitQuestion}>
						<input type="text" name="question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestionToInput} />
						<input type="submit" value="Submit" />
					</form>
					<button onClick={this.insertQuestionStateToArray}>New Question</button>
				</div>
			);
		}
	}
}
