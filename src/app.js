(function ()
{
	var app = angular.module ('quizes', []);

	app.directive ('questions', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'html/questions.html',
			controller: function ($scope)
			{
				// popquizes.questionsChanged = function (questions)
				// {
				// 	this.questions = questions;
				// 	$scope.$apply ();
				// });
				this.questions = popquizes.questions;
				popquizes.load (function ()
					{
						$scope.$apply ();
					});
			},
			controllerAs: 'questionsCtrl'
		};
	});

	app.directive ('question', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'html/question.html',
			scope:
			{
				question: "=",
				qid: "="
			},
			controller: function ()
			{
				
			},
			controllerAs: 'questionCtrl'
		};
	});

	app.directive ('answer', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'html/answer.html',
			scope:
			{
				answer: "=",
				aid: "=",
				qid: "=",
				correct: "="
			},
			controller: function ($scope)
			{
				this.remove = function ()
				{
					popquizes.removeAnswer ($scope.qid, $scope.aid);
				};

				this.setCorrect = function (aid)
				{
					console.log (aid);
					popquizes.setCorrect ($scope.qid, $scope.aid);
				};
			},
			controllerAs: 'answerCtrl'
		};
	});

	app.directive ('newAnswer', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'html/new-answer.html',
			scope:
			{
				qid: "="
			},
			controller: function ($scope)
			{
				$scope.answer = '';
				$scope.correct = false;
				this.addAnswer = function ()
				{
					console.log ('new answer');
					popquizes.addAnswer ($scope.qid, $scope.answer, $scope.correct);
					$scope.answer = '';
					$scope.correct = false;
				}
			},
			controllerAs: 'newAnswerCtrl'
		};
	});

})();