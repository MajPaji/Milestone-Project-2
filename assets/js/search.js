

function imageLoaderHTML(){
   $(".data").html(`
   <div id="load-image">
        <img src="assets/images/load-image.gif" alt="laoding ...">
        <h2>Loading...</h2>
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
                        <button type="button" class="btn btn-primary mb-3 btn--make-shirt">Add to your T-shirt</button>
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

    
var allTshirts = [];
$(".btn--make-shirt").click(function(){
     console.log("hello");    
    var tShirtTitle = $(this).siblings("h4").html();
    var tShirtImage = $(this).parent().prev().attr("src");

    var newTshirts = `
    
    <div class="carousel-item">
    
        <div class="t-shirt-background--blue">
        <img class="t-shirt-image mx-auto d-block"  src="${tShirtImage}" alt="${tShirtTitle}">
        
        <div class="carousel-caption">
            <h5>Choose color:</h5>        
            <div class="btn-toolbar d-block" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-primary border border-success btn--blue"></button>
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
                <button type="button" class="btn btn-light border border-success btn--white"></button>
            </div>  
        </div>
            <button type="button" class="btn btn-success mt-3 p-3"><i class="fas fa-shopping-basket"></i></br>Add to your basket</button>        
        </div>
        
        </div>        
    </div>
    
    `  
   
    $("#your-t-shirt span:last-child").html(` (${allTshirts.length + 1})`);

    allTshirts.push(newTshirts);
    if (allTshirts.length === 1){
        allTshirts[0]= allTshirts[0].replace("carousel-item", "carousel-item active");
    }
    
    console.log(allTshirts);  

    $(".selected-t-shirts").html(
        `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                ${allTshirts.join().replace(/,/g, "")}                
            </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        
        </div>
             
        `
   
    )

 $(".btn--blue").on("click", function(){
    $(this).parent().parent().prev().css("color", "rgb(248, 249, 250)");
    $(this).parent().parent().parent().parent().removeClass("t-shirt-background--white").addClass("t-shirt-background--blue");
})

$(".btn--white").on("click", function(){
    $(this).parent().parent().prev().css("color", "rgb(0, 123, 255)");
    $(this).parent().parent().parent().parent().removeClass("t-shirt-background--blue").addClass("t-shirt-background--white");
})

})
}

}

$(document).ready(function(){
    $("#all-t-shirts").hide();
    $("#search-results").show();
    $("#search-box-data").show();

$("#search-page").on("click", function(){
    $("#all-t-shirts").hide();
    $("#search-results").show();
    $("#search-box-data").show();
});

$("#your-t-shirt").on("click", function(){
    $("#search-box-data").hide();
    $("#search-results").hide();
    $("#all-t-shirts").show();
});

})









