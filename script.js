const letters = ["A","T","G","C"];

function buildDNA(){

    const cols = Math.ceil(window.innerWidth/20);
    const rows = Math.ceil(window.innerHeight/20);

    let text="";

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            text += letters[Math.floor(Math.random()*4)] + " ";

        }

        text += "\n";

    }

    dnaDim.textContent = text;
    dnaBright.textContent = text;

}

const dnaDim = document.getElementById("dna-dim");
const dnaBright = document.getElementById("dna-bright");
const orb = document.getElementById("orb");

buildDNA();

window.addEventListener("resize",buildDNA);

function animate() {

    const t = Date.now() * 0.00020;

    const radius = 190;   // Half of your orb size (380px orb)

    const x =
        radius +
        ((Math.sin(t) + 1) / 2) *
        (window.innerWidth - radius * 2);

    const y =
        radius +
        ((Math.cos(t * 0.7) + 1) / 2) *
        (window.innerHeight - radius * 2);

    orb.style.left = x + "px";
    orb.style.top = y + "px";

    document.documentElement.style.setProperty("--x", x + "px");
    document.documentElement.style.setProperty("--y", y + "px");

    requestAnimationFrame(animate);
}

const dnaBg = document.getElementById("dna-bg");

window.addEventListener("scroll", () => {

    if(window.scrollY > window.innerHeight * 0.2){

        dnaBg.style.opacity = "0";

    }else{

        dnaBg.style.opacity = "1";

    }

});
animate();

const cards = document.querySelectorAll(".card");

// Small stagger between cards
cards.forEach((card, index) => {
    card.style.setProperty("--delay", `${index * 70}ms`);
});

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Stop observing after animation happens once
            observer.unobserve(entry.target);
        }

    });

},{
    threshold: 0.03,
    rootMargin: "0px 0px -3% 0px"
});

cards.forEach(card => observer.observe(card));
