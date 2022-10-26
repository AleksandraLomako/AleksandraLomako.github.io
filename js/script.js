//check Online Status/////////////////////////////
const checkOnlineStatus = async () => {
    try {
        const online = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        return online.status >= 200 && online.status < 300;
    } catch (err) {
        return false;
    }
};

setInterval(async () => {
    const result = await checkOnlineStatus();
    const statusIndicator = document.getElementById('indicator');
    const statusHeaderIndicator = document.getElementById('header_indicator');
    statusIndicator.style.filter = result ? "invert(35%) sepia(84%) saturate(4801%) hue-rotate(125deg) brightness(102%) contrast(80%)" : "invert(32%) sepia(80%) saturate(1418%) hue-rotate(335deg) brightness(78%) contrast(92%)";
    statusHeaderIndicator.style.filter = result ? "invert(35%) sepia(84%) saturate(4801%) hue-rotate(125deg) brightness(102%) contrast(80%)" : "invert(32%) sepia(80%) saturate(1418%) hue-rotate(335deg) brightness(78%) contrast(92%)";
}, 5000);


//Login///////////////////////////////////////////
function Login() {
    console.log("Login")
    var doc = document;
    // doc.getElementById('error_login_text').style.display = 'block';
    doc.getElementById('indicator').style.filter = "invert(32%) sepia(80%) saturate(1418%) hue-rotate(335deg) brightness(78%) contrast(92%)";
    doc.getElementById('login_wrapper').style.display = 'none'
}


// ALERT TEST BUTTON
function test_btn() {
    var doc = document;
    doc.getElementById('scaner').innerHTML = ""
    doc.getElementById('main_menu_wrapper').style.display = 'block'
}


function ScanerQR() {
    var doc = document;
    doc.getElementById('scaner').innerHTML = ""
    const newDiv = doc.createElement('div');
    newDiv.id = 'scanerDiv';
    newDiv.className = 'scanerDiv';

    const newInput = doc.createElement('input');
    newInput.type = 'text';
    newInput.id = 'scaner_field';
    newDiv.appendChild(newInput);
    const currentDiv = doc.getElementById("scaner");
    currentDiv.appendChild(newDiv);
    doc.getElementById('scaner_field').focus();
    checkValue()
}



function checkValue() {
    var doc = document;
    const inputTest = doc.getElementById('scaner_field');
    inputTest.addEventListener('keydown', logKey)
}

function logKey(e) {
    if (e.key == 'Enter') {
        var x = document.getElementById("scaner_field").value;


        var doc = document;
        doc.getElementById("scaner_field").value = "";
        const ptest = doc.createElement('p')
        ptest.innerText = x;
        document.getElementById('codes').appendChild(ptest)
    }

}

function test() {
    alert('test')
}



const acceptsInput = (elem) => {
    if (!elem) { return false }

    let tag = elem.tagName
    return tag == 'INPUT' || tag == 'SELECT' || tag == 'TEXTAREA' || elem.isContentEditable || elem.tabIndex >= 0
}

document.addEventListener('touchend', (e) => {
    let target = e.target
    let dontDiscardKeyboard = target.classList.contains('do-not-hide-keyboard')

    // On iOS tapping anywhere doesn’t
    // automatically discard keyboard
    if (dontDiscardKeyboard) {
        e.preventDefault()
        // DO ACTION HERE
    } else if (!acceptsInput(target)) {
        document.activeElement.blur()
    }
})

