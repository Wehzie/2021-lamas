
//toggle links. none->block, block->none
function toggleNavBurger() {
    const subLinks = document.getElementById("subLinks")

    if (subLinks.style.display === "block") {
        subLinks.style.display = "none"
    }
    else {
        subLinks.style.display = "block"
    }
}

// generate a series of card choices based on the max rank
// that a game of Go Fish is played with
function genCardChoice(maxRank=13) {
    outHTML = ""
    cardSeries = "0 A 2 3 4 5 6 7 8 9 10 J Q K".split(" ")
    cS = cardSeries

    for (let rank = 1; rank <= maxRank; rank++) {
        outHTML += "<button onclick='button_set_card("+rank+")' id='card"+rank+"'>" + cS[rank] + "</button>\n"
    }
    return outHTML
}

let mode = 0
let first_round = true

// toggle the card menu between three different states
function toggleCardMenu() {
    // after the first toggle remove the event listener
    if (first_round) {
        document.getElementById("startGame").remove()
        first_round = false
    }
    bp = document.getElementById("buttonPanel")
    if (mode == 0) {
        bp.innerHTML = `
        <button onclick='button_set_agent(1)'>AI 1</button>
        <button onclick='button_set_agent(2)'>AI 2</button>
        `
    } else if (mode == 1) {
        bp.innerHTML = genCardChoice()
    } /*else {
        bp.innerHTML = "It's not your turn."
    }*/
    mode = (mode + 1) % 2
}

//1-2
let chosen_agent = null
function button_set_agent(val) {
    chosen_agent = val
    toggleCardMenu()
    // further processing
}

//1-13
let chosen_card = null
function button_set_card(val) {
    toggleCardMenu()
    chosen_card = val
}