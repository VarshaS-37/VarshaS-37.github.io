
/*==========================================
        TERMINAL TYPING ANIMATION
==========================================*/

const lines = [

"$ whoami",

"Varsha",

"Bioinformatics Graduate",

"",

"$ interests",

"Transcriptomics",

"Computational Biology",

"Machine Learning",

"Computational Neuroscience",

"",

"$ currently_working_on",

"RNA-seq Analysis",

"AI for Biology",

"Bioinformatics Tools",

"",

"$ _"

];

const typing = document.getElementById("typing");

let line = 0;
let char = 0;
let output = "";

function type(){

    if(line >= lines.length) return;

    if(char < lines[line].length){

        output += lines[line].charAt(char);

        typing.innerHTML = output;

        char++;

        setTimeout(type,40);

    }

    else{

        output += "<br>";

        typing.innerHTML = output;

        line++;

        char = 0;

        setTimeout(type,220);

    }

}

type();


/*==========================================
        SCROLL ANIMATION
==========================================*/

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.2});

sections.forEach(section=>{

observer.observe(section);

});


/*==========================================
        ACTIVE NAVIGATION
==========================================*/

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top = section.offsetTop-180;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*==========================================
        FLOATING TERMINAL
==========================================*/

const terminal=document.querySelector(".terminal");

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

terminal.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;

});


/*==========================================
        RESET ROTATION
==========================================*/

window.addEventListener("mouseleave",()=>{

terminal.style.transform="rotateX(0) rotateY(0)";

});


/*==========================================
        SCROLL PROGRESS BAR
==========================================*/

const progress=document.createElement("div");

progress.className="progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scroll=

document.documentElement.scrollTop;

const height=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;

progress.style.width=

(scroll/height)*100+"%";

});
