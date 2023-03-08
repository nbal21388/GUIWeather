import axios from 'axios';
import { useState, useEffect } from 'react';
import Displayinfo from './Displayinfo';

function Apirequest() {
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherObject,setWeatherObject]= useState(null) //create object to hold weather info like temp,pressure,humidity
  const[tempByHours,settempByHours]=useState([]);  // have array to store temp for next 12 hours
  const[tempByDays,settempByDays]= useState([])    // have array to store temp for next 12 days

  useEffect(() => {    //get users current location and assign it to latitude and latitude variables
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (latitude && longitude) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f61b20729a454ac52551faa227deac9f&units=metric`);
        const sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const currentTime = new Date().toLocaleString();
        
        const weatherData = { 
          locationName: response.data.name,
          weatherDescription: response.data.weather[0].description,
          Temperature: response.data.main.temp,
          WindSpeed: response.data.wind.speed,
          Rainfall: response.data.rain ? response.data.rain["1h"]:"0",
          Snow: response.data.snow ? response.data.snow["1h"]:"0",
          Visibility: response.data.visibility,
          Humidity:response.data.main.humidity,
          Pressure:response.data.main.pressure,
          Sunrise:sunrise,
          Sunset:sunset,
          currentTime:currentTime
         
        
        };
  
        setWeatherObject(weatherData);
      }
    };
    fetchData();
  }, [latitude, longitude]);

  
               
    
 return (
    <div>
      {weatherObject &&<Displayinfo weatherData={weatherObject} />}
     </div>
        );
    }


  
    

export default Apirequest;

