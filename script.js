// Csapó Benedek

var words = ["alma", "banán", "citrom", "dinnye", "körte"];
var words_already_picked = [];

var buttons = document.getElementsByName("letter_input");

var chosen_word;
chosen_word = word_picker(words).toUpperCase();
words_already_picked.push(chosen_word.toLowerCase());
words.splice(words.indexOf(chosen_word.toLowerCase()), 1);

var blank_word = document.getElementById("blank_text");

var won_games_counter = 0;
var lost_games_counter = 0;

var won_games = document.getElementById("won_games");
var lost_games = document.getElementById("lost_games");

var won_games_counter_span = won_games.firstElementChild;
var lost_games_counter_span = lost_games.firstElementChild;

won_games_counter_span.innerHTML = won_games_counter;
lost_games_counter_span.innerHTML = lost_games_counter;

blank_word.innerHTML = blank_word_init(chosen_word);

var gallows = document.getElementById("akasztofa");
var gallows_counter = 0;


console.log(gallows);

function on_letter_push(value_of_button) {
    
    letter_button_status_setter(chosen_word, value_of_button, buttons);

    if (is_correct(chosen_word, value_of_button)) {
        blank_word.innerHTML = blank_word_change(blank_word, chosen_word, value_of_button);
        if (!blank_word.innerHTML.includes("_")){
            won_games_counter++;
            round();
        }
    } else {
        if (gallows_counter > 4) {
            gallows_counter = 0;
            lost_games_counter++;
            round();

        } else {
            gallows_counter++;
            gallows.style.backgroundImage = "url(img/" + gallows_counter + ".png)";
        }
    }


    
}

function round(){
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].style.backgroundImage = "linear-gradient(-180deg, #FF7E31, #E62C03)";
        buttons[index].disabled = false;
    }
    chosen_word = word_picker(words).toUpperCase();
    words_already_picked.push(chosen_word.toLowerCase());
    words.splice(words.indexOf(chosen_word.toLowerCase()), 1);
    console.log(words);
    console.log(words_already_picked);
    won_games_counter_span.innerHTML = won_games_counter;
    lost_games_counter_span.innerHTML = lost_games_counter;
    blank_word.innerHTML = blank_word_init(chosen_word);
}

// a gomb színét és elérését állítja be
function letter_button_status_setter(chosen_word, value_of_button, buttons) {
    
    let button = 0;
    while (buttons[button].value != value_of_button){
        button++;
    }

    if (is_correct(chosen_word, value_of_button)) {
        buttons[button].style.background = "green";
    } else {
        buttons[button].style.background = "red";
    }

    buttons[button].disabled = true;
    
}

function reset() {
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].style.backgroundImage = "linear-gradient(-180deg, #FF7E31, #E62C03)";
        buttons[index].disabled = false;
    }
    words = words.concat(words_already_picked);
    words_already_picked = [];
}

// az "Új játék" gomb akciója
function starting_new_game() {

    reset();

    won_games_counter = 0;
    lost_games_counter = 0;
    gallows_counter = 0;


    chosen_word = word_picker(words).toUpperCase();

    blank_word.innerHTML = blank_word_init(chosen_word);

    words = words.concat(words_already_picked);
}

// véletlenszerűen kiválaszt egy szót a listából
function word_picker(words) {
    
    let random_word = Math.random() * words.length;

    return words[parseInt(random_word)];
}

// megnézi, hogy az adott betű szerepel-e a szóban
function is_correct(word, letter) {
    return word.includes(letter);
}


function blank_word_init(chosen_word){
    let blank_word = "";

    for (let index = 0; index < chosen_word.length; index++) {
        blank_word += "_ ";
        
    }

    return blank_word;
}

function blank_word_change(blank_word, chosen_word, letter) {

    let blank_word_serv = blank_word.innerHTML;

    let blank_word_serv_splitted = blank_word_serv.split(' ');

    let indexes_of_current_correct_letter = [];

    for (let index = 0; index < chosen_word.length; index++) {
        if (chosen_word[index] == letter) {
            indexes_of_current_correct_letter.push(index);
        }
        
    }

    let blank_word_serv_2 = "";

    for (let index2 = 0; index2 < blank_word_serv_splitted.length-1; index2++) {
        if (indexes_of_current_correct_letter.includes(index2)){
            blank_word_serv_2 += (letter + " ");
        } else{
            blank_word_serv_2 += (blank_word_serv_splitted[index2] + " ");
        }
        
        
    }

    return blank_word_serv_2;

}

/*
HÁTRALÉVŐ FELADATOK

- az új akasztófa kép beillesztése hiba esetén
*/