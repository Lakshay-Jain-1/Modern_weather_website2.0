/* teaching read api documentation ,async await works on that which return promises , like navigator api doesn't return promises means not all api return promises in that we have to use callback function basically parameter ke andar function 


try to dissect problem into parts like getting automatic user latitude like making a chart   and solve in different replit 

use JSON formatter
 */

document.getElementById("auto").addEventListener("click", () => {
  let options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    async (s) => {
      await getData(s);
    },
    (e) => {
      console.log(e);
    },
    options
  );

  async function getData(s) {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=5b5b0699a0324bbfab63f8260483ff7c&q=${s.coords.latitude}%2C${s.coords.longitude}&pretty=1`;

    try {
      let response = await fetch(url);
      let result = await response.json();


      chart(result.results[0].components.state)

    } catch (error) {
      console.error('Error:', error);
    }
  }

})


async function chart(state) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${state}&days=3`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '717065928emshc44f4f175d27c9dp1435b4jsne1eeb37d8cf8',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    datamaker(result);
  } catch (error) {
    console.error(error);
  }

}

function datamaker(json) {
  let arr = []
  let arr1 = []
  json.forecast.forecastday.forEach((ele) => {
    arr.push(ele.day.mintemp_c)
    arr1.push(ele.day.maxtemp_c)
    console.log(ele.day.maxtemp_c)
  })
  console.log(arr)
  console.log(arr1)
  chartmaker(arr, arr1)
}
function chartmaker(array, array1) {
  console.log(array)
  console.log(array1)
  const ctx = document.getElementById("myCanvas");
  const chartInstance = Chart.getChart(ctx);

  // Check if a chart instance exists before attempting to destroy it
  if (chartInstance) {
    // Destroy the existing chart
    chartInstance.destroy();
  }

  let abc = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day3"],
      datasets: [
        {
          label: "Min temp",
          data: array, // 4.4 6.2 ,-2
          borderWidth: 0.9,
          height: 1
        },
        {
          label: "Max temp",
          data: array1, // 7.1 , 7.8 , 5.8 
          borderWidth: 0.9,
          height: 1
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
      scale: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

document.getElementById("manual").addEventListener("click", () => {


  chart(document.getElementById("city").value)
})