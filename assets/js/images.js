let param = new URLSearchParams(window.location.search);
const photoId = param.get('photoId');
const urlImg = `https://api.pexels.com/v1/photos/${photoId}`;
let dataImg;
const image = document.getElementById('image');
let linkArtist = document.getElementById('linkArtist');


async function getPhoto() {
    try {
        let response = await fetch(
            urlImg,
            {
                headers: {
                    "Authorization":
                        "u50VDq1ZjwLEZtdTnhJN9DyOoQqocwzYPSgMeETmVxgCsQIUrAamzHsL",
                },
            }
        );
        dataImg = await response.json();
        printImage();

    } catch (error) {
        console.log(error);
    }
}

getPhoto();

function printImage() {
    image.setAttribute('src', dataImg.src.original);
    linkArtist.setAttribute('href', dataImg.photographer_url);
    linkArtist.innerText = dataImg.photographer;
}

