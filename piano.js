// Adding audio to the piano
for (var i = 1; i <= 8; i++) {
    var addaudio = document.createElement("audio");
    addaudio.setAttribute("src", "audios/" + "w" + i + ".ogv");
    document.body.appendChild(addaudio);
}
for (var i = 1; i <= 5; i++) {
    var addaudio = document.createElement("audio");
    addaudio.setAttribute("src", "audios/" + "b" + i + ".ogv");
    document.body.appendChild(addaudio);
}

//Getting the relevant dom in javascript.
let audios = document.getElementsByTagName("audio"),
buttons = document.getElementsByClassName("key"),
blacks = document.getElementsByClassName("black--key");

//Mouse click on the piano keys
for (var i = 0; i < 8; i++) {
    buttons[i].index = i;
    buttons[i].onmousedown = function () {
    //alert(this.index);
        buttons[this.index].classList.add('white_active')
        audios[this.index].load();
        audios[this.index].play();
    };

    buttons[i].onmouseup = function () {
        buttons[this.index].classList.remove('white_active')
    };
}
for (var i = 0; i < 5; i++) {
    blacks[i].index = i + 8;
    blacks[i].onmousedown = function () {
      //alert(this.index);
        blacks[this.index-8].classList.add('black_active')
        audios[this.index].load();
        audios[this.index].play();
      //alert(audios[this.index].src);
    };

    blacks[i].onmouseup = function () {
    blacks[this.index-8].classList.remove('black_active')
    };
}

//Keyboard as keys
//Operation keyboard piano white keys to make a sound
var keyCodes = new Array(83, 68, 70, 71, 72, 74, 75, 76, 69, 82, 89, 85, 73);
document.body.onkeydown = function (e) {
for (var i = 0; i < keyCodes.length; i++) {
    if (e.keyCode == keyCodes[i]) {
        if (i < 22) {
        buttons[i].classList.add('white_active');
    } else {
        blacks[i-22].classList.add('black_active');
    }
    audios[i].load();
    audios[i].play();
    }
}
};

// Operate the keyboard piano black keys to make a sound
document.body.onkeyup = function (e) {
  //document.title=e.keyCode;
for (var i = 0; i < keyCodes.length; i++) {
    if (e.keyCode == keyCodes[i]) {
        if (i < 8) {
        buttons[i].classList.remove('white_active');
    } else {
        blacks[i-8].classList.remove('black_active');
    }
    }
}
};