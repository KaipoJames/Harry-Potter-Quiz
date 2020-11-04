const body = document.body;

export const Start = {

    init() {
        this.createScreen();
    },
    createScreen() {
        const screen = document.createElement("div");
        screen.style.width = "100vw";
        screen.style.height = "100vh";
        screen.style.background = "rgb(207, 207, 207)";
        screen.style.position = "absolute";
        screen.style.top = "0";
        screen.style.zIndex = "100";
        screen.style.display = "flex";
        screen.style.flexDirection = "column";
        screen.style.justifyContent = "space-around";
        screen.style.alignItems = "center";
        body.appendChild(screen);
        this.addScreenContent(screen);
    },
    addScreenContent(screen) {
        //Create Screen Title
        const screen_title = document.createElement("h1");
        screen_title.innerHTML = "Harry Potter Quiz!"
        screen_title.style.fontSize = "3rem";
        screen.appendChild(screen_title);

        //Create Start Button
        const startBtn = document.createElement("button");
        startBtn.innerHTML = "Start Quiz";
        startBtn.fontSize = "2rem";
        startBtn.style.width = "20rem";
        startBtn.style.height = "4rem";
        startBtn.style.background = "white";
        startBtn.style.cursor = "pointer";

        //Append Elements to Screen
        screen.appendChild(screen_title);
        screen.appendChild(startBtn);

        //Listen To Button Click
        this.addClickListener(screen, startBtn);
    },
    addClickListener(screen, startBtn) {
        //Remove Start Screen
        startBtn.addEventListener("click", () => {
            screen.style.display = "none";
        })
    }   
}