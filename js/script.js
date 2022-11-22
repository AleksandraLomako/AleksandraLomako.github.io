const doc = document;
var minDate = "";
var dateValue = "";
const server_host = "http://10.10.3.17:8000";
const host = server_host + '/request/common/common_handler/SqlQuery/sql_query?session=2';

var user_info = {}

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
}, 5000);;
//Login///////////////////////////////////////////
//Size local storage 
var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
};
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

// Login
async function loginHTML() {
    // try {
    //     var sql_text = "select b.tabnum, a.* from total.vg_arm_mr_list a left join total.vg_groups_to_users b on a.id_arm_groups = b.id_arm_groups where a.arm_name = 'ТСД' and b.tabnum = '01002'";
    //     var body_sel = { "function": "fetch", "query": sql_text };
    //     var response = await fetch(host, {
    //         method: 'POST',
    //         body: JSON.stringify(body_sel)
    //     });
    //     var result = await response.json();
    //     var i = 0
    //     for (var user in result[i]) {
    //         console.log(result[i])
    //         i += 1
    //     }



    //     localStorage.setItem("result", (JSON.stringify(result)))

    // }
    // catch (err) {
    //     var errors = "404"
    //     console.log(errors)
    // }
    var loginHTML = '<style>.inner_container {max- width: 100 %;margin: 0 auto;}.login_wrapper {margin: auto;width: 100vw;height: 100vh;display: grid;grid-template-rows: auto auto auto;justify-content: center;background-color: #F2F2F2;}.network_status {padding-top: 20px;margin: 0 auto;}.network_status p {text - align: center;color: #27262a;}#indicator {width: 50px;filter: invert(96 %) sepia(89 %) saturate(29 %) hue - rotate(325deg) brightness(110 %) contrast(2 %);}.login_form {display: flex;flex-direction: column;width: 280px;}.login_form p {margin: 0px;font-weight: 400;font-size: 20px;line-height: 28px;display: flex;color: #27262a;}.login_form input {height: 60px;margin: 10px 0px 10px 0px;border: 1px solid #eaeaea;border-radius: 5px;padding-left: 20px;font-style: normal;font-weight: 500;font-size: 20px;line-height: 37px;color: #27262a;}#error_login_text {display: none;font-style: italic;font-weight: 400;font-size: 16px;line-height: 18px;color: #C03434;margin-top: 5px;margin-bottom: 0px;}.login_form button {margin-top: 40px;height: 60px;background: #fbfbfb;border-radius: 5px;color: #27262a;font-weight: 500;font-size: 20px;line-height: 28px;border: 1px solid #eaeaea;box-shadow: 0px 1px #d4d4d4;cursor: pointer;}.login_form button:hover {border: none;background-color: #0363c3;box-shadow: 0px 1px #003b87;color: #fbfbfb;}.login_footer {position: fixed;bottom: 0px;text-align: center;width: 100 %;}</style> <div id="login_wrapper" class="login_wrapper"><div id="network_status" class="network_status"><img id="indicator" src="img/network.svg" alt=""></div><div class="login_form"><p>Табельный номер</p><input id="tab_num" type="text" inputmode="none" placeholder="Табельный номер..."><p>Пароль</p><input id="password" type="text" inputmode="none" placeholder="Пароль..."><div id="error_login_text" class="error_login_text">Табельный номер или пароль указан неверно</div><button onclick="log_in()">Войти</button></div></div></div>'
    localStorage.setItem("loginHTML", loginHTML)
    // console.log(localStorage.getItem("loginHTML"))
    document.getElementById("wrapper").innerHTML = loginHTML;
}
loginHTML()


localStorage.clear();
function log_in() {
    var doc = document;
    var tab_num = doc.getElementById("tab_num").value;
    var password = doc.getElementById("password").value;
    // TRY FIND USER LOCAL STORAGE
    var user = localStorage.getItem(tab_num);
    if (user == null) {
        add_user(tab_num)
    }
    if (user != null) {
        //CHANGE ADD ON PASSWORD
        if (JSON.parse(user).pass == password) {
            menuHTML(user)
        }
        else {
            console.log(JSON.parse(user).pass)
            doc.getElementById("error_login_text").style.display = "block";
        }
    }

}


function add_user(tab_num) {
    console.log("ADD USER TO LOCAL STORAGE");
    var sql_text = "select * from total.v_user_to_menu a where a.arm_name = 'ТСД' and a.tabnum =  " + "'" + tab_num + "'";
    var body_sel = { "function": "fetch", "query": sql_text };
    fetch(host, { method: 'POST', body: JSON.stringify(body_sel) }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
        .then((responseJson) => {
            // UPDATE USER IN LOCAL STORAGE
            console.log(responseJson);
            user_info.username = responseJson[0]["username"];
            user_info.pass = responseJson[0]["pass"];
            user_info.group_name = responseJson[0]["group_name"];
            for (let i = 0; i < responseJson.length; i++) {
                var menu_item = responseJson[i]["menu_name"];
                if (menu_item == "Обновление ТСД") {
                    user_info.update = (responseJson[i]["menu_name"])
                };
                if (menu_item == "Просмотр") {
                    user_info.view = (responseJson[i]["menu_name"])
                };
                if (menu_item == "Удаление после отправки") {
                    user_info.del_after = (responseJson[i]["menu_name"])
                };
                if (menu_item == "Удаление до отправки") {
                    user_info.del_befor = (responseJson[i]["menu_name"])
                };
                if (menu_item == "Добавить") {
                    user_info.add = (responseJson[i]["menu_name"])
                };
            }
            localStorage.setItem(tab_num, JSON.stringify(user_info));
            log_in()
        })
        .catch((error) => {
            console.log(error)
            alert("Подльзователь не зарегистрирован")
        })
}
;
// MENU
// FOOTER MENU FUN & BTN
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




var jsonMenu = {
    "menu": {
        "add_prod": "Добавить в оборот", "dell_prod": "Вывести из оборота", "check": "Проверка штрих-кода",
        "update": "Обновить терминал"
    }
};

function menu() {
    doc.getElementById("dateWrapper").innerHTML = "";
    doc.getElementById("scaner").innerHTML = "";
    doc.getElementById("codes_list").innerHTML = "";
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
    doc.getElementById("codes_list").innerHTML = "";
    doc.getElementById('login_wrapper').style.display = 'grid'
    doc.getElementById("tab_num").focus();
}



// /////////////////////////////////////////////
function menuHTML(user) {
    doc.getElementById("error_login_text").style.display = "none";
    user = JSON.parse(user)
    console.log(user)
    var mainHTML = '<div class="inner_container"><div id="bar_info" class="bar_info"><p>Отдел: <span id="department">-</span></p><p>Тип операции: <span id="operation_type">-</span></p><p class="num_line">№ линии: <span id="num_line">-</span></p></div><div id="dateWrapper"></div><div id="main_menu_wrapper" class="main_menu_wrapper"><div id="main_menu" class="main_menu"></div></div></div>'

    doc.getElementById("wrapper").innerHTML = mainHTML;
    doc.getElementById("department").textContent = user.group_name
};
// SAVE TO BD////////////////////////////////////
function saveInlocalStorage(cod) {
    localUsers()
    console.log(localStorage.getItem("users"))
    addLocalStorage(cod);
}

function addLocalStorage(cod) {
    localStorage.setItem(cod, cod);
    allStorage()
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        if (keys[i] != "users") {
            values.push(localStorage.getItem(keys[i]));
        }
        else {
            continue
        }

    }
    console.log(values);
};

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
        // doc.getElementById("cod").textContent = cod;
        doc.getElementById("scaner_field").value = "";
        showInfoCod(cod);
    }
}
function showInfoCod(cod) {
    console.log(cod);
    var codDivInfo = doc.createElement("div");
    codDivInfo.className = "cod_div_info";
    var codInfoText = doc.createElement("span");
    codInfoText.textContent = "Штрих-код: " + cod;
    codDivInfo.appendChild(codInfoText);
    const currentDiv = doc.getElementById("codes_list");
    currentDiv.appendChild(codDivInfo)
    saveInlocalStorage(cod)
}

function test() {
    localStorage.setItem("loginHTML", '<style>.inner_container {max- width: 100 %;margin: 0 auto;}.login_wrapper {margin: auto;width: 100vw;height: 100vh;display: grid;grid - template - rows: auto auto auto;justify - content: center;background - color: #F2F2F2;}.network_status {padding - top: 20px;margin: 0 auto;}.network_status p {text - align: center;color: #27262a;}#indicator {width: 50px;filter: invert(96 %) sepia(89 %) saturate(29 %) hue - rotate(325deg) brightness(110 %) contrast(2 %);}.login_form {display: flex;flex - direction: column;width: 280px;}.login_form p {margin: 0px;font - weight: 400;font - size: 20px;line - height: 28px;display: flex;color: #27262a;}.login_form input {height: 60px;margin: 10px 0px 10px 0px;border: 1px solid #eaeaea;border - radius: 5px;padding - left: 20px;font - style: normal;font - weight: 500;font - size: 20px;line - height: 37px;color: #27262a;}#error_login_text {display: none;font - style: italic;font - weight: 400;font - size: 16px;line - height: 18px;color: #C03434;margin - top: 5px;margin - bottom: 0px;}.login_form button {margin - top: 40px;height: 60px;background: #fbfbfb;border - radius: 5px;color: #27262a;font - weight: 500;font - size: 20px;line - height: 28px;border: 1px solid #eaeaea;box - shadow: 0px 1px #d4d4d4;cursor: pointer;}.login_form button:hover {border: none;background - color: #0363c3;box - shadow: 0px 1px #003b87;color: #fbfbfb;}.login_footer {position: fixed;bottom: 0px;text - align: center;width: 100 %;}</style> ')
        (console.log(localStorage.getItem("loginHTML")))
}



