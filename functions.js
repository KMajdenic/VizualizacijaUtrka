var path1, path2, path3, data;
var dataArray;
var labels = ['Rezultat', 'Natjecatelj', 'Država', 'Vrijeme'];

window.onload = (event) => {
  replayRaceButton = document.getElementById("startBtn")
    .addEventListener("click", animate);
  getRaceButtons = document.querySelectorAll(".button-pick-race");
  getRaceButtons.forEach(button => {
    button.addEventListener('click', loadRace);
  })
  drawTrack();
};


function loadRace(event) {
  event.preventDefault();
  loadRaceData(event.target.value);

}

function loadRaceData(race) {
  d3.select("#standings").selectAll("*").remove();
  d3.json(race).then(data => {
    dataArray = data;
    displayStandings();
    drawTrack();
  })

}

function displayStandings() {

  var table = d3.select("#standings").append("table");

  thead = table.append("thead");
  tbody = table.append("tbody");

  thead.append("tr")
    .selectAll("th")
    .data(labels)
    .enter()
    .append("th")
    .text(function (d) {
      return d;
    });

  var rows = tbody.selectAll("tr")
    .data(dataArray)
    .enter()
    .append("tr");

  var cells = rows.selectAll("td")
    .data(function (d) { return Object.values(d); })
    .enter()
    .append("td")
    .text(function (d) {
      return d;
    });
}

function drawTrack() {
  d3.select("#track").selectAll("*").remove();

  var svg = d3
    .select("#track")
    .append("svg")
    .attr("width", 750)
    .attr("height", 600);

  d3.select("svg")
    .append("path")
    .attr(
      "d",
      "M 250 570 L 550 570 C 800 570 800 230 550 230 L 250 230 C 5 230 5 570 250 570"
    )
    .attr("stroke", "black")
    .attr("fill", "white");

  d3.select("svg")
    .append("path")
    .attr("id", "start-line")
    .attr(
      "d",
      "M 250 560 L 550 560 C 790 560 790 240 550 240 L 250 240 C 20 240 20 560 250 560"
    )
    .attr("stroke", "black")
    .attr("fill", "#b30000")
    .attr("pathLength", "100");

  d3.select("svg")
    .append("path")
    .attr(
      "d",
      "M 250 510 L 550 510 C 715 510 715 290 550 290 L 250 290 C 85 290 85 510 250 510"
    )
    .attr("stroke", "black")
    .attr("fill", "white");
  d3.select("svg")
    .append("path")
    .attr(
      "d",
      "M 250 500 L 550 500 C 700 500 700 300 550 300 L 250 300 C 100 300 100 500 250 500 "
    )
    .attr("stroke", "black")
    .attr("fill", "green");

  d3.select("svg")
    .append("text")
    .style("fill", "white")
    .attr("id", "start")
    .append("textPath")
    .attr("xlink:href", "#start-line")
    .attr("font-size", "25px")
    .text("START");

  d3.select("svg")
    .append("path")
    .attr("d", "M 249 560 L 249 510 ")
    .attr("stroke", "white")
    .style("stroke-width", 3);
}


function setupTrack() {
  path1 = d3.select("svg")
    .append("path")
    .attr("id", "running-line")
    .style("fill", "none")
    .attr(
      "d",
      "M 250 550 L 550 550 C 775 550 775 250 550 250 L 250 250 C 35 250 35 550 250 550"
    )
    .attr("pathLength", "100");

  path2 = d3.select("svg")
    .append("path")
    .attr("id", "running-line")
    .style("fill", "none")
    .attr(
      "d",
      "M 250 535 L 550 535 C 755 535 755 265 550 265 L 250 265 C 52 270 52 540 250 535"
    )
    .attr("pathLength", "100");

  path3 = d3.select("svg")
    .append("path")
    .attr("id", "running-line")
    .style("fill", "none")
    .attr(
      "d",
      "M 250 520 L 550 520 C 730 520 730 280 550 280 L 250 280 C 70 280 70 520 250 520"
    )
    .attr("pathLength", "100");
};

function drawRace() {


  if (dataArray === undefined) {
    alert("Utrka nije odabrana");
    return;
  }
  const length = path2.node().getTotalLength();

  var tempArray = [dataArray[0], dataArray[1], dataArray[2]];
  shuffle(tempArray);
  console.log(tempArray)

  path1.attr("stroke", "yellow")
    .attr("stroke-width", "10px")
    .attr("stroke-dasharray", length + " " + length)
    .attr("stroke-dashoffset", length)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(tempArray[0].time * 5000);

  path2.attr("stroke", "blue")
    .attr("stroke-width", "10px")
    .attr("stroke-dasharray", length + " " + length)
    .attr("stroke-dashoffset", length)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(tempArray[1].time * 5000);

  path3.attr("stroke", "green")
    .attr("stroke-width", "10px")
    .attr("stroke-dasharray", length + " " + length)
    .attr("stroke-dashoffset", length)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(tempArray[2].time * 5000);
};

function animate() {
  drawTrack();
  setupTrack();
  drawRace();
};

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}





