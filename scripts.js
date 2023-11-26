document.addEventListener("DOMContentLoaded", init);

//Initialize the page
function init(){
    //Setup Theme
    const themeToggle = document.querySelector(".themeToggle")
    themeToggle.style.display = "inline";
    themeToggle.addEventListener("click", setThemeLS);

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark"); //default dark mode
      }
    let theme = localStorage.getItem("theme");
    if(theme == "light"){
        themeToggle.checked = true;
    }
    setTheme();
}

//Change the theme variable in localStorage
function setThemeLS(event){
    if(event.target.checked){
        localStorage.setItem("theme", "light")
    }
    else if(!event.target.checked){
        localStorage.setItem("theme", "dark")
    }
    setTheme();
}

//Change the colors depending on the current theme
function setTheme(){
    let root = document.querySelector(':root');
    let theme = localStorage.getItem("theme");
    if(theme == "light"){
        root.style.setProperty('--text_color','rgb(49, 50, 70)');
        root.style.setProperty('--background_color', 'rgb(231, 229, 255)' );
        root.style.setProperty('--secondary_color','rgb(119, 132, 245)');
    }
    else if(theme = "dark"){
        root.style.setProperty('--text_color','rgb(240, 244, 248)');
        root.style.setProperty('--background_color', 'rgb(10, 15, 34)' );
        root.style.setProperty('--secondary_color','rgb(29, 34, 51)');
    }
    console.log(theme);
}

