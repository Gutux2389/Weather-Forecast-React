import React,{useState,useEffect,useMemo} from 'react';
import card from './App.css'

function App() {
  const MainCard = ({name,celcius,condition}) =>{
    const icon = 'https:' +condition.icon;
    const text = condition.text;
    return(
      <div style={{height: 400,width:600,borderRadius: 15,display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',margin: 'auto',backgroundColor: 'grey'}}>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        <img src={icon} style={{display: 'inline-block',height:200,weight:200}} />
        <div style={{display: 'inline-block'}}>
          <h3>Today</h3>
          <h1>{name}</h1>
          <h3>Temperature: {celcius}</h3>
          <h3>{text}</h3>
        </div>
      </div>
      </div>
    )
  }
  function getDayName(date = new Date(), locale = 'en-US') {
  return date.toLocaleDateString(locale, {weekday: 'long'});
}
  const SmallCard = ({date,avg_temp,icon}) =>{
    return(

      <div style={{display:'inline-block',width: 200,margin: 30}}>
              <div style={{display: 'inline-block'}}>
              <h3>{date}</h3>
              <img src={icon} style={{height:50,weight:50}} />
              <h3>{avg_temp}</h3>
              </div>
      </div>
    )
  }

  const [city,setCity] = useState();
  const [forecast,setForecast] = useState();
  const [name,setName] = useState();
  const [celcius,setCelcius] = useState();
  const [condition,setCondition] = useState([]);

  useEffect(()=>{
    if(city !=null){
    const getforecast = city.forecast.forecastday;
    const getname = city.location.name;
    const getcondition = city.current.condition;
    const getcelcius = city.current.temp_c;
    setForecast(getforecast)
    setName(getname);
    setCelcius(getcelcius);
    setCondition(getcondition);
    }
  },[city]);
  const weather = async (event)=>{
    event.preventDefault();
    const value = event.target.name.value;
  try{
    const api_data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8f4f972721f34262ab474618231506&q=${value}&days=5&aqi=no&alerts=no`).then(response => response.json());

    setCity(api_data);
    return true;
  }catch(err){
    throw 'require a city name'
  }

  }
  return(
    <>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form onSubmit={weather}>

      <input
      type='text'
      name="name"
      placeholder='Enter a city...'
      required/>

      <button>Click</button>
      </form>
    </div>
    <MainCard condition={condition} name={name} celcius={celcius}/>
    <div>
      {forecast != null ?
        forecast.map((day)=>{
        const smallicon = day.day.condition.icon;
        const daydate = day.date;
        const date = getDayName(new Date(daydate));
        const avg_temp = day.day.avgtemp_c;
        return(
        <SmallCard date={date} avg_temp={avg_temp} icon={smallicon}/>
        )
      }) : <p></p>}
    </div>
    <button onClick={()=>console.log(city)}></button>
    </>
  )
}
export default App;