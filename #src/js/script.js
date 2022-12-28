@@include('_video_list.js');


setTimeout(() => {
    document.getElementById("splash_screen").style.display = "none";
    document.body.style.backgroundColor = "#22272e";
    document.getElementById("header").style.display = "block";
}, 3000)


document.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        searchFilm()
    }
    else { }
})

function searchFilm() {
    let doc = document;
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
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    doc.getElementById("poster_list").innerHTML = "";
    updateContent(films)
}

function getSerials() {
    let doc = document;
    doc.getElementById("content").innerHTML = "";
    doc.getElementById("name_film").textContent = "";
    document.getElementById("poster_list").innerHTML = "";
    updateContent(serials)
}

function getMult() {
    let doc = document;
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