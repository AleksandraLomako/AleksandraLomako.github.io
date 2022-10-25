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
}
