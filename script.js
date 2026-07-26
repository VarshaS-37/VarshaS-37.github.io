const words = [

    "Bioinformatics Graduate",

    "Computational Biologist",

    "AI for Healthcare"

];

let wordIndex = 0;
let charIndex = 0;

const typing = document.getElementById("typing");

function type(){

    if(charIndex < words[wordIndex].length){

        typing.textContent += words[wordIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type,80);

    }

    else{

        setTimeout(erase,1800);

    }

}

function erase(){

    if(charIndex > 0){

        typing.textContent = words[wordIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(erase,40);

    }

    else{

        wordIndex++;

        if(wordIndex >= words.length){

            wordIndex=0;

        }

        setTimeout(type,300);

    }

}

type();
