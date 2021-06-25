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
        outHTML += "<button onclick='buttonToValue("+rank+")' id='card"+cS[rank]+"'>" + cS[rank] + "</button>\n"
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
        <button>AI 1</button>
        <button>AI 2</button>
        `
    } else if (mode == "cardChoice") {
        bp.innerHTML = genCardChoice()
    } else {
        bp.innerHTML = "It's not your turn."
    }
}

// called by a button with some value
function buttonToValue(val) {
    return val
}