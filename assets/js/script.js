const apiKey = "u50VDq1ZjwLEZtdTnhJN9DyOoQqocwzYPSgMeETmVxgCsQIUrAamzHsL";
const cards = document.querySelectorAll(".card");
const btnLoad = document.querySelector(".btn-primary");
const btnLoad2 = document.querySelector(".btnLoad2");
let data;
let photos;
let url = "https://api.pexels.com/v1/search?query=mountain&per_page=9";
let query;


async function getPhotos() {
    try {
        let response = await fetch(
            createUrl(),
            {
                headers: {
                    "Authorization":
                        "u50VDq1ZjwLEZtdTnhJN9DyOoQqocwzYPSgMeETmVxgCsQIUrAamzHsL",
                },
            }
        );
        data = await response.json();
        photos = data.photos;
        printImage();
    } catch (error) {
        console.log(error);
    }
}

async function callGetPhotos(newQuery) {
  query = newQuery;
    try {
        getPhotos();
    } catch (error) {
        console.log(error);
    }
}

btnLoad.addEventListener("click", (e) => {
    e.preventDefault();
    callGetPhotos('mountain');
});

btnLoad2.addEventListener("click", (e) => {
    e.preventDefault();
    callGetPhotos('sunset');
});

function printImage(newQuery) {
    for (let i = 0; i < cards.length; i++) {
        let image = cards[i].querySelector(".card-img-top");
        image.setAttribute("src", photos[i].src.original);
    }
    query = newQuery;
}

function createUrl() {
    if (!query) {
        return "https://api.pexels.com/v1/search?query=mountain&per_page=9";
    } else {
        url = `https://api.pexels.com/v1/search?query=${query}&per_page=9`;
        return url;
    }

}
