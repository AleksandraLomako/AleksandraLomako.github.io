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
    doc.getElementById('scaner_field').addEventListener("input", function () {
        var x = doc.getElementById("scaner_field").value;
        if (x.slice(-1) == " " || x.slice == "Space" || x.slice == 32) {
            console.log('END');
            console.log(x);

            alert(x);
            doc.getElementById('scaner_field').value = ''
        }
    });
}
