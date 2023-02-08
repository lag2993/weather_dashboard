let cityInput = document.getElementById('city-input');
let inputBtn = document.getElementById('input-button');
let city;
let forecastDisp = document.getElementById('forecastDisp');
const OwAPIkey = '826d8a208fd8e5348dd384837166fd54';

const ipGeoAPI_url = "https://api.geoapify.com/v1/ipinfo?&apiKey=ed917d605c814a68adc8a1a68d0a3c97";
// function

// Geoapify Ip Location

async function  IpGetLoc(url){
    const response = await fetch(url);
    const data = await response.json();
    // console.log("1st",data);
    const { location} = data;
    const {latitude,longitude} = location;
    const city = data.city.name;
    cityInput = document.getElementById('city-input');
    cityInput.placeholder = city;
    localStorage.setItem("City",city);
    localStorage.setItem("StartLatitude",latitude);
    localStorage.setItem("StartLongitude",longitude);
}
// Open Weather fetch Function

async function OwFetch(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log("2nd",data);
    let weatherData = [];
    for(let i=0;i<34;i+=8){
       let date = data.list[i].dt_txt;
       date =  date.split(" ");
       date = date[0];
       console.log(date); 
       let temp = data.list[i].main.temp;
       let fTemp = 1.8*(temp-273) + 32;
       let flTemp = data.list[i].main.feels_like;
       let fFlTemp = 1.8*(flTemp-273) + 32;
       let humd = data.list[i].main.humidity;
       let wndSpd = data.list[i].wind.speed;
       let icon = data.list[i].weather[0].icon;
       let iconUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
       let iconDesc = data.list[i].weather[0].description;
       weatherData[i] = [date,fTemp,fFlTemp,humd,wndSpd,iconUrl, iconDesc]; 
    }
    localStorage.setItem('WeatherData',JSON.stringify(weatherData));


}

// Create Cards Function


function dispForecast(obj,disp){
   for(let j =0;j<obj.length;j++){
    let wCard = document.createElement("div");
    console.log('hello');
    let pDate = document.createElement('h1');
    pDate.textContent = obj[j][0];
    wCard.append(pDate);
    let pTemp  =  document.createElement('p');
    pTemp.textContent = "Temp: "+obj[j][1];
    wCard.append(pTemp); 
    let pFlT  =  document.createElement('p');
    pFlT.textContent = "Feels Like: "+obj[j][2]; 
    wCard.append(pFlT); 
    let pHum  =  document.createElement('p');
    pHum.textContent = "Humidity: "+obj[j][3];
    wCard.append(pHum);  
    let pWndSp  =  document.createElement('p');
    pWndSp.textContent = "Wind Speed: "+obj[j][4];
    wCard.append(pWndSp);  
    let iconImg  =  document.createElement('img');
    iconImg.setAttribute('src',obj[j][5]);
    iconImg.setAttribute('alt',obj[j][6]);
    wCard.append(iconImg);
    disp.append(wCard);


   } 


}


IpGetLoc(ipGeoAPI_url);
inputBtn.addEventListener('click',{



})




city = localStorage.getItem('City');
let OwUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+OwAPIkey;
OwFetch(OwUrl);
let weatherData = localStorage.getItem('WeatherData');
weatherData = JSON.parse(weatherData);
console.log(weatherData.length);
let dispLoc = document.getElementById('forecastDisp')
dispForecast(weatherData,dispLoc);


