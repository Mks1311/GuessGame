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

Submit.addEventListener('click', function e(event) {
    if (PlayGame) {
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
        DisplayMessage(`Correct Guess`, "wonGame.jpg");
        EndGame();
    }
    else {
        if (PrevGuesses.length === 10) {
            const audio = document.querySelector("#GameOverSound");
            audio.play();
            UpdateValue(Number);
            DisplayMessage(`Game Over, Random Number was ${RandomNumber}`, "lostGame.webp");
            EndGame();
        }
        else {
            const audio = document.querySelector("#No");
            audio.play();
            UpdateValue(Number);
            let msg = `Noooo!!`;
            if (PrevGuesses.length >= 2) msg += ` x${PrevGuesses.length}`;
            DisplayMessage(msg, "Noo.png");
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
        DisplayMessage(`All the Best`, "startgame1.jpeg");
        newSubmit.removeEventListener("click", e);
        GuessField.removeAttribute("disabled");
        PlayGame = true;
        GuessDisplay = false;
        newSubmit.innerHTML = "Guess";
    })
}
