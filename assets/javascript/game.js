var wordbank = ["aberto", "accio", "aguamenti", "alohomora", "anapneo", "ascendio", "avis", "bombarda", "confringo", "confundus", "crucio", "descendo", "diffindo", "engorgio", "episkey", "evanesco", "expulso", "fidelius", "finite", "geminio", "glisseo", "immobulus", "impedimenta", "imperio", "impervius", "incendio", "langlock", "levicorpus", "lumos", "mimblewimble", "morsmorde", "muffliato", "nox", "obliviate", "obscuro", "oppugno", "periculum", "protego", "quietus", "reducio", "reducto", "relashio", "reparo", "rictusempra", "riddikulus", "scourgify", "sectumsempra", "sonorus", "stupefy", "tarantallegra", "waddiwasi"];

var guessesleft = document.getElementById("guessesleft");

var guessed = document.getElementById("guessed");

var display = document.getElementById("display");

var guesseslefttemp;

var wordtoguess;

var winstemp = 0;

var wins = document.getElementById("wins");


document.onkeyup = function (event) {
    newgame();
}

function newgame() {
    wins.innerHTML = winstemp;
    wordtoguess = wordbank[Math.floor(Math.random() * wordbank.length)];
    console.log(wordtoguess);
    var displayarray = []; // array to organize display content in HTML
    var guessedarray = []; // array to organize guessed content in HTML
    guesseslefttemp = 12;

    for (var i = 0; i < wordtoguess.length; i++) {
        displayarray[i] = "_";
    }

    display.innerHTML = displayarray.join(" "); // displays the letters as underscores
    guessed.innerHTML = guessedarray.join(" ");
    guessesleft.innerHTML = guesseslefttemp;

    console.log(display.innerHTML);

    document.onkeyup = function (event) {
        var key = event.key;

        if (validate(key) === false)
            return;
        if (guessedarray.includes(key))
            return;

        guessedarray.push(key); //adds the guess to the list of guessed letters

        guessed.innerHTML = guessedarray.join(" ");

        var isinword = false; // to check if we are to decrement number of guesses left

        for (var i = 0; i < wordtoguess.length; i++) {
            //console.log("in for loop!");
            if (wordtoguess.charAt(i) === key) {
                isinword = true;
                displayarray[i] = key;
            }
            //console.log(displayarray);
            //console.log("is in word : " + isinword);
        }

        if (isinword === false)
            guesseslefttemp = guesseslefttemp - 1; // lose a guess

        display.innerHTML = displayarray.join(" ");
        guessed.innerHTML = guessedarray.join(" ");
        guessesleft.innerHTML = guesseslefttemp;

        console.log("guesses left: " + guesseslefttemp);
        console.log("check if won: " + checkifwon(guessedarray, wordtoguess));

        if (guesseslefttemp === 0 || checkifwon(guessedarray, wordtoguess) === true) {
            if (checkifwon(guessedarray, wordtoguess) === true)
                winstemp = winstemp + 1;
            newgame();
        }
    }

}

function checkifwon(guessedtemp, wordtoguesstemp) {
    var won = false;
    var temp = "";
    for (var i = 0; i < wordtoguesstemp.length; i++) {
        var c = wordtoguesstemp.charAt(i);
        if (temp.includes(c) === false)
            temp += c;
    }
    console.log(temp);

    for (var i = 0; i < temp.length; i++) {
        var d = temp.charAt(i);
        if (guessedtemp.includes(d) === false)
            return won
    }

    won = true;
    return won;
}

function validate(str) {
    var letters = /^[a-z]+$/;
    return letters.test(str);
}





