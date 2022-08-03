
import { useEffect, useState } from "react"

import axios from 'axios';


const App = () =>{
const [countries, setCountries] = useState([])
const [filter, setFilter] = useState("")
const [temperature, setTemperature] = useState("")


useEffect (()=>{
  axios.get("https://restcountries.com/v3.1/all")
  .then(response =>{
    const responsedata= response.data
    let secondata= responsedata.map(data=> data.name.common)
    console.log(secondata);
    setCountries(responsedata)
    
  },[])
  

},[])
const APIKEY = '5b8c6f74f3b709d9d08b4f18924142e7'

useEffect (()=>{
  setFilter(filter)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Dakar&appid=${APIKEY}`)
  .then(response =>{
    console.log(response.data)
    setTemperature(response.data)
  })
}, [])


const countryName = temperature.name



// const degree = Math.floor((temperature.main.temp) - 273.15)
// console.log(degree)
// const wind = temperature.wind.speed
// console.log(wind)
// const icon = temperature.weather[0].icon
// console.log(icon);
// const convertedIcon =`http://openweathermap.org/img/wn/${icon}@2x.png`
// console.log(convertedIcon);





const pressme= (e)=>{
  // console.log(e.target.value)
  setFilter(e.target.value)
  

} 
const PressButton =(props)=>{
 
  return(
    <button value= {props.value} onClick={pressme}>Show</button>
  )
}



const ShowCountry = ({pays}) =>{

   if(pays.length > 10){

       return(       
    
    <h2>Too many matches, specify another filter</h2>
  )
       } else if(pays.length=== 1){
         const country=pays[0]
          return (
            <div>
            
              <h2>{country.name.common}</h2>
              <h2>Capital:</h2>
              <h4>{country.capital}</h4>
              <h2>Population:</h2>
              <h4>{country.population}</h4>
              <h2>Area:</h2>
              <h4>{country.area}</h4>
              <h2>Languages:</h2>
              <h4>
              <ul>
               <li key={country.name.common}>{Object.values(country.languages)}</li>
              </ul>
              </h4> 
              <img src={country.flags.png} alt={country.name.common}/>
               <h2>Weather in {country.capital}</h2>   
                   {/* <h3>Temperature {degree} ° celcius</h3>    */}
               {/* <h3>Wind {wind} m/s</h3>       */}
            </div>
          )
       } else{
         return pays.map(pay=><h4 key={pay.name.common}>{pay.name.common} &nbsp; &nbsp;<PressButton value={pay.name.common}/></h4> )
       }
      
 
   

}

const filterCountries = countries.filter(country=> country.name.common.toLowerCase().includes(filter.toLowerCase()))



const filterHandle=(e)=>{
  
  setFilter(e.target.value)
}
  
   return(
    <div>
      <h2>Find Contries <input value={filter} onChange={filterHandle}/></h2>

       <ShowCountry pays={filterCountries}  />
    </div>
   )
}


export default App;
