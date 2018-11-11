import React, { Component } from 'react';

export class FAQ extends Component {
	displayName = FAQ.name

	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			loading: true
		};
		this.fetchQuestionsTable = this.fetchQuestionsTable.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);

		this.fetchQuestionsTable();
	}

	fetchQuestionsTable() {
		fetch('api/FAQs')
			.then(response => response.json())
			.then(data => {
				this.setState({ questions: data, loading: false});
			});
	}

	deleteQuestion(dbIndex) {
		fetch('api/FAQs/' + dbIndex, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 'id': dbIndex })
		}).then(() => this.fetchQuestionsTable());
	}

	render() {
		let contents = this.state.loading
		if (contents) { return (<p><em>Loading...</em></p>); }
		else {
			return (
				<div>
					<h1>FAQ</h1>
					<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						{this.state.questions.map((question, index) =>
							<div key={index} className="panel panel-default container-form">
								<div className="panel-heading" role="tab" id={'heading' + index}>
									<div className="row" data-reactid=".0.1:$2.0.1">
										<button type="button" className="btn btn-danger col-xs-1 button-delete" onClick={() => { this.deleteQuestion(question.id) }}><span className="glyphicon glyphicon-trash"></span></button>
										<div className="panel-title col-xs-8">
											<h4><label htmlFor="question">Question:</label></h4>
											<a className="long-text" id="question" role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse' + index} aria-expanded="false" aria-controls="collapseOne">
												{question.question}
											</a>
										</div>
									</div>
								</div>
								<div id={'collapse' + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
									<div className="panel-body">
										<div className="div-highlight">
											<h4><label htmlFor="answer">Answer:</label></h4>
											{question.answer}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			);
		}
	}
}
