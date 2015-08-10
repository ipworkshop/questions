
(function (){
	var app = angular.module ('quizes');
	app.factory ('Questions', function QuestionsFactory ()
	{
		console.log ('factory');
		var questions = [];
		return {
			addQuestion: function (text)
			{
				questions.push (newQuestion(text));
				this.save ();
			},
			removeQuestion: function (qid)
			{
				questions.splice (qid, 1);
				this.save ();
			},
			addAnswer: function (qid, answer, correct)
			{
				console.log (qid);
				questions[qid].answers.push (answer);
				if (correct) this.setCorrect (qid, this.questions[qid].answers.length-1);
				this.save ();
			},
			removeAnswer: function (qid, aid)
			{
				if (qid < questions.length)
				{
					if (aid === questions[qid].correct)
					{
						questions[qid].correct = -1;
					}
					questions[qid].answers.splice (aid, 1);
				}
				this.save ();
			},
			setCorrect: function (qid, aid){
				if (qid < questions.length)
				{
					if (aid < questions[qid].answers.length)
					{
						questions[qid].correct = aid;
					}
				}
				this.save ();
			},
			load: function (done)
			{
				console.log ('load');
				localforage.getItem ('questions', function (err, value)
				{
					if (value)
					{
						questions.splice (0, questions.length);
						for (qid in value)
						{
							questions.push (value[qid]);
						}
						if (_.isFunction (done)) done (questions);
						// if (typeof questionsChanged === "function")
						// {
						// 	this.questionsChanged (this.questions);
						// }
					}
				});
			},
			save: function ()
			{
				localforage.setItem ('questions', questions);
			}
		};
	});
})();

var popquizes = (function ()
{
	function newQuestion (text)
	{
		return {
			text: text,
			answers: [],
			correct: -1,
			images: []
		}
	};

	return {
		questions: [{
			text: 'question text',
			answers: [
				'answer 1 text',
				'answer 2 text',
				'answer 3 text',
				'answer 4 text',
				'answer 5 text',
				'answer 6 text'
			],
			correct: 5,
			images: []
		}],
		addQuestion: function (text)
		{
			this.questions.push (newQuestion(text));
			this.save ();
		},
		removeQuestion: function (qid)
		{
			this.questions.splice (qid, 1);
			this.save ();
		},
		addAnswer: function (qid, answer, correct)
		{
			console.log (qid);
			this.questions[qid].answers.push (answer);
			if (correct) this.setCorrect (qid, this.questions[qid].answers.length-1);
			this.save ();
		},
		removeAnswer: function (qid, aid)
		{
			if (qid < this.questions.length)
			{
				if (aid === this.questions[qid].correct)
				{
					this.questions[qid].correct = -1;
				}
				this.questions[qid].answers.splice (aid, 1);
			}
			this.save ();
		},
		setCorrect: function (qid, aid){
			if (qid < this.questions.length)
			{
				if (aid < this.questions[qid].answers.length)
				{
					this.questions[qid].correct = aid;
				}
			}
			this.save ();
		},
		load: function (done)
		{
			var that = this;
			localforage.getItem ('questions', function (err, value)
			{
				if (value)
				{
					that.questions.splice (0, that.questions.length);
					for (qid in value)
					{
						that.questions.push (value[qid]);
					}
					if (_.isFunction (done)) done ();
					// if (typeof this.questionsChanged === "function")
					// {
					// 	this.questionsChanged (this.questions);
					// }
				}
			});
		},
		save: function ()
		{
			localforage.setItem ('questions', this.questions);
		}
	};
})();

