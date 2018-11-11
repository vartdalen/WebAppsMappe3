import React, { Component } from 'react';

export class Ask extends Component {
	displayName = Ask.name

	constructor(props) {
		super(props);
		this.state = {
			question: '',
			asker: '',
			answer: '',
			replier: '',
			questions: [],
			loading: true
		};
		this.insertQuestionToInput = this.insertQuestionToInput.bind(this);
		this.insertAskerToInput = this.insertAskerToInput.bind(this);
		this.insertAnswerToInput = this.insertAnswerToInput.bind(this);
		this.insertReplierToInput = this.insertReplierToInput.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);
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
				'asker': questionsUpVoted[index].asker,
				'answer': questionsUpVoted[index].answer,
				'replier': questionsUpVoted[index].replier,
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
				'asker': questionsDownVoted[index].asker,
				'answer': questionsDownVoted[index].answer,
				'replier': questionsDownVoted[index].replier,
				'voteUp': questionsDownVoted[index].voteUp,
				'voteDown': questionsDownVoted[index].voteDown
			})
		})
		this.setState({ questions: questionsDownVoted });
	}

	submitQuestion(event) {
		event.preventDefault();
		fetch('api/Questions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 'question': this.state.question, 'asker': this.state.asker })
		}).then(() => this.fetchQuestionsTable());
	}

	deleteQuestion(dbIndex) {
		fetch('api/Questions/' + dbIndex, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 'id': dbIndex })
		}).then(() => this.fetchQuestionsTable());
	}

	submitAnswer(event, index, dbIndex) {
		event.preventDefault();
		const questionsAnswered = this.state.questions.slice()
		questionsAnswered[index].answer = this.state.answer
		questionsAnswered[index].replier = this.state.replier

		fetch('api/Questions/' + dbIndex, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'id': dbIndex,
				'question': questionsAnswered[index].question,
				'asker': questionsAnswered[index].asker,
				'answer': questionsAnswered[index].answer,
				'replier': questionsAnswered[index].replier,
				'voteUp': questionsAnswered[index].voteUp,
				'voteDown': questionsAnswered[index].voteDown
			})
		}).then(() => this.fetchQuestionsTable());
	}

	insertQuestionToInput(event) {
		this.setState({ question: event.target.value });
	}

	insertAskerToInput(event) {
		this.setState({ asker: event.target.value });
	}

	insertAnswerToInput(event) {
		this.setState({ answer: event.target.value });
	}

	insertReplierToInput(event) {
		this.setState({ replier: event.target.value });
	}

	setupAnswer(replier) {
		if (replier === '' || replier === null) {
			return 'div-highlight container-form hidden';
		} else {
			return 'div-highlight container-form show';
		}
	}

	fetchQuestionsTable() {
		fetch('api/Questions')
			.then(response => response.json())
			.then(data => {
				this.setState({ questions: data, loading: false, question: '', asker: '', answer: '', replier: ''});
			});
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
							<div key={index} className="panel panel-default container-form">
								<div className="panel-heading" role="tab" id={'heading' + index}>
									<div className="row" data-reactid=".0.1:$2.0.1">
										<div className="upvote col-sm-12" data-reactid=".0.1:$2.0.1.0">
											<i onClick={() => { this.voteUp(index, question.id) }} className="glyphicon glyphicon-chevron-up" data-reactid=".0.1:$2.0.1.0.0"></i>
										</div>
										<div className="vote-count col-sm-1" data-reactid=".0.1:$2.0.2">{question.voteUp - question.voteDown}</div>
										<div className="panel-title col-sm-10">
											<label htmlFor="question">{question.asker}'s question: &nbsp;</label>
											<a id ="question" role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + index} aria-expanded="false" aria-controls="collapseOne">
												{question.question}
											</a>
										</div>
										<button type="button" className="btn btn-danger col-sm-1 button-delete" onClick={() => { this.deleteQuestion(question.id) }}><span className="glyphicon glyphicon-trash"></span></button>
										<div className="downvote col-sm-12" data-reactid=".0.1:$2.0.1.1">
											<i onClick={() => { this.voteDown(index, question.id) }} className="glyphicon glyphicon-chevron-down" data-reactid=".0.1:$2.0.1.1.0"></i>
										</div>
									</div>
								</div>
								<div id={'collapse' + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
									<div className="panel-body">
										<div className={this.setupAnswer(question.replier)}>
											<label htmlFor="answer">{question.replier}'s reply: </label><br />
											{question.answer}
										</div><br />
										<form onSubmit={(e) => { this.submitAnswer(e, index, question.id) }}>
											<label htmlFor="input-replier">Reply to {question.asker}:</label><br />
											<div className="input-group">
												<div className="input-group-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></div>
												<input className="form-control" type="text" name="replier" id="input-replier" placeholder="Insert name here" value={this.state.replier} onChange={this.insertReplierToInput} />
											</div><br />
											<div className="input-group">
												<div className="input-group-addon"><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span></div>
												<input type="text" className="form-control" name="answer" id="answer" placeholder="Insert answer here" value={this.state.answer} onChange={this.insertAnswerToInput} />
											</div>
											<button type="submit" className="btn btn-primary">Submit answer</button>
										</form>
									</div>
								</div>
							</div>
						)}
					</div>
					<form className="panel-body div-highlight container-form" onSubmit={this.submitQuestion}>
						<label htmlFor="input-asker">Ask a question:</label><br />
						<div className="input-group">
							<div className="input-group-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></div>
							<input className="form-control" type="text" name="asker" id="input-asker" placeholder="Insert name here" value={this.state.asker} onChange={this.insertAskerToInput} />
						</div><br />
						<div className="input-group">
							<div className="input-group-addon"><span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span></div>
							<input className="form-control" type="text" name="question" id="input-question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestionToInput} />
						</div>
						<button type="submit" className="btn btn-primary">Submit question</button>
					</form>
				</div>
			);
		}
	}
}
