import { useState } from "react";

function Practice() {
  const dailytemp= ["1","2","3","4","5","6","7","8","9","10","11","12"]
  const weeklytemp=["13","14","15","16","17","18","19","20","21","22","23","24"]
  const[view,setview]=useState("daily")
  const[temp,settemp]=useState(dailytemp)
  const[nextSixDays,setnextSixDays]=useState(false)
  
  
function handleOptionChange(event)   //event handler for changing option of dropdown menu
{
const value=event.target.value
if (value==="daily"){
  setview("daily")
  settemp(dailytemp)
}
else if(value ==="weekly"){
  setview("weekly")
  settemp(weeklytemp)
}
}

function handleForwardButton()    
{
  console.log('button pressed')
  setnextSixDays(prevState=>!prevState)
 
}
const temptoDisplay=nextSixDays
?temp.slice(-6)  
:temp.slice(0,6);

  
//create dropdown menu and call event handler to change value of dropdown menu and array
return(
  <div>  
  <select value={view} onChange={handleOptionChange}> 
    <option value='daily'>daily</option>
    <option value="weekly">Weekly</option>
   
  </select>
  
    <img src="b.png" alt='forwardbutton' onClick={handleForwardButton}></img>
    {temptoDisplay.map((temp,index)=>(   //runs everytime when value of array changes if array is weekly display it if hourly
      <p key={index}>{temp}</p>

    ))}
  </div>
  
);
    }
  
  export default Practice;