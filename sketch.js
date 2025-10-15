let table;


function preload() {
  // put preload code here
  table=loadTable("dataset.csv", "csv", "header")
}

function setup() {
  console.log(table);
  
  createCanvas(windowWidth, windowHeight);

  // put setup code here
  const message =
    "This is a template repository\nfor the course Laboratorio di Computergrafica\nCommunication Design, Politecnico di Milano";
  textAlign(CENTER, CENTER);
  textSize(16);
  text(message, width / 2, height / 2);
}

function draw() {
  // put drawing code here
}
