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
    doc.getElementById("tab_num").value = "";
    doc.getElementById("password").value = ""
    doc.getElementById("operation_type").textContent = "-";
    doc.getElementById("num_line").textContent = "-";
    doc.getElementById("cod").textContent = "-";
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
        menuBtn.id = i;
        menuBtn.textContent = jsonMenu["menu"][i];
        menuBtn.addEventListener("click", function () {
            var oper_type = doc.getElementById(event.target.id).textContent;
            doc.getElementById("operation_type").textContent = oper_type;
            scanLine();
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
    doc.getElementById("main_menu").innerHTML = "";
    doc.getElementById("scaner").innerHTML = "";
    const newScanLine = doc.createElement('div');
    newScanLine.id = "scanerDiv";
    newScanLine.className = "scanerDiv";
    var help_text = doc.createElement("span");
    help_text.className = "help_text";
    help_text.textContent = "Отсканируйте номер линии";
    const newInput = doc.createElement('input');
    newInput.type = 'text';
    newInput.id = 'scaner_field';
    newInput.setAttribute("inputmode", "none")
    newScanLine.appendChild(help_text);
    newScanLine.appendChild(newInput);
    const currentDiv = doc.getElementById("scaner");
    currentDiv.appendChild(newScanLine)
    doc.getElementById('scaner_field').focus();
    checkLine()
}

function checkLine() {
    var inputLine = doc.getElementById("scaner_field");
    inputLine.addEventListener('keydown', logKey)
}

function logKey(e) {
    if (e.key == 'Enter') {
        var numLine = document.getElementById("scaner_field").value;
        doc.getElementById("num_line").textContent = numLine;
        doc.getElementById("scaner_field").value = "";
        scanerCod();
    }

}

// SCANER COD
function scanerCod() {
    doc.getElementById("main_menu").innerHTML = "";
    doc.getElementById('scaner').innerHTML = ""
    const newScanCod = doc.createElement('div');
    newScanCod.id = "scanerDiv";
    newScanCod.className = "scanerDiv";
    var help_text_code = doc.createElement("span");
    help_text_code.className = "help_text";
    help_text_code.textContent = "Отсканируйте штрих-код";
    const newInput = doc.createElement('input');
    newInput.type = 'text';
    newInput.id = 'scaner_field';
    newInput.setAttribute("inputmode", "none")
    newScanCod.appendChild(help_text_code);
    newScanCod.appendChild(newInput);
    const currentDiv = doc.getElementById("scaner");
    currentDiv.appendChild(newScanCod)
    doc.getElementById('scaner_field').focus();
    checkCod()
}

function checkCod() {
    var inputLine = doc.getElementById("scaner_field");
    inputLine.addEventListener('keydown', logKeyCode)
}

function logKeyCode(e) {
    if (e.key == 'Enter') {
        var cod = document.getElementById("scaner_field").value;
        doc.getElementById("cod").textContent = cod;
        doc.getElementById("scaner_field").value = "";
        showInfoCod(cod);
    }
}

function showInfoCod(cod) {
    console.log(cod);

}
