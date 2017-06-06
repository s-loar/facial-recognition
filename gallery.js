var imgGallery;
var imgList = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
  "images/11.jpg",
  "images/12.jpg",
  "images/13.jpg",
  "images/14.jpg",
  "images/15.jpg",
  "images/16.jpg"
]

function createImage(src) {
    var image = document.createElement("img");
    var div = document.createElement("div");
    div.classList.add("image-container");
    image.src = src;
    div.appendChild(image);
    document.body.appendChild(div);
    return image;
}

function createGallery(images) {
  var imageobjects = [];
  images.forEach(function(image) {
    var imageobject = createImage(image);
    imageobjects.push(imageobject);
  });
  return imageobjects;
};

window.onload = function() {
  imgGallery = createGallery( imgList );
}
