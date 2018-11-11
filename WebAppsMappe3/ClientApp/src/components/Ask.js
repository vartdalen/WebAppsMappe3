import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

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
		this.fetchQuestionsTable = this.fetchQuestionsTable.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);
		this.insertQuestionToInput = this.insertQuestionToInput.bind(this);
		this.insertAskerToInput = this.insertAskerToInput.bind(this);
		this.insertAnswerToInput = this.insertAnswerToInput.bind(this);
		this.insertReplierToInput = this.insertReplierToInput.bind(this);
		this.validateName = this.validateName.bind(this);
		this.validateSentence = this.validateSentence.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.setValidationIcon = this.setValidationIcon.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.voteDown = this.voteDown.bind(this);

		this.fetchQuestionsTable();
	}

	fetchQuestionsTable() {
		fetch('api/Questions')
			.then(response => response.json())
			.then(data => {
				this.setState({ questions: data, loading: false, question: '', asker: '', answer: '', replier: '' });
			});
	}

	submitQuestion(event) {
		event.preventDefault();
		if (this.validateForm(this.state.asker, this.state.question)) {
			fetch('api/Questions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 'question': this.state.question, 'asker': this.state.asker })
			}).then(() => this.fetchQuestionsTable());
		}
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
		if (this.validateForm(this.state.replier, this.state.answer)) {
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
		} else {
			return false;
		}
	}

	displayAnswer(replier) {
		if (replier === '' || replier === null) {
			return 'div-highlight container-form hidden';
		} else {
			return 'div-highlight container-form show';
		}
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

	validateName(name) {
		var regex = new RegExp("^[A-Z]+(([',. -][A-Z])?[a-zA-Z.'-]{1,15}){1,5}$");
		if (name.length < 1) return null;
		if (regex.test(name)) return 'success';
		else return 'error';
	}

	validateSentence(sentence) {
		var regex = new RegExp("^[A-Za-z][^,.:;'-_?!]*[.?!]$");
		if (sentence.length < 1) return null;
		if (regex.test(sentence)) return 'success';
		else return 'error';
	}

	setValidationIcon(type, input) {
		if (input.length < 1) {
			return '';
		}
		if (type === 'name') {
			if (this.validateName(input) === 'success') {
				return 'glyphicon glyphicon-ok';
			} else {
				return 'glyphicon glyphicon-remove';
			}
		}
		if (type === 'sentence') {
			if (this.validateSentence(input) === 'success') {
				return 'glyphicon glyphicon-ok';
			} else {
				return 'glyphicon glyphicon-remove';
			}
		}
	}

	validateForm(name, sentence) {
		if (this.validateName(name) === 'success' && this.validateSentence(sentence) === 'success') {
			return true;
		}
		return false;
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
										<div className="upvote col-xs-10" data-reactid=".0.1:$2.0.1.0">
											<i onClick={() => { this.voteUp(index, question.id) }} className="glyphicon glyphicon-chevron-up" data-reactid=".0.1:$2.0.1.0.0"></i>
										</div>
										<button type="button" className="btn btn-danger col-xs-1 button-delete" onClick={() => { this.deleteQuestion(question.id) }}><span className="glyphicon glyphicon-trash"></span></button>
										<div className="vote-count col-xs-12" data-reactid=".0.1:$2.0.2"><strong><h4>{question.voteUp - question.voteDown}</h4></strong></div>
										<div className="downvote col-xs-1" data-reactid=".0.1:$2.0.1.1">
											<i onClick={() => { this.voteDown(index, question.id) }} className="glyphicon glyphicon-chevron-down" data-reactid=".0.1:$2.0.1.1.0"></i>
										</div>
										<div className="panel-title col-xs-8">
											<h4><label htmlFor="question">{question.asker}'s question:</label></h4>
											<a className="long-text" id ="question" role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + index} aria-expanded="false" aria-controls="collapseOne">
												{question.question}
											</a>
										</div>
									</div>
								</div>
								<div id={'collapse' + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
									<div className="panel-body">
										<div className={this.displayAnswer(question.replier)}>
											<h4><label htmlFor="answer">{question.replier}'s reply:</label></h4>
											{question.answer}
										</div>
										<Form onSubmit={(e) => { this.submitAnswer(e, index, question.id) }}>
											<label htmlFor="input-replier">Reply to {question.asker}:</label><br />
											<FormGroup validationState={this.validateName(this.state.replier)}>
												<InputGroup>
													<InputGroup.Addon><span className="glyphicon glyphicon-user"></span></InputGroup.Addon>
													<FormControl type="text" name="replier" id="input-replier" placeholder="Insert name here" value={this.state.replier} onChange={this.insertReplierToInput} />
													<span className={this.setValidationIcon('name', this.state.replier) + ' form-control-feedback'}></span>
												</InputGroup>
											</FormGroup>
											<FormGroup validationState={this.validateSentence(this.state.answer)}>
												<InputGroup>
													<InputGroup.Addon><span className="glyphicon glyphicon-info-sign"></span></InputGroup.Addon>
													<FormControl componentClass="textarea" name="answer" id="input-answer" placeholder="Insert answer here" value={this.state.answer} onChange={this.insertAnswerToInput} />
													<span className={this.setValidationIcon('sentence', this.state.answer) + ' form-control-feedback'}></span>
												</InputGroup>
											</FormGroup>
											<button type="submit" className="btn btn-primary">Submit answer</button>
										</Form>
									</div>
								</div>
							</div>
						)}
					</div>
					<Form className="div-highlight container-form" onSubmit={this.submitQuestion}>
						<label htmlFor="input-asker">Ask a question:</label><br />
						<FormGroup validationState={this.validateName(this.state.asker)}>
							<InputGroup>
								<InputGroup.Addon><span className="glyphicon glyphicon-user"></span></InputGroup.Addon>
								<FormControl type="text" name="asker" id="input-asker" placeholder="Insert name here" value={this.state.asker} onChange={this.insertAskerToInput} />
								<span className={this.setValidationIcon('name', this.state.asker) + ' form-control-feedback'}></span>
							</InputGroup>
						</FormGroup>
						<FormGroup validationState={this.validateSentence(this.state.question)}>
							<InputGroup>
								<InputGroup.Addon><span className="glyphicon glyphicon-question-sign"></span></InputGroup.Addon>
								<FormControl componentClass="textarea" name="question" id="input-question" placeholder="Insert question here" value={this.state.question} onChange={this.insertQuestionToInput} />
								<span className={this.setValidationIcon('sentence', this.state.question) + ' form-control-feedback'}></span>
							</InputGroup>
						</FormGroup>
						<button type="submit" className="btn btn-primary">Submit question</button>
					</Form>
				</div>
			);
		}
	}
}
