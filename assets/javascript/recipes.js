
$(document).ready(function () {
   // var ajaxResponse;
    $("#Recipes").empty();
   $(".recipe").hide();
    $("#searchIng").on("click", function (event) {
        event.preventDefault();
        $("#Recipes").empty();
        $(".recipe").show();
        //API for YoutTube data to get the videos
        var search = $("#input-Search-Ingredient").val().trim();
        if (search == "") {
            alert("please enter the ingredient:");
        } else {


            var ApiKey = "1";
            var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;
            //var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=egg"
            console.log("The query url is " + queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    // response = JSON.parse(response);
                    console.log(response);
                    ajaxResponse = response;
                    var result = response["meals"];
                    var len = result.length;
                    console.log("The length of the array is :" + len);

                    if (len > 3)
                        len = 3;
                    else
                        len = len;

                    for (var i = 0; i < len; i++) {
                        var videoDiv_i = $("<a target = _blank>");
                        videoDiv_i.addClass("recipeVideos");
                        var imageLink_i = result[i]["strMealThumb"];
                        var videoLink_i = result[i]["strYoutube"];
                        var recipeName_i = result[i]["strMeal"];
                        console.log("The title of the recipe is " + recipeName_i);
                        videoDiv_i.text(recipeName_i);
                        var image_url_i = $("<img width=\"500px\">");
                        image_url_i.attr("src", imageLink_i);
                        videoDiv_i.attr("href", videoLink_i);
                        videoDiv_i.css('float', 'left');
                        videoDiv_i.css('margin', '5px');
                        videoDiv_i.css('border', 'solid');
                        videoDiv_i.css('border-width', '1px');
                        videoDiv_i.append(image_url_i);
                        $("#Recipes").append(videoDiv_i);
                        $("#Recipes").append("<br>")
                        
                    }

                    //$("#Recipes").append("<br><br>");
                  
                    for(var i=0;i<len;i++)
                    {
                        var ingredientsList_i = [];
                    for (j = 1; j <= 20; j++) {
                         var ingredient = result[i]["strIngredient"+j];
                        //console.log("The ingredient"+j+"is"+ingredient);
                        if (ingredient != "" && ingredient != null) {
                            ingredientsList_i.push(ingredient);
                           // k++;
                            console.log(ingredientsList_i);
                           // ingList_j.append(ingredient);
                            var listIngre = $("<div>");
                            listIngre.append("<br>");
                        listIngre.text(ingredient);
                        listIngre.append("<br>");
                        $("#list"+i).append(listIngre);
                         

                        }
                       
                  
                        
   
                                        
                    
                    
                }
                    

            }                 
                           
                           
                              
                                            
                        
                        
                    
                                            


                });
        }
    }).error(function (err) {
        console.log(err);

    });


});
