const apiKey = "u50VDq1ZjwLEZtdTnhJN9DyOoQqocwzYPSgMeETmVxgCsQIUrAamzHsL";
const cards = document.querySelectorAll(".card");
const btnLoad = document.querySelector(".btn-primary");
const btnLoad2 = document.querySelector(".btnLoad2");
const col = document.querySelectorAll('.col-md-4')
let textMuted = document.querySelectorAll('small');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');

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
  col.forEach((col) => {
    col.style.display = 'block';
  })
});

btnLoad2.addEventListener("click", (e) => {
  e.preventDefault();
  callGetPhotos('sunset');
  col.forEach((col) => {
    col.style.display = 'block';
  })
});

function printImage(newQuery) {
  for (let i = 0; i < cards.length; i++) {
    let image = cards[i].querySelector(".card-img-top");
    image.setAttribute("src", photos[i].src.original);
    let btn = cards[i].querySelector('.btn-outline-secondary:last-of-type');
    btn.innerText = 'HIDE';
    let col = document.querySelector(`.col-md-4:nth-of-type(${i + 1})`);
    col.id = photos[i].id;
    textMuted[i].innerText = col.id;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteCard(col.id);
    });
    image.addEventListener('click', (e) => {
      e.preventDefault();
      let pagina2 = 'images.html';
      let newUrl = `${pagina2}?photoId=${photos[i].id}`;
      window.location.href = newUrl;
    })
  }
}

function createUrl() {
  if (!query) {
    return "https://api.pexels.com/v1/search?query=mountain&per_page=9";
  } else {
    url = `https://api.pexels.com/v1/search?query=${query}&per_page=9`;
    return url;
  }
}

function deleteCard(id) {
  let col = document.getElementById(id);
  let newId = id.toString();
  col.style.display = 'none';
}

btnSearch.addEventListener('click', (e) => {
  e.preventDefault;
  query = callGetPhotos(inputSearch.value);
  col.forEach((col) => {
    col.style.display = 'block';
  })
  inputSearch.value = '';
})