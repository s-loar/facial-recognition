var imgGallery;
var resizeTimer;
var imgList = [
  "images/17.jpg",
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

function plotBox (element, x, y, w, h) {
  var box = document.createElement('div');
  element.parentNode.appendChild(box);
  box.classList.add('feature');
  box.style.width = w + 'px';
  box.style.height = h + 'px';
  box.style.left = (element.offsetLeft + x) + 'px';
  box.style.top = (element.offsetTop + y) + 'px';
};

function trackImage(image) {
  image.addEventListener("load", function() {
    var tracker = new tracking.ObjectTracker(["face"]);
    tracker.setStepSize(1.7);
    tracking.track(image,tracker);

    /* Handle track event to draw bounding box for feature */
    tracker.on("track", function(event) {
      event.data.forEach(function(box) {
        window.plotBox(image, box.x, box.y, box.width, box.height);
      });
    });

  });
}

function trackAllImages(imageArray) {
  imageArray.forEach(function(image) {
    trackImage(image);
  });
};

function retrackAllImages(imageArray) {
  imageArray.forEach(function(image) {
    image.dispatchEvent(new Event("load"));
  });
}

window.onload = function() {
  imgGallery = createGallery( imgList );
  trackAllImages(imgGallery);
};

window.onresize = function()
{
  var features = document.getElementsByClassName("feature");
  while(features[0]) {
    features[0].parentNode.removeChild(features[0]);
  }

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout("retrackAllImages(imgGallery);", 500);
}
