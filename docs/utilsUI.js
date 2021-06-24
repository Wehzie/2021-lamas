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

// toggle the card menu between three different states
function toggleCardMenu() {
    bp = document.getElementById("buttonPanel")
    modes = ["playerChoice", "cardChoice", "notYourTurn"]
    mode = "cardChoice"
    if (mode == "playerChoice") {
        bp.innerHTML = `
        <button onclick='button_set_agent(1)'>AI 1</button>
        <button onclick='button_set_agent(2)'>AI 2</button>
        `
    } else if (mode == "cardChoice") {
        bp.innerHTML = genCardChoice()
    } else {
        bp.innerHTML = "It's not your turn."
    }
}

//1-2
let chosen_agent = null
function button_set_agent(val) {
    chosen_agent = val
    // further processing
}

//1-13
let chosen_card = null
function button_set_card(val) {
    chosen_card = val
}