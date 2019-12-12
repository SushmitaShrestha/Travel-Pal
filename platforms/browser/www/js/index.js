/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {


                //function is called when app starts and getting the location of app
                getLocation();
        
                //FUNCTION IS CALLED HERE when the app is ready to start crete the file
               tryingFile();
               
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




//global varaible assing to store the rate 
var rate;

//global varaible assing to store the country
var country;

//global varaible assing to store the city
var city;

    // ===================GOOGLE MAAPS FUCNTION=======================


    // Current Location taken function
    function getLocation(){
        navigator.geolocation.getCurrentPosition(geoCallback, onError)
    }

    
    function geoCallback(position){
    //savig the lat and lat of curret location in new Variables
    var latnew = position.coords.latitude;
    var lngnew = position.coords.longitude;


    //calling the update map function and passing the latitute and longitute
    updateMap(latnew, lngnew);

    //calling the openCage function and passing the latitute and longitute
    opneCage(latnew, lngnew);

    document.getElementById('geo').innerHTML =
             "<br>"+ 'Latitude: '          + position.coords.latitude          + '<br>' +  
             "<br>"+'Longitude: '         + position.coords.longitude         + '<br>' +
             "<br>"+'Altitude: '          + position.coords.altitude          + '<br>' + "<br>";
    
    
            }

    function onError(message){
        
        console.log(message);

    }

    function initMap() {
        var uluru = {lat: -25.363, lng: 131.044}; 
        var uluru1 = {lat: -23.699, lng: 133.871}; 
        // var uluru2 = updateMap();
        
        var map = new
        google.maps.Map(document.getElementById('map'),
         { zoom: 4,
                           center: uluru,uluru1,
                         },
                         
                       );
                       var marker = new google.maps.Marker({
                           position: uluru,
        map: map });
        var marker1 = new google.maps.Marker({
            position: uluru1,
map: map });

            var marker2 = new google.maps.Marker({
                position: uluru1,
            map: map });

        }
        
        function updateMap(lat, lng){
            var point = {lat: lat, lng: lng};  
            
            var map = new
            google.maps.Map(document.getElementById('map'),
            { zoom: 14,
                center: point
            });
            var marker = new google.maps.Marker({
                position: point,
            map: map });

        }

// =================== SAVING THE DATA INTO THE TEXT FILE SAVE=======================


// To access create/open a file, the first step is to request access to the file system

function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){
    // Displaying result in the console
    console.log('file system open: ' + fs.name);

    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}


var fileSystemOptionals = { create: true, exclusive: false };

//assign as Global varaible to acces in other functions
var fileEntryGlobal;
function getFileCallback(fileEntry){
    // Display in the console
    console.log("fileEntry is file?" + fileEntry.isFile.toString());
    fileEntryGlobal = fileEntry;
    
}

// Let's write some files
function writeFile() {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        //Readfile fucntion is called so the file which is already wrote and save these values will go after that.
        readFile();

        //this array object is showing variable is taken and save in object.
        var dataObj = new Blob([retrievedDataGlobal,'Country is ',country,', City is ',city,', Currency in ',currency, ', ',displayweathermain,'<br>'], { type: 'text/plain' });
        

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

//assign golbal variable to retrieve data.
var retrievedDataGlobal;
// Let's read some files
function readFile() {

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {
            retrievedDataGlobal = this.result;
            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);

        };

    }, onError);
}

//this function retrieving the save data.
function retrieveData(){
    readFile();
    setTimeout(function () {
        document.getElementById("retrieveData").innerHTML= retrievedDataGlobal
    }, 3000);
}

// =================== GeoLocation API/ LAT, LNG TO COUNTRY CITY NAME CODES =======================


function opneCage(lat,lng){

    var http = new XMLHttpRequest();
    
    //passed parameters in API for Latiture and Longitude for Geolocation
    const mySuperUrl =
    'https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+lng+'&key=48e78ce2c493405282078179380985d9&language=en&pretty=1';
    http.open("GET", mySuperUrl);
    http.send();
    
    http.onreadystatechange = (e) => {
        var response = http.responseText
        var responseJSON = JSON.parse(response);
        
        //variable of country parsing the data from api getting country
         country = responseJSON.results[0].components.country;
        console.log(country);

        //variable of city  parsing the data from api getting city
         city = responseJSON.results[0].components.city;
        console.log(city);

        //variable of curreny parsing the data from api getting currecy code.
        currency = responseJSON.results[0].annotations.currency.iso_code;
        console.log(currency);


        //calling conversion rate function here can passing the parameter or currency.
        getConversionRate(currency);

        //calling weather API here
        weatherApi();

        }

}


// =================== Currency Conversion Getting Codes =======================


function getConversionRate(currency){

    // var result = ""; //TO show the result
    var text = ""; //to store the user input amount
    
   var http = new XMLHttpRequest();
   //get  the data from Api
   http.open("GET", 'http://apilayer.net/api/live?access_key=bffef61329e7158c163c05c247224e03&currencies='+currency+'&source=USD&format=1');
   http.send();
   
   
   http.onreadystatechange = (e) => {
       
       //saving all the response in of api in var responce 
       var response = http.responseText   
       
       //pasrsing it into JSON
       var responseJSON = JSON.parse(response); 
       
       //storing the quotes (object )in  var keys
       var data = responseJSON.quotes; 
       console.log(data);
       
       //saving the currency coming from api in to ratelabel varaible and concatenate with USD.
       var rateLabel = "USD"+currency;
       //console.log(rateLabel);
       rate = data[rateLabel];

    //    twoDigits = rate.toFixed(2);
      
        
   }

}

// =================== Convert User Input into Current County Currency =======================

function convert(){

    //Storing the user input in a variable
    var text = document.getElementById('amount').value; 

    //doing the converion  Local Currency to USD dollar. using toFixed(2) method for 2 digits after .
    var result =text+ " USD is equaivalent to " + text * rate.toFixed(2)+" "+currency;
    
    document.getElementById('result').innerHTML = result; //shows the conversion

    console.log(result);

}

// =================== Convert Current County Currency into USD =======================

function convert2(){
    

    //Storing the user input in a variable
    var text = document.getElementById('amount').value;  

    //doing the converion USD dollar to Local Currency using toFixed(2) method for 2 digits after .
    var result = text+ " " +currency+" is equaivalent to " + text/rate.toFixed(2)  +" USD";

    //shows the conversion in frontEnd
    document.getElementById('result').innerHTML = result ; 

    //priting in console
    console.log(result);
}

var displayweathermain;

// ============================= WEATHER API CALLING  =================================================

function weatherApi(){


    // I Lives in Dublin24 so My current location is showing Dublin 24 so I use this substring 
    // to pas the location
    // as a newcity variable which only uses first 6 digits of Data coming from API.
    //In college the current Location Shows DUBLIN so i use only city varable.
    var newcity = city.substring(0, 6);


var http = new XMLHttpRequest();
const url =
'https://api.openweathermap.org/data/2.5/weather?q='+newcity+','+country+'&appid=63ae6aa691da1be6525e1bf3cc96d87a';

http.open("GET", url);
http.send();

http.onreadystatechange = (e) => {
    var response = http.responseText
    var responseJSON = JSON.parse(response);
    
    // var weather = responseJSON.weather[0].main;

    //getting the weather array and take the [0] object from array from API data
    var weathermain = responseJSON.weather[0].main;
    var weatherDescription = responseJSON.weather[0].description;
    
    //getting the termprature Object from Api data
    var temprature = responseJSON.main.temp;

    // assigned variable for Celsius
    var celsius = 273.15;

    //Converting the KELVIN data coming from Api into Celsius 
    var actual_Description = temprature - celsius;
    
    //gettign the variable in 2 digits
    var n = actual_Description.toFixed(2);

    //getting Sunrise timing from Api
    var sunrise = responseJSON.sys.sunrise;
    
    //Converting Sunrise Timing in (GREENWICh MEAN TIME)
    var sunriseConvert = new Date(0);
    sunriseConvert.setUTCSeconds(sunrise);

    //getting sunset timing from Api
    var sunset = responseJSON.sys.sunset;
    
    //Converting Sunrise Timing in (GREENWICh MEAN TIME)
    var sunsetConvert = new Date(0);
    sunsetConvert.setUTCSeconds(sunset);

    //this variable holds the data of sunrise and along with the city name
    var displaysunrise = " Sun Rises in "+city+" on "+ sunriseConvert +"<br>";

    //this variable holds the data of sunrset and along with the city name
    var displaysunset = " Sun Sets in "+city+" on "+ sunsetConvert + "<br>";

    //this variable holds the data of Main Weather  and along with the city anem
    displayweathermain = " Over All Weather of "+city+" is "+ weathermain +'<br>';

    //this variable holds the data of Weatehr Description and along with the city name
    var displayweatherdescription = "Weather Description of "+city+ " is "+weatherDescription + "<br>";

    //this variable holds the data of temperature in Celsius (with 2 digits after) and along with the city name
    var displayactual_Description = "Current Temprature of the "+city+" is "+n+" ˚C"+"<br>";



    // shows all the value in console

    console.log("This is Showing the the Timing in Greenwich of Sun Rise "+sunrise);
    console.log("This is Showing the the Timing in Greenwich of Sun Set"+sunset);
    console.log("This is showing Main weather "+weathermain);
    console.log("This is the weather Description "+weatherDescription);
    console.log("This is showing the Temprature "+temprature);
    console.log("Celsius "+n);

    
    // displaying all the information into the FrontEnd

    //displaying main wather
    document.getElementById('weathermain').innerHTML = displayweathermain;

    //displaying  wather with detail (For example cloudy, brokenn cloud, light rain)
    document.getElementById('weatherDescription').innerHTML = displayweatherdescription;

    //displaying temperature in celsius
    document.getElementById('temperature_in_Celsius').innerHTML = displayactual_Description;

    //displaying the sunrise timing
    document.getElementById('sunrise').innerHTML = displaysunrise;

    //displaying the sunset timing 
    document.getElementById('sunset').innerHTML = displaysunset;


    //displaying the name in the very top of the application
    document.getElementById('country').innerHTML = country  ; 
    document.getElementById('city').innerHTML = city  ; 
    
    
    }

}




