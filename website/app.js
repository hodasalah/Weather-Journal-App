/* Global Variables */


let button=document.getElementById('generate');
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
let apiKey = '8c91a0b3e84680fed0962438f6db098c';
let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Our Event Listener
document.getElementById('generate').addEventListener('click', processAction);
function processAction(e){
	let zip=document.getElementById('zip').value;
	let userResponse=document.getElementById('feelings').value;
	getWeather(baseURL,zip,apiKey)
	.then(function(data){
		console.log(data);
		postData('/add',{temperature:data.main.temp,date:newDate,userResponse:userResponse});
		updateUI();
	});
}
const getWeather = async(baseURL , zip , apiKey)=>{
	const response = await fetch(baseURL+zip+'&appid='+apiKey);
	try{
		const data= await response.json();
		console.log(data);
		return data;
	}catch(err){
		console.log('error',err);
	}
}
const postData = async (url='',data=[])=>{
	console.log(data)
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin',
		headers: {
				'Content-Type': 'application/json',
		},
	 // Body data type must match "Content-Type" header        
		body: JSON.stringify(data), 
	});
	try {
		const resData = await response.json();
		console.log(resData)
		return data.push(resData);
	}catch(error) {
		console.log("error", error);
	}
}

const updateUI = async () => {
	
  const request = await fetch('/all');
  try{
		const allData = await request.json();
		console.log(allData.newData)
    date.innerHTML = `<span> Date:</span> ${allData.newData.date}`;
    temp.innerHTML = `<span>Temperature:</span> ${allData.newData.temperature}`;
    content.innerHTML =`<span>Your Response:</span> ${allData.newData.userResponse}`;

  }catch(error){
    console.log("error", error);
  }
}

