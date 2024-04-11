// Csapó Benedek

var words = ["alma", "banán", "citrom", "dinnye", "körte"];
var buttons = document.getElementsByName("letter_button");

var choosen_word = word_picker(words);



function on_letter_push(value_of_button) {
    letter_button_status_setter(choosen_word, value_of_button, buttons);

}

// a gomb színét és elérését állítja be
function letter_button_status_setter(choosen_word, value_of_button, buttons) {
    
    let button = 0;
    while (buttons[button].value != value_of_button){
        i++;
    }

    if (is_correct(choosen_word, value_of_button)) {
        buttons[button].style.backgroundColor = "green";
    } else {
        buttons[button].style.backgroundColor = "red";
    }

    buttons[button].disabled = true;
}

// a "Feladom" gomb akciója
function ending_game(buttons) {
    for (let index = 0; index < buttons.length; index++) {
        buttons[i].disabled = true;
        
    }
    
}

// az "Új játék" gomb akciója
function starting_new_game(buttons) {
    for (let index = 0; index < buttons.length; index++) {
        buttons[i].disabled = false;
    }
}

// véletlenszerűen kiválaszt egy szót a listából
function word_picker(words) {
    
    let random_word = Math.random() * words.length;

    return random_word;
}

// megnézi, hogy az adott betű szerepel-e a szóban
function is_correct(word, letter) {
    return word.includes(letter);
}


function word_blank_init(choosen_word){
    let blank_word = "";

    for (let index = 0; index < choosen_word.length; index++) {
        blank_word += "_ ";
        
    }

    return blank_word;
}