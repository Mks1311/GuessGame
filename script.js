let RandomNumber = parseInt((Math.random() * 100) + 1);
console.log(RandomNumber);
let PrevGuesses = [];
let PlayGame = true;

let Submit = document.querySelector("#SubmitBtn");
let GuessField = document.querySelector("#GuessField");
let PrevGuessDisplay = document.querySelector("#PrevGuessDisplay");
let RemGuessDisplay = document.querySelector("#RemGuessDisplay");
let GuessDisplay = false;
let NewGameFlag = true;
let HintFlag=false;

Submit.addEventListener('click', function e(event) {
    if (PlayGame) {
        HintFlag=true;
        console.log("PlayGame");
        event.preventDefault();
        if (NewGameFlag) {
            const audio = document.querySelector("#GameStartSound");
            audio.play();
            NewGameFlag = false;
            Submit.innerHTML = "Guess";
        }
        else {
            const UserGivenNum = parseInt(GuessField.value);
            console.log(UserGivenNum);
            if (ValidateGuess(UserGivenNum)) {
                if (!GuessDisplay) {
                    PrevGuessDisplay.innerHTML = '';
                    GuessDisplay = true;
                }
                Process(UserGivenNum);
            }
        }

    }
})


function Process(Number) {
    PrevGuesses.push(Number);
    if (Number === RandomNumber) {
        const audio=document.querySelector("#correct");
        audio.play();
        DisplayMessage(`${RandomNumber} is Correct Guess`, "images/crrImg.png");
        EndGame();
    }
    else {
        if (PrevGuesses.length === 10) {
            const audio = document.querySelector("#GameOverSound");
            audio.play();
            UpdateValue(Number);
            DisplayMessage(`Game Over, Random Number was ${RandomNumber}`, "images/lostGame.webp");
            EndGame();
        }
        else {
            const audio = document.querySelector("#No");
            audio.play();
            UpdateValue(Number);
            let msg = `Noooo!!`;
            if (PrevGuesses.length >= 2) msg += ` x${PrevGuesses.length}`;
            DisplayMessage(msg, "images/Noo.png");
        }
    }
}

function ValidateGuess(Number) {
    if (isNaN(Number)) {
        alert(`Please give a valid number`);
        return false;
    }
    else if (Number < 1) {
        alert(`Please enter a number greater than or equal to 1`);
        return false;
    }
    else if (Number > 100) {
        alert(`Please enter a number lesser than or equal to 100`);
        return false;
    }
    else {
        return true;
    }
}
function UpdateValue(Number) {
    // GuessField.value = '';
    PrevGuessDisplay.innerHTML += `${Number}, `;
    RemGuessDisplay.innerHTML = 10 - PrevGuesses.length;
}
function DisplayMessage(message, link) {
    const image = document.querySelector(".curr-img");
    image.setAttribute("src", link);
    const display = document.querySelector(".img-txt");
    display.innerHTML = message;
}
function EndGame() {
    GuessField.value = '';
    GuessField.setAttribute("disabled", "");
    // Submit.setAttribute("disabled","");
    PlayGame = false;
    Submit.innerHTML = "New Game";
    NewGame();
}
function NewGame() {
    let newSubmit = document.querySelector("#SubmitBtn");
    newSubmit.addEventListener("click", function e() {
        const audio = document.querySelector("#GameStartSound");
        audio.play();
        RandomNumber = parseInt((Math.random() * 100) + 1);
        PrevGuesses = [];
        RemGuessDisplay.innerHTML = 10 - PrevGuesses.length;
        PrevGuessDisplay.innerHTML = "No Guesses";
        DisplayMessage(`All the Best`, "images/guruji.jpg");
        newSubmit.removeEventListener("click", e);
        GuessField.removeAttribute("disabled");
        PlayGame = true;
        GuessDisplay = false;
        newSubmit.innerHTML = "Guess";
        let hintNum = (document.querySelector("#hintRem"));
        hintNum.textContent=2;
        let hints=document.querySelector("#Hints");
        let liEl=hints.querySelectorAll("li");
        liEl.forEach((li)=>{
            hints.removeChild(li);
        });
    })
}


let hintImg = document.querySelector("#hint-img");
let Hints = document.querySelector("#Hints");
let hintTxt=document.querySelector(".hint-txt");
hintImg.addEventListener("click", function () {
    if (HintFlag) {
        let hintNum = (document.querySelector("#hintRem"));
        let Num = parseInt(hintNum.textContent);
        const audio=document.querySelector("#hint-snd");
        console.log(Num);
        if (Num === 2) {
            audio.play();
            const listItem1 = document.createElement("li");
            if (RandomNumber % 2 === 0) {
                listItem1.textContent = "Number is Even";
            } else {
                listItem1.textContent = "Number is Odd";
            }
            Hints.appendChild(listItem1)
            hintNum.textContent = 1;
            hintTxt.style.top="-90%"; 
            hintTxt.style.right="-20%";
        }
        else if (Num == 1) {
            audio.play();
            const listItem1 = document.createElement("li");
            if (RandomNumber <= 10) {
                listItem1.textContent = "Number is <= 10";
            } else {
                let NumString = RandomNumber.toString();
                listItem1.textContent = `First digit of number is ${NumString[0]} and is >10`;
            }
            Hints.appendChild(listItem1)
            hintNum.textContent = 0;
            hintTxt.style.top="-120%"; 
            hintTxt.style.right="-70%";
        } else {
            alert("No Hint Remaing")
        }
    }

})