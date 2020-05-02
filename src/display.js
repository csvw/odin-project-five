class Display {
    constructor() {
        this.div = document.getElementsByClassName('display')[0];
    }

    setContent(text) {
        this.div.innerHTML = text;
    }
}

export default Display;