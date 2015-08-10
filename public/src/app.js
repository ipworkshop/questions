(function ()
{
	var app = angular.module ('quizes', []);

	app.directive ('questions', ['Questions', function (Questions)
	{
		console.log ('questions')
		return {
			restrict: 'E',
			templateUrl: 'html/questions.html',
			controller: function ($scope)
			{
				console.log ('load');
				// popquizes.questionsChanged = function (questions)
				// {
				// 	this.questions = questions;
				// 	$scope.$apply ();
				// });
				$scope.questions = [];
				Questions.load (function (value)
					{
						$scope.questions = value;
						$scope.$apply ();
					});
			},
			controllerAs: 'questionsCtrl'
		};
	}]);

	app.directive ('question', function ()
	{
		return {
			restrict: 'E',
			templateUrl: 'html/question.html',
			replace: true,
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

	app.directive ('answer', ['Questions', function (Questions)
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
			controller: function ($scope, Questions)
			{
				this.remove = function ()
				{
					Questions.removeAnswer ($scope.qid, $scope.aid);
				};

				this.setCorrect = function ()
				{
					// console.log (aid);
					Questions.setCorrect ($scope.qid, $scope.aid);
				};
			},
			controllerAs: 'answerCtrl'
		};
	}]);

	app.directive ('newAnswer', ['Questions', function (Questions)
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
					Questions.addAnswer ($scope.qid, $scope.answer, $scope.correct);
					$scope.answer = '';
					$scope.correct = false;
				}
			},
			controllerAs: 'newAnswerCtrl'
		};
	}]);

})();