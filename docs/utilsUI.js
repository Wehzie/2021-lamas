
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


