
function setup() {
    createCanvas(1024,1024)
    background(128)
}

function mouseDragged() {
    // this draws a line from the previous mouse position and the current mouse position
    line(pmouseX, pmouseY, mouseX, mouseY)

    // this draws the same line on everyone else's screen
    // think carefully about the difference between this line:
    X(`line(${pmouseX}, ${pmouseY}, ${mouseX}, ${mouseY})`)

    // and the 'incorrect' X(`line(pmouseX, pmouseY, mouseX, mouseY)`)
}