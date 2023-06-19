const  QuizBtn = document.querySelector(".MyBtn button");

const QuizRules = document.querySelector(".RulesBox");

const QuizExit =  document.querySelector(".buttons .exit-btn");

const timeCount = document.querySelector(".timecount .second");

const timeLine = document.querySelector(".question-header .time-lines");


QuizBtn.onclick = () => {
QuizRules.classList.add("ActiveInfo");
}

QuizExit.onclick = () =>{

    QuizRules.classList.remove("ActiveInfo")

}




/*------------------------------------------------*/



const Continue = document.querySelector(".buttons .continue-btn");

const Question = document.querySelector(".question");

Continue.onclick = () =>{
QuizRules.classList.remove("ActiveInfo");
Question.classList.add("QuestionActive");

ShowQuestions(0);
startTimer(15);
 startTimerLine(0);
}

/*--------------------------------------------------*/
const QuizNext = document.querySelector(".next-btn");

const result_box = document.querySelector(".result_box");

const restart_quiz = document.querySelector(".buttons .restart");

const quit_quiz = document.querySelector(".buttons .quit");

quit_quiz.onclick = () =>{

 window.location.reload();

}


restart_quiz.onclick = () =>{

window.location.reload();

}



let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userSocore = 0;

QuizNext.onclick = () =>{


    if(que_count < questions.length -1){
        que_count ++
        ShowQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        QuizNext.style.display = "none";
    } else{
        console.log("You Have Completed Your Task 🧐");
        showResultBox()
    }
}

 


/*-----------------------------------------------*/

function ShowQuestions(index){

const que_text = document.querySelector(".text");
const option_list = document.querySelector(".myoption");

let option_tag = '<div class="options"> <span>' + questions[index].option[0] +'</span></div>'
+'<div class="options"> <span>' + questions[index].option[1] +'</span></div>'
+'<div class="options"> <span>'+ questions[index].option[2] +'</span></div>'
+'<div class="options"> <span>'+ questions[index].option[3] +'</span></div>'

option_list.innerHTML =option_tag;


let que_tag = "<span>" + questions[index].numb+"."+questions[index].question +" </span>";

que_text.innerHTML = que_tag;


const total_que = document.querySelector(".total-que");

let total_queTag = '<p>' +  questions[index] .numb  + 'Of  5</p>'

total_que.innerHTML = total_queTag


const option = option_list.querySelectorAll(".options");

for(let i=0; i<option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}

}


let tickIcon = ' <div class="tick-icon"><i class="fas fa-check"></i></div>';

let crossIcon = '<div class="cross-icon"><i class="fas fa-times"></i></div>';
/*------------------------------------------------------*/
function optionSelected(answer) {
    clearInterval(counterLine);
    clearInterval(counter);
    const option_listt =document.querySelector(".myoption");
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloPtions = option_listt.children.length;


    if (userAns.trim() === correctAns.trim()) {

      userSocore +=1;
 
      console.log("Answer Is Right");
      answer.className += " correctans";

      answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
      answer.classList.add("incorrect");
      console.log("Wrong Answer");

      answer.insertAdjacentHTML("beforeend", crossIcon);
  
      for (let i = 0; i < alloPtions; i++) {
        if (option_listt.children[i].textContent.trim() === correctAns.trim()) {
          option_listt.children[i].setAttribute("class" , "options correctans");

          option_listt.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
    }

  for(let i=0; i<alloPtions; i++){
    option_listt.children[i].classList.add("disabled")
  }

  QuizNext.style.display = "block";
  }
  
 /*---------------------------------------------------*/

 function startTimer(time){

    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;

        if(time <9){
            let addZero = timeCount.textContent;
            timeCount.textContent = 0 + addZero
        }

        if(time <0){

            clearInterval(counter)
            timeCount.textContent ="00";
        }
    }
 }


 /*----------------------------------------------------*/

 function startTimerLine(time){

    counterLine = setInterval(timer,50);

    function timer(){
        time += 1 ;
        timeLine.style.width = time +"px";

        if(time > 319){
            clearInterval(counterLine);
        }
    }
 }


/*-----------------------------------------*/


function showResultBox(){
  QuizRules.classList.remove("ActiveInfo");
  Question.classList.remove("QuestionActive");

  result_box.classList.add("activeResult");

  const scoreTest = document.querySelector(".score_text");

  if(userSocore > 3 ){
    let scoreTag = ' <span>Congratulation🥰 You Got <p>' + userSocore + '</p> Out Of <p>' + questions.length +'</p></span>';
    scoreTest.innerHTML = scoreTag;
  }

  else if(userSocore > 1){
    let scoreTag = ' <span>Carry On👍 You Got <p>' + userSocore + '</p> Out Of <p>' + questions.length +'</p></span>';
    scoreTest.innerHTML = scoreTag;
  }

  else{
    let scoreTag = ' <span>Iam Sorry😢 You Got <p>' + userSocore + '</p> Out Of <p>' + questions.length +'</p></span>';
    scoreTest.innerHTML = scoreTag;
  }
}