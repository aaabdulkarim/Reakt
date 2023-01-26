const ctx = document.getElementById('myChart');

pen = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

let url = "http://127.0.0.1:5001/scores/" + localStorage.getItem("id")
console.log(url);

$.ajax({url: url, success: function(result){
  console.log(result);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [{
        label: 'Die letzten 10 Scores',
        data: result,
        lineTension: .3,           

        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
      
    }
  });

}});  
