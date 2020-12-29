/**** Background image ****/
/* Create image element and add to body. */
/* Image source is changed by random value. (1~5.jpg)*/

const BG_CN = "background"

function getRandomNumber() {
    return Math.floor(Math.random()*5 + 1)
}

function showBg() {
    const bgImg = document.createElement("img")

    const randomNum = getRandomNumber()
    console.log(randomNum)

    bgImg.src = `./images/photo${randomNum}.jpg`
    bgImg.classList.add(BG_CN)

    document.body.appendChild(bgImg)
}

function init() {
    showBg()
}

init();