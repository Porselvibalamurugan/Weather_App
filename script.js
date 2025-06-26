let userLocation;
document.getElementById("getweather").addEventListener("click", () => {
  userLocation = document.getElementById("search").value.trim();
  if (userLocation) {
    fetchData();
    showDegree();
    const loc = document.getElementById("search");
    loc.value = "";
    let result = document.getElementById("container");
    result.innerHTML = "";
  } else {
    alert("Please enter the userLocation");
  }
});
async function fetchData() {
  const apiKey = "9df73f83950583d5165dc35eeda73f16";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
  } catch (err) {
    console.log("didn't fetch", err);
  }
}
function displayData(data) {
  //for userLocation
  const symbol = document.getElementById("symbol");
  //datas
  const degree = data.wind.deg;
  const des = data.weather[0].description;
  // const temp = data.main.temp;
  // const hum = data.main.humidity;
  document.getElementById("deg").innerHTML = degree + "°C";
  document.getElementById("loc").innerHTML = userLocation;
  document.getElementById("desc").innerHTML = des;
  // document.getElementById("temp").innerHTML = temp + "°C";
  // document.getElementById("hum").innerHTML = hum + "%";
  if (userLocation.trim() !== "") {
    symbol.style.display = "flex";
  }
}

function dateAndTime() {
  const date = new Date().toString().split(" ");
  const time = date[4].toString().split(":");
  const hr = time[0].padStart(2, "0");
  const min = time[1].padStart(2, "0");
  document.getElementById("date").innerHTML = date[1] + " " + date[2];
  document.getElementById("time").innerHTML = hr + " : " + min;
}
dateAndTime();
setInterval(dateAndTime, 30000);
async function handleClick() {
  const apiKey = "9df73f83950583d5165dc35eeda73f16";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${apiKey}`;
  const res = await fetch(url);
  let data = await res.json();
  let result = document.getElementById("container");
  result.innerHTML = "";
  let arr = [...data.list];
  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  for (let i = 9; i < arr.length; i += 7) {
    const item1 = arr[i].dt_txt;
    const item2 = arr[i].weather[0].description;
    const item3 = arr[i].wind.deg;
    const res = item1.split(" ");
    const date = res[0].split("-");
    const final = months[parseInt(date[1])];
    const Date = date[2];
    const wrapper = document.createElement("div");
    const div1 = document.createElement("div");
    div1.classList.add("degtxt");
    const span1 = document.createElement("div");
    const span2 = document.createElement("div");
    const span3 = document.createElement("div");
    span1.innerHTML = final + " " + Date;
    span2.innerHTML = item2;
    span3.innerHTML = item3 + "°C";
    div1.append(span1, span2,span3);
    wrapper.append(div1);
    result.append(wrapper);
  }
}
document.getElementById("getweather1").addEventListener("click", handleClick);
//show temp and deg with whole data
async function showDegree() {
  const apiKey = "9df73f83950583d5165dc35eeda73f16";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${apiKey}`;
  const res = await fetch(url);
  let data = await res.json();
  let arr = [...data.list];
  // console.log(arr);
  const total = document.getElementById("td");
  for (let i = 0; i < 8; i++) {
    let deg = arr[i].wind.deg;
    let time = arr[i].dt_txt.toString().split(" ");
    let t = time[1].split(":");
    const div = document.createElement("div");
    div.classList.add("timebox");
    const s1 = document.createElement("span");
    const s2 = document.createElement("span");
    s1.innerHTML = t[0] + " : " + t[1];
    s2.innerHTML = deg + " °C ";
    div.append(s1, s2);
    total.append(div);
  }
}
