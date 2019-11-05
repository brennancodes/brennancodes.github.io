$("#settings").on("click", function(){
    localStorage.setItem("navigate", "settings");
    window.location.replace("index.html");
});