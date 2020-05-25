var GAMEWEB1 = GAMEWEB1 || {};

String.prototype.replaceAll = function(searchStr, replaceStr) {
    var str = this;
    
    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
}

questionContents = [
	[870, 807],
	[510, 409],
	[323, 332],
	[906, 609],
	[780, 806],
	[396, 639]
]
possibleAnswer = ['lớn hơn','bằng nhau','nhỏ hơn']

answerInOperation = {
	'lớn hơn': '>',
	'nhỏ hơn': '<',
	'bằng nhau': '='
}

function generateQuestion(questionNumber){
	let  questionForm = 'So sánh hai số: num1 & num2'
	return questionForm
		.replace('num1', questionContents[Qnum][0])
		.replace('num2', questionContents[Qnum][1])
}

function getCorrectAnswer(questionNumber){
	let firstNumber = questionContents[questionNumber][0]
	let secondNumber = questionContents[questionNumber][1]

	if (firstNumber > secondNumber) return possibleAnswer[0]
	else if (firstNumber == secondNumber) return possibleAnswer[1]
	return possibleAnswer[2];
}

function getHint(questionNumber){
	let a = questionContents[questionNumber][0]
	let b = questionContents[questionNumber][1]

	if (a == b) return [a, b]

	let maxLength = Math.max(a.toString().length, b.toString().length)
	for (let i = maxLength - 1; i > 0; i--){
		let component1 = a - a % Math.pow(10, i)
		let component2 = b - b % Math.pow(10, i)

		if (component1 != component2) return [component1, component2]
		a -= component1
		b -= component2
	}
}

GAMEWEB1.Game = function()
{	

	var correctAnswer;
	var questionBox = $('.question');
	var questionNumber = $('.question-number');
	var answers = $('.answers');
	var restart = $('.restart');
	var winner = $('.winner');
	var playhomescreen = $('.playhomescreen');
	var loser = $('.loser');
	Qnum = -1;
	function init()
	{	
		nextQuestion();
		restart.click(reStart);
		playhomescreen.click(playHome);
	}	

	function nextQuestion() {
		Qnum = Qnum + 1;
		if(Qnum < questionContents.length) {
			askNextQuestion();	
		}
		else {	
			finishLesson();	
		}	
	}

	function askNextQuestion() {
		showQuestion();
		showQuestionNumber();
		clearCurrentAnswer();
		showAnswers()
		correctAnswer = getCurrentCorrectAnswer()
		$('.answers li').on('click', answerQuestion);
	}

	function showQuestion(){
		questionBox.html(generateQuestion(Qnum));
	}

	function showQuestionNumber(){
		questionNumber.html('Câu hỏi số ' + (Qnum + 1))
	}

	function showAnswers(){
		possibleAnswer.forEach(showSingleAnswer)
	}

	function clearCurrentAnswer(){
		answers.empty();
	}

	function showSingleAnswer(answer){
		let answerElement = document.createElement('li')
		answerElement.dataset.answer = answer
		answerElement.innerHTML = answer
		answers.append(answerElement)
	}

	function getCurrentCorrectAnswer(){
		return getCorrectAnswer(Qnum)
	}

	function finishLesson(){
		questionBox.html("Bạn đã chiến thắng !");
		answers.hide();
		questionNumber.hide();
		winner.show();
		playhomescreen.show();
	}

	function answerQuestion() {
		$('.answers li').off();
		var UserAnswer = $(this).data('answer');
		if (UserAnswer == correctAnswer) {
			nextQuestion();	
		}
		else {
			showSuggestion(Qnum)
			answers.hide();
			restart.show();
			questionNumber.hide();
			loser.show();
		}
	}

	function showSuggestion(questionNumber) {
		let hint = getHint(questionNumber)
		let message = 'Rất tiếc bạn đã thua num1 operation num2 vì component1 operation component2'
			.replaceAll('operation', answerInOperation[correctAnswer])
			.replace('num1', questionContents[questionNumber][0])
			.replace('num2', questionContents[questionNumber][1])
			.replace('component1', hint[0])
			.replace('component2', hint[1])
		questionBox.html(message)
	}

	function reStart() {
		Qnum = -1;
		nextQuestion();
		answers.show();
		restart.hide();
		loser.hide();
		questionNumber.show();
	}
	init();
};

$(function()
{	
	new GAMEWEB1.Game();
	
});
