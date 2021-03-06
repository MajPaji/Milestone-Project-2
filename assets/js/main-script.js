// this function load the load-image picture while user typing or before images load into the HTML page
    function imageLoaderHTML(){
    $(".data").html(`
    <div class="load-image">
            <img src="assets/images/load-image.gif" alt="laoding ...">
            <h2>Loading...</h2>
    </div>`);
    }


//this part call the getImageHTML function when user press enter or click on the search icon
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


// this function get images from NASA REST API for the search keyword
    function getImageHTML(){
        let searchName = $("#search").val();
        if (!searchName){
            $(".data").html(`
                <div class="load-image">
                    <h2><i class="fas fa-user-astronaut mb-3" aria-hidden="true"></i><br/> Please search some words</h2>
                </div>`);
        return;
        }

        let searchItem = encodeURIComponent(searchName);

        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://images-api.nasa.gov/search?q=${searchItem}&description=&media_type=image`);
        xhr.send();

        xhr.onreadystatechange = function(){
            if(this.staus = 200 && this.readyState == 4){
            receiveData(JSON.parse(this.responseText));         //this part recieve data and process it in reciveData function.             
            } else {
                imageFiles = `
                    <div class="load-image">
                        <h2><i class="fas fa-user-astronaut mb-3" aria-hidden="true"></i><br/> No response from NASA server</h2>
                    </div>`;
            }

        };
    }



// this function make tShirt from selected image by user
    function tShirtSelector (image, title){
    return newTshirts = `
        <div class="carousel-item">    
            <div class="t-shirt-background--blue">
                <img class="t-shirt-image mx-auto d-block"  src="${image}" alt="${title}">             
            <div class="carousel-caption">
                <h5 class="mb-0">color:</h5>        
                <div class="btn-toolbar d-block" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-primary border border-success btn--blue"></button>
                </div>
                <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button type="button" class="btn btn-light border border-success btn--white"></button>
                </div>  
            </div>
                <form class="mt-1">
                <span>size: </span>
                    <label for="small"><input type="radio" name="size" id="small" value="small"> Small</label>                        
                    <label for="medium"><input type="radio" name="size" id="medium" value="medium" checked> Medium</label>                    
                    <label for="large"><input type="radio" name="size" id="large" value="large"> Large</label>                                  
                </form>
                <button type="button" class="btn btn-success p-3 btn--basket"><i class="fas fa-shopping-basket"></i><br>Add to your basket</button> 
            </div>            
            </div>        
        </div>`;
    }


// this part recive data from API and render the images, call for select t-Shirt, and shopping sections
    function receiveData(data){
        let dataImage = data.collection.items;
                let imageFiles = [];
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
                    </div>`);
                }); 
        if (imageFiles == ""){
                    imageFiles = `
                    <div class="load-image">
                        <h2><i class="fas fa-satellite mb-3" aria-hidden="true"></i><br/> Nothing found for your keywords</h2>
                    </div>`;            
                }   
        
        $(".data").html(`
                    <div class="sky-section container-fluid">
                    <div class="row justify-content-center">${imageFiles}</div>
                    <div>`.replace(/,/g, ""));
        $(".data-image-text").hide();
        
        $(".data-image-article img").on("click", function(){
            $(this).siblings().slideToggle();                   //toggle the image title and description.
        });
            
        let allTshirts = [];
        let basketTshirts = [];
        let numeberOfItems = 0;
        $(".btn--make-shirt").click(function(){                               
            let tShirtTitle = $(this).siblings("h4").html();
            let tShirtImage = $(this).parent().prev().attr("src");

        tShirtSelector(tShirtImage, tShirtTitle);              //make tShirts from selected image.
            
        
        $("#your-t-shirt span:last-child").html(` (${allTshirts.length + 1})`);

        allTshirts.push(newTshirts);

        if (allTshirts.length === 1){
                allTshirts[0]= allTshirts[0].replace("carousel-item", "carousel-item active");
        }    

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
        );

        
        $(".btn--blue").on("click", function(){                                     //change color of tShirt to blue and icons to white.
            $(this).parent().parent().prev().css("color", "rgb(248, 249, 250)");
            $(this).parent().parent().parent().parent().removeClass("t-shirt-background--white").addClass("t-shirt-background--blue");
            $(this).parent().parent().next().css("color", "rgb(248, 249, 250)");
        });

        $(".btn--white").on("click", function(){                                    //change color of tShirt to white and icons to blue.
            $(this).parent().parent().prev().css("color", "rgb(0, 123, 255)");
            $(this).parent().parent().parent().parent().removeClass("t-shirt-background--blue").addClass("t-shirt-background--white");
            $(this).parent().parent().next().css("color", "rgb(0, 123, 255)");
        });

        $("label[for='small']").on("click", function(){                             //demonstrate small size of the tShirt.
            $(this).parent().parent().parent().css("height", "65vh");
        });

        $("label[for='medium']").on("click", function(){                            //demonstrate medium size of the tShirt.
            $(this).parent().parent().parent().css("height", "70vh");
        });

        $("label[for='large']").on("click", function(){                             //demonstrate large size of the tShirt.
            $(this).parent().parent().parent().css("height", "75vh");
        });


        //this part add tShirt to shopping basket
        $(".btn--basket").on("click", function(){
            var tShirtImageTitle = $(this).parent().prev().attr("alt");
            var tShirtImageSource = $(this).parent().prev().attr("src");
            var tShirtSize = $(this).prev().children().children("input[name='size']:checked").val();
            var tShirtColor = $(this).parent().prev().parent().attr('class').substr(20);

        
        $("#basket span:last-child").html(` (${++numeberOfItems})`);

            let newBasketTshirt = `
            <tr>
                <td>${tShirtSize}</td> 
                <td>${tShirtColor}</td>   
                <td><a href=${tShirtImageSource} target="_blank">${tShirtImageTitle}</a></td>  
                <td class="trash-basket"><i class="fas fa-trash-alt"></i></td>    
            </tr>
            `;
            
            basketTshirts.push(newBasketTshirt);

            $(".shopping-t-shirts").html(
                `
                <form class="form-group" onsubmit="return sendMail(this);">    	
                    <table id="shoping-list-table" class="table table-hover table-lg table-dark">
                        <tr>
                        <th scope="col">tShirt Size</th>
                        <th scope="col">tShirt Color</th>
                        <th scope="col">Image Title</th>                   
                        </tr>
                        ${basketTshirts}        
                    </table>
                    <input type="text" class="form-control form-shopping mt-5" name="name" id="fullname" placeholder="Name" required>
                    <input type="email" class="form-control form-shopping mt-3" name="emailaddress" id="emailaddress" placeholder="Email" required>
                    <small id="emailHelp" class="form-text text-muted form-shopping">We'll never share your name or email with anyone else.</small>
                    <button type="submit" id="button-order" class="btn btn-success btn-lg form-shopping d-block mt-3">Order</button>
                </form>
                
                `
            );

        $(".trash-basket").on("click", function(){                              //remove the item from the shopping list.
            let remainingBasketTshirtsItems = $(this).parent().siblings();
            $(this).parent().detach();
            $("#basket span:last-child").html(` (${--numeberOfItems})`); 
            tableRow = [];    
            for(i=1 ; i <= numeberOfItems; i++ ){
                tableRow.push(`<tr>${remainingBasketTshirtsItems[i].innerHTML}</tr>`);
            }    
            basketTshirts = tableRow;        
        });
        });
        

        });
        }


//this part control which part of the index.html show or hide
$(document).ready(function(){
    $("#all-t-shirts").hide();
    $("#basket-t-shirts").hide();
    $("#search-results").show();
    $("#search-box-data").show();    

$("#search-page").on("click", function(){
    $("#all-t-shirts").hide();
    $("#basket-t-shirts").hide();
    $("#search-results").show();
    $("#search-box-data").show();
});

$("#your-t-shirt").on("click", function(){
    $("#search-box-data").hide();
    $("#search-results").hide();
    $("#basket-t-shirts").hide();
    $("#all-t-shirts").show();
});

$("#basket").on("click", function(){
    $("#search-box-data").hide();
    $("#search-results").hide();
    $("#all-t-shirts").hide();
    $("#basket-t-shirts").show();
});
});

