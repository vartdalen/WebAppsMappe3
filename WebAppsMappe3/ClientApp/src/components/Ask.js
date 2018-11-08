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
					<div>
						<table className='table'>
							<thead>
								<tr>
									<th>Votes</th>
									<th>Question</th>
									<th>Answer</th>
									<th>Submit Answer</th>
									<th>Array Index</th>
									<th>DB Index</th>
									<th>Upvotes</th>
									<th>Downvotes</th>
								</tr>
							</thead>
							<tbody>
								{this.state.questions.map((question, index) =>
									<tr key={index}>
										<td className="vote" data-reactid=".0.1:$2.0">
											<div className="vote-icons" data-reactid=".0.1:$2.0.1">
												<div className="upvote" data-reactid=".0.1:$2.0.1.0">
													<i onClick={() => { this.voteUp(index, question.id) }} className="glyphicon glyphicon-chevron-up" data-reactid=".0.1:$2.0.1.0.0"></i>
												</div>
												<span className="upvote-count" data-reactid=".0.1:$2.0.2">{question.voteUp - question.voteDown}</span>
												<div className="downvote" data-reactid=".0.1:$2.0.1.1">
													<i onClick={() => { this.voteDown(index, question.id) }} className="glyphicon glyphicon-chevron-down" data-reactid=".0.1:$2.0.1.1.0"></i>
												</div>
											</div>
										</td>
										<td>{question.question}</td>
										<td>{question.answer}</td>
										<td>
											<form onSubmit={(e) => { this.submitAnswer(e, index, question.id) }}>
												<input type="text" name="answer" placeholder="Insert answer here" value={this.state.answer} onChange={this.insertAnswerToInput} />
												<input type="submit" value="Submit" />
											</form>
										</td>
										<td>{index}</td>
										<td>{question.id}</td>
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
					<button onClick={this.insertQuestionStateToArray}>New Question</button>

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	<div class="panel panel-default">
		<div class="panel-heading" role="tab" id="headingOne">
			<h4 class="panel-title">
			<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				Collapsible Group Item #1
			</a>
			</h4>
		</div>
		<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
			<div class="panel-body">
			Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
			</div>
		</div>
	</div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
				</div>
			);
		}
	}
}
