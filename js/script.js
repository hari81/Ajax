
function loadData() {

    var img = $('#bgimg');
    var bod= $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var street = $('#street').val();
    var city = $('#city').val();

    //clear out old data before new request
    $wikiElem.text("");
   $nytElem.text("");
   // load streetview
    var streetcity  = street + ", " + city;
  var url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetcity;
$greeting.text("you are living the above address at " + streetcity);
//AIzaSyAHtHt2euQoAgAC6kDU_NqYyLgtY0AItqI
bod.append("<img id='bgimg' src='"+url+"' />");

/*var NYTurl = "https://api.nytimes.com/svc/topstories/v2/home.json";
NYTurl += '?' + $.param({
  'api-key': "2fd02aac6ae941b3ac05ccc42e26c25a",
  'location': "'"+ streetcity + "'",
});*/

var NYTimeurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
NYTimeurl += '?q=' + city +'&sort=newest&api-key=2fd02aac6ae941b3ac05ccc42e26c25a';

var jsxhr = $.getJSON(NYTimeurl,function( data ) {
    $nytHeaderElem.text("New York Times Articles about " + city);
  var articles = data.response.docs;
  for(i=0;i<articles.length;i++)
  {
    var article = articles[i];
    $nytElem.append("<li class='article'> <a href='" +article.web_url+"'>" +
  article.headline.main + "</a> <p>" + article.snippet + "</p> </li>");
}
  /*$.each( data.response.docs, function( key, val ) {
    items.push( "<li id='" + key + "'><a href='" + val.web_url +"'>" + val.headline.main + "</a></li>" );


  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#nytimes-articles" ); */
})
.fail(function(){
    $nytHeaderElem.text("New York Times Articles about failed. " + city + " Sorry about that try again ");
});


var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=jason&callback=wikiCallback'

/*$.ajax({
  url: wikiUrl,
  dataType: "jsonp",
  contentType: "application/json; charset=utf-8",
  success: function (response) {
    var articleList = response[1];
    console.log(articleList);
  }
});*/





    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            var details = data[1];
            var info = data[2];
            var urls = data[3];
            for (i=0;i<details.length;i++)
            {
                $wikiElem.append("<li> <a href=" + urls[i] +">" + details[i] + "</a> <p>" + info[i] + "</p></li>");
            }
        },
        error: function (errorMessage) {
            $wikiElem.append("<li> Something wrong calling api </li>");
        }
    });




    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
