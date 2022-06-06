const navlinks = document.querySelectorAll(".nav-link");
const menu = document.querySelector(".menuLogo");
const list = document.querySelector(".nav-list");


menu.addEventListener("click", navToggle);

navlinks.forEach(i => i.addEventListener("click", ()=> {
    if(list.classList.contains("active")) 
        menu.click() 
}));

function navToggle() {
    navlinks.forEach(i => { 
        i.classList.toggle("fadeIn") 
    });
    list.classList.toggle("active");
}
