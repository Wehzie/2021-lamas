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

// override the console.log function to write to some user visible textArea 
(function () {
    const old = console.log
    const logger = document.getElementById("logArea")
    console.log = function () {
        logger.scrollTop = logger.scrollHeight
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.value += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + "\n"
            } else {
                logger.value += arguments[i] + "\n"
            }
        }
    }
})()