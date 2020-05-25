var start_button = document.getElementById("start_button");
var playscreen = document.getElementById("playscreen");
var status = 0;
var beads = [...Array(5).keys()].map(num => document.getElementById('bead' + num))

var allQuestions = [
    [{
        value: 291, 
        img: 'dis1'
    }, {
        value: 300,
        img: 'dis2'
    }],
    [{
        value: 720,
        img: 'dis3'
    }, {
        value:702,
        img: 'dis4'
    }],
    [{
        value: 411,
        img: 'dis5'
    }, {
        value: 408,
        img: 'dis6'
    }],
    [{
        value: 506,
        img: 'dis7'
    }, {
        value: 560,
        img: 'dis8'
    }],
    [{
        value: 350,
        img: 'dis9'
    }, {
        value: 350,
        img: 'dis10'
    }],
    [{
        value: 500,
        img: 'dis11'
    }, {
        value: 474,
        img: 'dis12'
    }],
    [{
        value: 106,
        img: 'dis13'
    }, {
        value: 160,
        img: 'dis14'
    }],
    [{
        value: 702,
        img: 'dis15'
    }, {
        value: 618,
        img: 'dis16'
    }]
]

var qNum = 0;
var imgPrefix = '../picture/';
var imgSuffix = '.png';
var getImgUrl = (img) => imgPrefix + img + imgSuffix;
var getAnswer = (question) =>{
    if (question[0]['value'] > question[1]['value']) return 'greater';
    if (question[0]['value'] == question[1]['value']) return 'equal';
    return 'less';
}

function start() {
    status = 1;
    var t = setInterval(open, 50);
    var count = 0;

    function open() {
        if (count == 8) {
            clearInterval(t);
            start_button.style.display = 'none';
        } else {
            count++;
            playscreen.style.opacity = (count * 0.1) + 0.2;
            start_button.style.opacity = 0.8 - (count * 0.1);
        }
    }
}

var img_box1 = document.getElementById("img_box1");
var img_box2 = document.getElementById("img_box2");

var left = document.getElementById("left");
var right = document.getElementById("right");
var center = document.getElementById("center");

var greaterBtn = document.getElementById('greater');
var equalBtn = document.getElementById('equal');
var lessBtn = document.getElementById('less');

var allAnswers = [{
    btn: greaterBtn,
    img: 'greater',
    img_hover: 'greater_hover',
    value: 'greater'
}, {
    btn: equal,
    img: 'equal',
    img_hover: 'equal_hover',
    value: 'equal'
}, {
    btn: less,
    img: 'less',
    img_hover: 'less_hover',
    value: 'less'
}]

allAnswers.forEach(ans => {
    ans['btn'].addEventListener('click', ()=>{
        submit(ans['value'])
    })
    ans['btn'].addEventListener('mouseover', ()=>{
        ans['btn'].backgroundImage = getImgUrl(ans['img_hover'])
    })
    ans['btn'].addEventListener('mouseout', ()=>{
        ans['btn'].backgroundImage = getImgUrl(ans['img'])
    })
})

function showQuestion(){
    let question = allQuestions[qNum]
    img_box1.src = getImgUrl(question[0]['img'])
    img_box2.src = getImgUrl(question[1]['img'])
}

function submit(answer){
    if (correctAnswer(answer)){
        correctAnswerHandle();
    }else{
        incorrectAnswerHandle();
    }
}

function correctAnswer(answer){
    return answer == getAnswer(allQuestions[qNum]);
}

function correctAnswerHandle(){
    clearNote();
    qNum++;
    showQuestion();
}

function clearNote(){
    left.innerHTML = '';
    right.innerHTML = '';
    center.innerHTML = '';
}

function incorrectAnswerHandle(){
    showNote();
}

function showNote(){
    let question = allQuestions[qNum]
    left.innerHTML = question[0]['value'] + ' block'
    right.innerHTML = question[1]['value'] + ' block'
    center.innerHTML = 'AGAIN'
}

showQuestion();