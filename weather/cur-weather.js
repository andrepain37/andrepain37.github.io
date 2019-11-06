let date = new Date();
let responceNearby;
let day, resp;
$('.weather_info > .text-info > span').text(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);


function msToTime(t, utc) {
    let dt = new Date(utc * 1000 + t*1000),

    hr = dt.getUTCHours();
    m = "0" + dt.getUTCMinutes();
    return hr + ':' + m.substr(-2);  
  }
function whatDay(d){
    switch(d){
        case 0: 
            d = 'SUN';
            break;
        case 1: 
            d = 'MON';
            break;
        case 2: 
            d = 'TUE';
            break;
        case 3: 
            d = 'WED';
            break;
        case 4: 
            d = 'TUS';
            break;
        case 5: 
            d = 'FRD';
            break;
        case 6: 
            d = 'SAT';
            break;
        default:
            d = 'Undefined date!';
    } 
    return d;
}
function whatMonth(m){
    switch(m){
        case 0: 
            m = 'Jan';
            break;
        case 1: 
            m = 'Feb';
            break;
        case 2: 
            m = 'Mar';
            break;
        case 3: 
            m = 'Apr';
            break;
        case 4: 
            m = 'May';
            break;
        case 5: 
            m = 'Jun';
            break;
        case 6: 
            m = 'Jul';
            break;
        case 7: 
            m = 'Aug';
            break;
        case 8: 
            m = 'Sept';
            break;
        case 9: 
            m = 'Oct';
            break;
        case 10: 
            m = 'Nov';
            break;
        case 11: 
            m = 'Dec';
            break;
        default:
            m = 'Undefined date!';
    } 
    return m;
}    
function deg(g){
    if (g <= 360 && g == 0) {
        return g = 'N';
    }
    if(g < 22.5 && g > 0) {
        return g = 'NNE';
    } 
    if(g <= 45  && g > 22.5){
        return g = 'NE';
    }
    if(g <= 67.5 && g > 45){
        return g = 'ENE';
    }
    if(g <= 90 && g > 67.5){
        return g = 'E';
    }
    if(g <= 112.3 && g > 90){
        return g = 'ESE';
    }
    if(g <= 135 && g > 112.3){
        return g = 'SE';
    }
    if(g <= 157.3 && g > 135){
        return g = 'SSE';
    }
    if(g <= 180 && g > 157.3){
        return g = 'S';
    }
    if(g <= 202.3 && g > 180){
        return g = 'SSW';
    }
    if(g <= 225 && g > 202.3){
        return g = 'SW';
    }
    if(g <= 247.3 && g > 225){
        return g = 'WSW';
    }
    if(g <= 270 && g > 247.3){
        return g = 'W';
    }
    if(g <= 292.3 && g > 270){
        return g = 'WWW';
    }
    if( g <= 315 && g > 292.3){
        return g = 'NW';
    }
    if( g <= 359 && g > 315){
        return g = 'NNW';
    }
    return g = 'Undefined date!';

}   
function hourlyF(qu){
    for (let i = 0; i < qu; i++) {
        $('.hourlyW').append(`<td>${responceNearby.list[i].dt_txt.split(' ')[1]}</td>`);
        
    }
}
function iconF(qu) {
    for (let i = 0; i < qu; i++) {
        $('.iconW').append(`<td><img src="${icon + responceNearby.list[i].weather[0].icon}.png" alt="${responceNearby.list[i].weather[0].description}"></td>`);
        
    }
}
function forecastF(qu) {
    for (let i = 0; i < qu; i++) {

        $('.forecastW').append(`<td>${responceNearby.list[i].weather[0].description}</td>`);
        
    }
}
function tempF(qu) {
    for (let i = 0; i < qu; i++) {

        $('.tempW').append(`<td>${Math.round(responceNearby.list[i].main.temp)}<sup>o</sup></td>`);
        
    }
}
function windF(qu) {
    for (let i = 0; i < qu; i++) {

        $('.windW').append(`<td>${Math.round(responceNearby.list[i].wind.speed)} ${deg(Math.round(responceNearby.list[i].wind.deg))}</td>`);
        
    }
}
//API
function ip() {
    $.getJSON("http://ip-api.com/json/", function(e) {
        $('#textT').attr('value', e.city);
        return getWeather();
    });
}
const appId = 'appid=c85b6945cefa8e370bc87be9fc4fa5a9';
const icon = 'http://openweathermap.org/img/wn/';
function getWeather(){

    let city = $('#textT').val();
    
    
    $(".toogle_main").ajaxSend().css('display', 'none');
    $("body").ajaxSend().append(`<div class="banter-loader">
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
  </div>`);
    //CURRENT WEATHER
    $.ajax({
        type: 'post',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&${appId}&units=metric`,
        data: '',
        success: function (responce) {
            $(".toogle_main").css('display', 'block');
            $(".banter-loader").remove();
            $(".not_found").remove();
            console.log(responce);
            $(`.current-weather`).empty()
            .append(`<div class="icon-weather"><img src="${icon + responce.list[0].weather[0].icon}.png" alt="${responce.list[0].weather[0].description}.png" />
            <span>${responce.list[0].weather[0].description}</span>
            </div>`)
            .append(`<div class="temp-weather"><p>${Math.round((responce.list[0].main.temp))}<sup>o</sup>C</p></div>`)
            .append(`<div class="time-weather">
             <div class="sunrise"><h5>Sunrise:</h5><span>${msToTime(responce.city.sunrise, responce.city.timezone)}</span></div>
             <div class="sunset"><h5>Sunset:</h5> <span>${msToTime(responce.city.sunset, responce.city.timezone)}</span></div>
             <div class="sunset"><h5>Duration:</h5> <span>
             ${msToTime(responce.city.sunset - responce.city.sunrise, 0)}</time></div>
            </div>`);

            responceNearby = responce;
            $(`.hourly-weather`).empty()
            .append(`<table class="table table-hover">
                <tbody>
                    <tr class="hourlyW">
                        <td>TODAY</td>
                    </tr>
                    <tr class="iconW"> 
                        <td></td>
                    </tr>
                    <tr class="forecastW">
                        <td>Forecast</td>
                    </tr>
                    <tr class="tempW">
                        <td>Temp(<sup>o</sup>C)</td>
                    </tr>
                    <tr class="windW">
                        <td>Wind(km/h)</td>            
                    </tr>
                </tbody>
            </table>`);
            hourlyF(5);
            iconF(5);
            forecastF(5);
            tempF(5);
            windF(5);
            $.ajax({
                type: 'post',
                url: `https://api.openweathermap.org/data/2.5/find?lat=${responceNearby.city.coord.lat}&lon=${responceNearby.city.coord.lon}&${appId}&units=metric`,
                data: '',
                success: function (responce) {
                    console.log(responce);
                    $(`.nearby-weather`).empty().append(`
                    <div class="col-12 cities">    
                        <div class="col-6">
                            <h5>${responce.list[1].name}</h5>
                            <img src="${icon + responce.list[1].weather[0].icon}.png" alt="${responce.list[1].weather[0].description}">
                            <span class="temp_nearby">
                                ${Math.round(responce.list[1].main.temp)}<sup>o</sup>C
                            </span>
                        </div>
                        <div class="col-6">
                            <h5>${responce.list[2].name}</h5>
                            <img src="${icon + responce.list[2].weather[0].icon}.png" alt="${responce.list[2].weather[0].description}">
                            <span class="temp_nearby">
                                ${Math.round(responce.list[2].main.temp)}<sup>o</sup>C
                            </span>
                        </div>
                    </div>
                    <div class="col-12 cities">    
                        <div class="col-6">
                            <h5>${responce.list[3].name}</h5>
                            <img src="${icon + responce.list[3].weather[0].icon}.png" alt="${responce.list[3].weather[0].description}">
                            <span class="temp_nearby">
                                ${Math.round(responce.list[3].main.temp)}<sup>o</sup>C
                            </span>
                        </div>
                        <div class="col-6">
                            <h5>${responce.list[4].name}</h5>
                            <img src="${icon + responce.list[4].weather[0].icon}.png" alt="${responce.list[4].weather[0].description}">
                            <span class="temp_nearby">
                                ${Math.round(responce.list[4].main.temp)}<sup>o</sup>C
                            </span>
                        </div>
                    </div>
                    `);
                }
            });
            //CURRENT WEATHER END
            //5DAYS
            $(`.days-weather`).empty();
            for(let i = 0; i < responceNearby.list.length; i = i + 8){
                let dates = new Date(responceNearby.list[i].dt_txt);
                day = new Date(responceNearby.list[i].dt_txt).getDay();
                let dayOfMonth = dates.getDate();
                let month = dates.getMonth();
                if (i == 0) {
                    day = 'TONIGHT';
                } else {
                    day = whatDay(day);
                }
                $(`.days-weather`).append(`<div class="one-day">
                    <h4>${day}</h4>
                    <span>${dayOfMonth} ${whatMonth(month)}</span>
                    <img src="${icon + responceNearby.list[i].weather[0].icon}.png" alt="${responce.list[i].weather[0].description}" />
                    <span class="temp">${Math.round(responceNearby.list[i].main.temp)}<sup>o</sup>C</span>
                    <span>${responceNearby.list[i].weather[0].main}, ${responceNearby.list[i].weather[0].description}</span>
                </div>`);
            }
            
            



            //5DAYS END
        },
        error: function (responce) {
            resp = responce;
            console.log(resp.responseJSON.cod);
            $(".banter-loader").remove();
            $('.not_found').remove();
            if(resp.responseJSON.cod == 404){
                $(`.toogle_main`).after(`<div class="not_found col-12"><img class="img-fluid" src="https://png.pngtree.com/png-vector/20190130/ourlarge/pngtree-cartoon-404-error-page-word-art-page-404-error-png-image_638906.jpg" alt="Sorry"/><p>Sorry, but ${resp.responseJSON.message}</p></div>`);
            }else{
                $(`.toogle_main`).after('<div class="not_found col-12"><p>Sorry, but the service is temporarily not working :(</p></div>');
            }

        }
    });
    


}
$(`#cForm`).on(`submit`, function(e){
    e.preventDefault();
    getWeather();
});


$( document ).ready(function() {

ip();
   
});