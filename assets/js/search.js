function imageLoaderHTML(){
   $(".data").html(`
   <div id="load-image">
        <img src="assets/images/load-image.gif" alt="laoding ...">
   </div>`)
}

$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#btnSearch").click();
    }
});

$("#btnSearch").click(function() {
  getImageHTML();  
  return false;
});

function getImageHTML(){
var searchName = $("#search").val();
console.log(searchName);
var searchItem = encodeURIComponent(searchName);
console.log(searchItem);

var xhr = new XMLHttpRequest();

xhr.open("GET", `https://images-api.nasa.gov/search?q=${searchItem}&description=&media_type=image`);
xhr.send();

xhr.onreadystatechange = function(){
    if(this.staus = 200 && this.readyState == 4){
       console.dir(JSON.parse(this.responseText));
        var data = JSON.parse(this.responseText);
        var dataImage = data.collection.items;
        console.log(dataImage);
        var imageFiles = [];
        var imageDescribtion = [];
        console.log(typeof dataImage);
        dataImage.forEach(function(item){
            imageFiles.push(`
            <div class="data-image-article col-10 col-sm-3">
                <img src="${item.links[0].href}">            
                        <div class= "data-image-text">
                            <h4 class="data-image-title">${item.data[0].title}</h4>
                            <div class="data-image-description">${item.data[0].description}
                        </div>
                </div>
            </div>`)
        })
        

    }
 
$(".data").html(`
            <div class="sky-section container-fluid">
                    <div class="row justify-content-center">${imageFiles}</div>
            <div>`.replace(/,/g, ""));
$(".data-image-text").hide();
$(".data-image-article img").on("click", function(){
    $(this).siblings().slideToggle();
})
}
}

