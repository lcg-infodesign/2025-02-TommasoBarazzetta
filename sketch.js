let table;

function preload() {
  // put preload code here
  table = loadTable("dataset.csv", "csv", "header");
  
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table);

  let outerPadding = 100;
  let padding = 30;
  let itemSize = 60;
  let strokeSize = 5;

  //calcolo il numero di colonne
  let cols = floor((windowWidth - (outerPadding * 2)) / (itemSize + (padding)));
  let rows = ceil(table.getRowCount() / cols);
  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;
  console.log("cols: " + cols + " - rows: " + rows);

  //creo il canvas
  createCanvas(windowWidth, totalHeight);

  background("#2c2c2cff");

  let colCount = 0;
  let rowCount = 0;
  let fromColor = color("#03ffffff");
  let toColor = color("#e21ed2ff");

  for(let i=0; i<table.getRowCount(); i++){
    //carico i dati dalla tabella
    let data = table.getRow(i).obj;

    //prendo valore per dimension
    let myValue0 = data["column0"]; 
    let myValue1 = data["column1"]; 
    let myValue2 = data["column2"]; 
    let myValue3 = data["column3"]; 
    let myValue4 = data["column4"]; 
    
    //calcolo min e massimo
    let sizeValue = getMyValueMapped(table.getColumn("column0"), myValue0, 5, itemSize);
    let transparencyValue = getMyValueMapped(table.getColumn("column1"), myValue1, 0, 255);
    let colorValue = lerpColor(fromColor, toColor, getMyValueMapped(table.getColumn("column2"), myValue2, 0, 1));
    let angleValue = getMyValueMapped(table.getColumn("column3"), myValue3, 0, 360);
    let strokeSValue = getMyValueMapped(table.getColumn("column4"), myValue4, 0, strokeSize);

    //lerpcolor è la stessa cosa di map ma per i colori

    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);
    
    //possiamo usare per dimensione, rotazione, colore, quantità di oggetti da disegnare...
    drawRect(xPos, yPos, sizeValue, transparencyValue, colorValue, angleValue, strokeSValue);
    
    colCount++; //aumento colCount

    //controllo se siamo a fine riga
    if (colCount == cols){
      colCount = 0;
      rowCount++;
    }
  }
}

function getMyValueMapped(allValues, myValue, myMin, myMax){
  let minValue = min(allValues);
  let maxValue = max(allValues);
  return map(myValue, minValue, maxValue, myMin, myMax)
}

function drawRect(xPos, yPos, size, transparency = 255, color, rotation = 0, stroke){
  push();  
  rectMode(CENTER);
  translate(xPos, yPos);
  angleMode(DEGREES);
  rotate(rotation);
  strokeWeight(stroke);
  fill(red(color), green(color), blue(color), transparency);
  //fill(color, transparency);
  rect(0, 0, size, size);
  pop();
}

function draw() { 
  //
}
