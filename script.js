var cities = [];

      // check if the localSotrage exists to bring list of cities
      if(localStorage.getItem("citiesList") !== null){
          cities = JSON.parse(localStorage.citiesList);
          document.querySelector('#citiesList').innerHTML = "";
          for(i=0; i<cities.length; i++)
          {
            document.querySelector('#citiesList').innerHTML += `<li class="list-group-item">${cities[i]}</li>`;
            console.log(`${cities[i]}`)
          }
      }


      // function to use the API and get lon & lat by the name of city
     async function getCity(){

        var city = document.querySelector('#txtCity').value;
        // checks if the user entered empty string
        if(city.length !== 0){
        // the following two lines to make the upper and lower dashboard visible 
        document.querySelector('#upperDash').classList.remove('d-none');
        document.querySelector('#lowerDash').classList.remove('d-none');
        
        var cityApi = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=c18d1c67b725426cb4da6690f0f0a919`).then( r=>r.json() )
        var cityLon = cityApi.coord.lon;
        var cityLat = cityApi.coord.lat;
        getCityData(cityLon, cityLat);
        cities.push(city);
        addCity();
        }
        // console.log(city);
      }

      // function to use one API call to get all necessary data after obtaining lat and lon 
      async function getCityData(lon, lat){
          var cityDataApi = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=c18d1c67b725426cb4da6690f0f0a919`).then( r=>r.json() )
          console.log(cityDataApi)
          console.log(`Temperature = ${cityDataApi.current.temp}`)
          console.log(`Humidity = ${cityDataApi.current.humidity}`)
          console.log(`Wind speed = ${cityDataApi.current.wind_speed}`)
          console.log(`UV index = ${cityDataApi.current.uvi}`)
          console.log(`icon = ${cityDataApi.current.weather[0].icon}`)

          var temperature = cityDataApi.current.temp;
          var humadity = cityDataApi.current.humidity;
          var windSpeed = cityDataApi.current.wind_speed;
          var uvIndex = cityDataApi.current.uvi;
          var icon = cityDataApi.current.weather[0].icon;

          if(uvIndex >= 0 && uvIndex <= 2){
              document.querySelector('#UVIndex').style.backgroundColor = "green";
              document.querySelector('#UVIndex').style.color = "white";
          }
          else if(uvIndex >= 3 && uvIndex <= 5){
              document.querySelector('#UVIndex').style.backgroundColor = "yellow";
              document.querySelector('#UVIndex').style.color = "black";
          }
          else if(uvIndex >= 6 && uvIndex <= 7){
              document.querySelector('#UVIndex').style.backgroundColor = "orange";
          }
          else if(uvIndex >= 11 && uvIndex <= 10){
              document.querySelector('#UVIndex').style.backgroundColor = "red";
              document.querySelector('#UVIndex').style.color = "white";
          }
          else if(uvIndex >= 11){
              document.querySelector('#UVIndex').style.backgroundColor = "purple";
          }

          var dayOneForecast = {dateOne: moment().add(1,'days').format('MMMM Do YYYY'),
                        temp: cityDataApi.daily[1].temp.day,
                        humi: cityDataApi.daily[1].humidity,
                        icon: cityDataApi.daily[1].weather[0].icon
                    }
        
            var dayTwoForecast = {dateTwo: moment().add(2,'days').format('MMMM Do YYYY'),
                        temp: cityDataApi.daily[2].temp.day,
                        humi: cityDataApi.daily[2].humidity,
                        icon: cityDataApi.daily[2].weather[0].icon
                    }
            
            var dayThreeForecast = {dateThree: moment().add(3,'days').format('MMMM Do YYYY'),
                temp: cityDataApi.daily[3].temp.day,
                humi: cityDataApi.daily[3].humidity,
                icon: cityDataApi.daily[3].weather[0].icon
            }

            var dayFourForecast = {dateFour: moment().add(4,'days').format('MMMM Do YYYY'),
                temp: cityDataApi.daily[4].temp.day,
                humi: cityDataApi.daily[4].humidity,
                icon: cityDataApi.daily[4].weather[0].icon
            }

            var dayFiveForecast = {dateFive: moment().add(5,'days').format('MMMM Do YYYY'),
                temp: cityDataApi.daily[5].temp.day,
                humi: cityDataApi.daily[5].humidity,
                icon: cityDataApi.daily[5].weather[0].icon
            }

          showMainData(temperature, humadity,windSpeed, uvIndex, icon)

          dayOne(dayOneForecast.dateOne, `http://openweathermap.org/img/wn/${dayOneForecast.icon}.png`, dayOneForecast.temp, dayOneForecast.humi)

          dayTwo(dayTwoForecast.dateTwo, `http://openweathermap.org/img/wn/${dayTwoForecast.icon}.png`, dayTwoForecast.temp, dayTwoForecast.humi)

          dayThree(dayThreeForecast.dateThree, `http://openweathermap.org/img/wn/${dayThreeForecast.icon}.png`, dayThreeForecast.temp, dayThreeForecast.humi)

          dayFour(dayFourForecast.dateFour, `http://openweathermap.org/img/wn/${dayFourForecast.icon}.png`, dayFourForecast.temp, dayFourForecast.humi)

          dayFive(dayFiveForecast.dateFive, `http://openweathermap.org/img/wn/${dayFiveForecast.icon}.png`, dayFiveForecast.temp, dayFiveForecast.humi)

        }

     // functions to display the data on the page
      function showMainData(temp, hum, wind, uv, icon){

        var userCity = document.querySelector('#txtCity').value;

        var dateNow = moment().format('MMMM Do YYYY');
        document.querySelector('#dateNow').innerHTML = dateNow;

        document.querySelector('#cityName').innerHTML = userCity;
        document.querySelector('#temperature').innerHTML = temp
        document.querySelector('#humidity').innerHTML = hum
        document.querySelector('#windSpeed').innerHTML = wind
        document.querySelector('#UVIndex').innerHTML = uv
        document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${icon}.png`

      }

      function dayOne(dateDayOne, icon, temp, humi){
      document.querySelector('#dateOne').innerHTML = dateDayOne;
      document.querySelector('#iconOne').src = icon;
      document.querySelector('#tempOne').innerHTML = temp;
      document.querySelector('#humiOne').innerHTML = humi;
      }

      function dayTwo(dateDayTwo, icon, temp, humi){
      document.querySelector('#dateTwo').innerHTML = dateDayTwo;
      document.querySelector('#iconTwo').src = icon;
      document.querySelector('#tempTwo').innerHTML = temp;
      document.querySelector('#humiTwo').innerHTML = humi;
      }

      function dayThree(dateDayThree, icon, temp, humi){
      document.querySelector('#dateThree').innerHTML = dateDayThree;
      document.querySelector('#iconThree').src = icon;
      document.querySelector('#tempThree').innerHTML = temp;
      document.querySelector('#humiThree').innerHTML = humi;
      }

      function dayFour(dateDayFour, icon, temp, humi){
      document.querySelector('#dateFour').innerHTML = dateDayFour;
      document.querySelector('#iconFour').src = icon;
      document.querySelector('#tempFour').innerHTML = temp;
      document.querySelector('#humiFour').innerHTML = humi;
      }

      function dayFive(dateDayFive, icon, temp, humi){
      document.querySelector('#dateFive').innerHTML = dateDayFive;
      document.querySelector('#iconFive').src = icon;
      document.querySelector('#tempFive').innerHTML = temp;
      document.querySelector('#humiFive').innerHTML = humi;
      }

      // add searched cities to the list 
      function addCity(){
          document.querySelector('#citiesList').innerHTML = "";
          for(i=0; i<cities.length; i++)
          {
            document.querySelector('#citiesList').innerHTML += `<li class="list-group-item" onclick=showCityInfoFromList(event)>${cities[i]}</li>`;
            console.log(`${cities[i]}`)
          }
          localStorage.setItem("citiesList", JSON.stringify(cities));
          console.log("local storage is "+localStorage.citiesList)
          
      }

      // this function show information about a city from the localStored list when clicked 
      async function showCityInfoFromList(event){
        event.preventDefault();
        // the following two lines to make the upper and lower dashboard visible 
        document.querySelector('#upperDash').classList.remove('d-none');
        document.querySelector('#lowerDash').classList.remove('d-none');

        var city = event.target.innerHTML;
        document.querySelector('#txtCity').value = city
        document.querySelector('#cityName').innerHTML = city
        var cityApi = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=c18d1c67b725426cb4da6690f0f0a919`).then( r=>r.json() )
        var cityLon = cityApi.coord.lon;
        var cityLat = cityApi.coord.lat;
        getCityData(cityLon, cityLat);
        
      }