import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"


const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    }
  const search = async (city) =>{
    if(city===""){
      alert("Enter City Name");
      return;
    }
    try {

      const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;


      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const iconCode = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temprature:Math.floor(data.main.temp),
        location:data.name,
        icon: iconCode, 
        
      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data")
    }
    inputref.current.value = "";
  }

  useEffect(()=>{
    search("faisalabad");
  },[] )

  const inputref = useRef();

 
  return (
    <div className='font-poppins  '>
      <div className='weather p-10 rounded-lg'>
        <div  className="search-bar flex gap-3 text-black">

        
        <input ref={inputref} 
        className='rounded-3xl py-3 px-4 border-none outline-none text-base' type="text" 
        placeholder='Enter Your City' 
        onKeyDown={(event)=>{
          if (event.key==='Enter') {
            search(inputref.current.value);
          }
        }}/>
        <img className='w-[50px] p-[15px] rounded-full bg-[#ebfffc] cursor-pointer' src={search_icon} alt="Search icon" onClick={()=>{
          search(inputref.current.value);
        }}/>
      </div>

      {weatherData?<>
        <img className='mx-auto my-[50px]' src={weatherData.icon} alt="clear_icon" />
      <div className='text-center text-white '>
      <p className='text-[80px]'> {weatherData.temprature}°C</p>
      <p className='text-[40px]'>{weatherData.location}</p>
      </div>

      <div className='grid grid-cols-2   gap-5 w-full mt-7 text-white'>

        <div className=' flex gap-3 items-start'>
          <img className='w-[26px] mt-2'  src={humidity_icon} alt=" Humidity icon" />
          <div>
          <p>{weatherData.humidity}</p>
          <span className='text-[16px]'>Humidity</span>
          </div>
        </div>

        <div  className='flex  gap-3 items-start'>
           <img className='w-[26px] mt-2' src={wind_icon} alt="" />
           <div>
           <p className=''>{weatherData.windSpeed}km/h</p>
           <span className='text-[16px]'>Wind Speed</span>
           </div>
        </div>
      </div>
      </>:<></>}
      

    </div>
  </div>
  )
}
export default Weather