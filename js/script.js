function test() {
    alert('test')
}

function test_btn() {
    var doc = document;
    doc.getElementById('scaner').innerHTML = ""
    document.getElementById('main_menu_wrapper').style.display = 'block'
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
        alert(x);
    }

}
