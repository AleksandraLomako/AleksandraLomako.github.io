@@include('_video_list.js');


document.addEventListener('keyup', (e) => {
    let id_film = document.getElementById("id_film")
    if (e.code === "Numpad1" || e.code === "Digit1") {

        id_film.focus()
        id_film.addEventListener('keyup', (e) => {
            if (e.code === "Enter") {
                searchFilm()
            }
        })
    }
    else { }
})

function searchFilm() {
    let doc = document;
    document.getElementById("poster_list").innerHTML = "";
    let id = doc.getElementById("id_film").value;
    doc.getElementById("name_film").textContent = "";
    try {
        doc.getElementById("yohoho").remove();
        playVideo(id, doc)
    }
    catch {
        playVideo(id, doc)
    }
}

function playVideo(id, doc) {
    let w_window = window.innerWidth;
    if (w_window >= 1600) {
        doc.getElementById("content").style.width = `1280px`;
        doc.getElementById("content").style.height = `720px`;
    }
    else {
        if (w_window <= 1300) {
            doc.getElementById("content").style.width = `980px`;
            doc.getElementById("content").style.height = `560px`;
        }
    }



    let filmDiv = doc.createElement("div");
    filmDiv.id = "yohoho";
    filmDiv.setAttribute("data-kinopoisk", id);
    doc.getElementById("content").append(filmDiv);
    const sp = doc.createElement('script');
    sp.src = "//yohoho.cc/yo.js";
    doc.getElementById("content").append(sp);
    window.scrollTo(0, 0);
}

function getFilms() {
    let doc = document;
    doc.getElementById("content").style.width = `0`;
    doc.getElementById("content").style.height = `0`;
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    doc.getElementById("poster_list").innerHTML = "";
    updateContent(films)
}

function getSerials() {
    let doc = document;
    doc.getElementById("content").style.width = `0`;
    doc.getElementById("content").style.height = `0`;
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    document.getElementById("poster_list").innerHTML = "";
    updateContent(serials)
}

function getMult() {
    let doc = document;
    doc.getElementById("content").style.width = `0`;
    doc.getElementById("content").style.height = `0`;
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    document.getElementById("poster_list").innerHTML = "";
    updateContent(mult)
}

function getTok_show() {
    let doc = document;
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    document.getElementById("poster_list").innerHTML = "";
    updateContent(tok_show)
}

function updateContent(content) {
    console.log(content)
    let doc = document;
    let i = 0;
    let lengthList = content.serials.length
    while (i < lengthList) {
        let container_film = doc.createElement("div");
        container_film.id = i;
        container_film.className = "film_container";
        let name_film = doc.createElement("p");
        name_film.textContent = content.serials[i].name;
        let poster = doc.createElement("input");
        poster.type = "image"
        poster.id = content.serials[i].id;
        poster.className = "posterImg";
        poster.src = content.serials[i].img;
        doc.getElementById("poster_list").appendChild(container_film);
        doc.getElementById(i).appendChild(poster)
        doc.getElementById(i).appendChild(name_film);
        poster.onclick = function () {
            try {
                doc.getElementById("name_film").textContent = name_film.textContent;
                doc.getElementById("yohoho").remove();
                playVideo(poster.id, doc);
                doc.getElementById("poster_list").innerHTML = "";
            }
            catch {
                doc.getElementById("name_film").textContent = name_film.textContent;
                playVideo(poster.id, doc);
                doc.getElementById("poster_list").innerHTML = "";
            }
        }
        i++;
    }
}