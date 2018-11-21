$(document).ready(function () {
   $("#Recipes").empty();
    $(".recipe").hide();
    $("#searchIng").on("click", function (event) {
        event.preventDefault();
        $("#Recipes").empty();
        $(".recipe").hide();

        //API for mealDB data to get the videos
        var search = $("#input-Search-Ingredient").val().trim();
        if (search == "") {
            alert("please enter the ingredient:");
        } else {
            $(".recipe").show();
            // var ApiKey = "1";
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


                    for (var i = 0; i < len; i++) {

                        var ingredientsList_i = [];
                        for (j = 1; j <= 20; j++) {
                            var ingredient = result[i]["strIngredient" + j];

                            if (ingredient != "" && ingredient != null) {
                                ingredientsList_i.push(ingredient);
                                console.log(ingredientsList_i);
                                getPrice(ingredient, j);



                            }


                        }



                    }
                    function getPrice(ingredient, i) {
                        var price = 0;
                        console.log("Entered getPrice Function:");
                        var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=m29hq47fka5q47y4qrdqyz3a&query=" + ingredient + "&categoryId=976759&sort=bestseller&responseGroup=full"


                        $.ajax({
                            url: queryURL,
                            method: "GET",
                            dataType: 'jsonp'
                        })

                            .then(function (response) {
                                var result = response["items"][0];
                                // console.log("WALMART DATA----");
                                //console.log(result);
                                price = result["salePrice"];
                                var listIngre = $("<div>");
                                listIngre.append("<br><br><br><br>");
                                listIngre.text(ingredient + ":  $" + price);
                                listIngre.append("<br>");
                                $("#list" + i).append(listIngre);
                            });

                    }

                });



        }


                        

                 
    

    }).error(function (err) {
        console.log(err);

    });

});










