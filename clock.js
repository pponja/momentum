/**** clock ****/
const clockContainer = document.querySelector(".js-clock")

function showClock(hr, mn, sc) {
    const reformHr = (hr<10) ? '0'+hr : hr
    const reformMn = (mn<10) ? '0'+mn : mn
    const reformSc = (sc<10) ? '0'+sc : sc

    clockContainer.innerText = `${reformHr}:${reformMn}:${reformSc}`
}

function getDateInfo() {
    const dateInfo = new Date()

    const hr = dateInfo.getHours()
    const mn = dateInfo.getMinutes()
    const sc = dateInfo.getSeconds()

    // show clock in [class=js-clock]
    showClock(hr, mn, sc)
}

function init() {
    // get date info
    getDateInfo()
    // call getDateInfo() every 1 sec
    setInterval(getDateInfo, 1000)
}

init();