const doc = document;
var minDate = "";
var dateValue = "";


//Check Online Status/////////////////////////////
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
    const statusIndicator = doc.getElementById('indicator');
    const statusHeaderIndicator = doc.getElementById('header_indicator');
    statusIndicator.style.filter = result ? "invert(35%) sepia(84%) saturate(4801%) hue-rotate(125deg) brightness(102%) contrast(80%)" : "invert(32%) sepia(80%) saturate(1418%) hue-rotate(335deg) brightness(78%) contrast(92%)";
    statusHeaderIndicator.style.filter = result ? "invert(35%) sepia(84%) saturate(4801%) hue-rotate(125deg) brightness(102%) contrast(80%)" : "invert(32%) sepia(80%) saturate(1418%) hue-rotate(335deg) brightness(78%) contrast(92%)";
}, 5000);


// FORMAT DATE
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day];
}

// START DATE
function startDate() {
    const dateNow = Date.now();
    minDate = formatDate(dateNow)
    dateValue = minDate;
    changeDateCalendar();
}
// CHANGE DATE IN CALENDAR
function changeDateCalendar() {
    doc.getElementById("calendar-date").textContent = dateValue[2] + "." + dateValue[1] + "." + dateValue[0];
}


//Login///////////////////////////////////////////
function Login() {
    console.log("Login")
    doc.getElementById("tab_num").value = "";
    doc.getElementById("password").value = ""
    // doc.getElementById('error_login_text').style.display = 'block';
    doc.getElementById('login_wrapper').style.display = 'none'
    startDate()
}


// FOOTER MENU FUN BTN
function changeDate() {
    doc.getElementById("scaner").innerHTML = "";
    doc.getElementById('main_menu').innerHTML = "";
    const dateWrapper = doc.getElementById("dateWrapper");
    dateWrapper.innerHTML = "";
    const dateInput = doc.createElement("input");
    dateInput.type = "date";
    dateInput.id = "dateId";
    dateInput.value = dateValue.join("-");
    dateInput.setAttribute("min", dateValue.join("-"))
    dateWrapper.appendChild(dateInput)
    const calendarBtn = doc.createElement("button");
    calendarBtn.className = "_btn"
    calendarBtn.textContent = "Применить"
    calendarBtn.addEventListener("click", function () {
        dateValue = doc.getElementById('dateId').value.split("-");
        changeDateCalendar();
        dateWrapper.innerHTML = "";
    });
    dateWrapper.appendChild(calendarBtn)
    doc.getElementById("dateId").focus()
}

var jsonMenu = { "menu": { "add_prod": "Добавить", "dell_prod": "Вывести из оборота", "view": "Просмотр" } };

function menu() {
    doc.getElementById("dateWrapper").innerHTML = "";
    doc.getElementById("scaner").innerHTML = "";
    const menuDiv = doc.getElementById("main_menu");
    menuDiv.innerHTML = ""
    for (var i in jsonMenu["menu"]) {
        var menuBtn = doc.createElement("button");
        menuBtn.className = "_btn";
        menuBtn.setAttribute("action", i)
        menuBtn.textContent = jsonMenu["menu"][i];
        menuBtn.addEventListener("click", function () {
            scanLine()
        })
        menuDiv.appendChild(menuBtn)
    }
}

function LogOut() {
    doc.getElementById("dateWrapper").innerHTML = "";
    doc.getElementById("main_menu").innerHTML = "";
    doc.getElementById("scaner").innerHTML = "";
    doc.getElementById('login_wrapper').style.display = 'grid'
    doc.getElementById("tab_num").focus();
}


// SCANER LINE
function scanLine() {
    doc.getElementById("scaner").innerHTML = "";
    const newScanLine = doc.createElement('div');
    newScanLine.id = "scanerDiv";
    newScanLine.className = "scanerDiv";
    const newInput = doc.createElement('input');
    newInput.type = 'text';
    newInput.id = 'scaner_field';
    newInput.setAttribute("inputmode", "none")
    newScanLine.appendChild(newInput);
    const currentDiv = doc.getElementById("scaner");
    currentDiv.appendChild(newScanLine)
    doc.getElementById('scaner_field').focus();
//     checkValue()
}





// SCANER SCRIPT
function ScanerQR() {
    var doc = document;
    doc.getElementById('scaner').innerHTML = ""
    const newDiv = doc.createElement('div');
    newDiv.id = 'scanerDiv';
    newDiv.className = 'scanerDiv';

    const newInput = doc.createElement('input');
    newInput.type = 'text';
    newInput.id = 'scaner_field';
    newInput.setAttribute("inputmode", "none")
    newDiv.appendChild(newInput);
    const currentDiv = doc.getElementById("scaner");
    currentDiv.appendChild(newDiv);
    doc.getElementById('scaner_field').focus();
    // checkValue()
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
