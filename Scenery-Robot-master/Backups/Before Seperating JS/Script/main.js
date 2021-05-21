/*                                  Begin Seconds Range Slider Section                              */
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value + " sec";

slider.oninput = function () {
  output.innerHTML = this.value + " sec";
};
/*                                  End Seconds Range Slider Section                              */

/*                                   Begin Display Grid (via Toggle Button) Section                      */
var isGridToggled = false;
function myFunction() {
  var elnt = document.getElementById("gridCanvas");
  if (isGridToggled == false) {
    isGridToggled = true;
    elnt.style.visibility = "visible";
    displayGrid();
  } else {
    elnt.style.visibility = "hidden";
    isGridToggled = false;
    removeGridIntervals();
  }
}

//The following code draws a grid on a canvas
//in order to get the grid to turn on and off, we will have to stack two canvas' on top of each other:
//one canvas will be for the grid, one will be for user drawing. When the grid switch is toggled, the grid canvas is set to visible
gridCanvas = document.getElementById("gridCanvas"); //get the canvas by name
var ctx = gridCanvas.getContext("2d"); //set its dimentions to 2d
ctx.canvas.width = gridCanvas.getBoundingClientRect().width;
ctx.canvas.height = gridCanvas.getBoundingClientRect().height;

gridWidth = gridCanvas.getBoundingClientRect().width;
gridHeight = gridCanvas.getBoundingClientRect().height;

function displayGrid() {
  clearGrid();
  drawBoard();
  displayGridIntervals();
}

var p = 0;
function drawBoard() {
  //Prints all the vertical lines of the grid
  for (
    var x = 0;
    x <= gridWidth;
    x += gridCanvas.getBoundingClientRect().width / 40
  ) {
    ctx.moveTo(x + p, p);
    ctx.lineTo(x + p, gridHeight + p);
  }
  //Prints all the horizontal lines of the grid
  for (
    var x = 0;
    x <= gridHeight;
    x += gridCanvas.getBoundingClientRect().height / 24
  ) {
    ctx.moveTo(p, x + p);
    ctx.lineTo(gridWidth + p, x + p);
  }

  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function clearGrid() {
  ctx = null;
  ctx = gridCanvas.getContext("2d"); //set its dimentions to 2d
  ctx.canvas.width = gridCanvas.getBoundingClientRect().width;
  ctx.canvas.height = gridCanvas.getBoundingClientRect().height;
}

xAxisArray = [];
yAxisArray = [];
function displayGridIntervals() {
  axisFrequency = document.getElementById("frequency").value;
  xAxisArray.length = Math.floor(1 / axisFrequency) + 1;
  yAxisArray.length = Math.floor(1 / axisFrequency);

  var tempWidth =
    document.getElementById("gridCanvas").getBoundingClientRect().width - 30;
  var xLocation = 0;
  var xGapRate = (tempWidth / (xAxisArray.length - 1)).toFixed(0);
  var rect = document.getElementById("gridCanvas").getBoundingClientRect();
  console.log(rect);
  for (var i = 0; i < xAxisArray.length; i++) {
    const div = document.createElement("div" + i);
    div.id = "xCoord";
    div.style.width = "30px";
    div.style.height = "20px";
    div.style.position = "absolute";
    div.style.zIndex = "2";
    div.style.bottom = ".5%";
    div.style.color = "#00adb5";
    if (i == 0) {
      div.style.marginLeft = ".5%";
    }
    div.style.left += xLocation + i * xGapRate + "px";

    /*
    realX = ((tempx / rect.width) * stageWidth).toFixed(2);
    realY =  (stageHeight-((tempy / rect.height) * stageHeight)).toFixed(2)
    */
    var h1 = document.createElement("h4");
    h1.innerHTML = i * xGapRate;
    div.append(h1);
    xAxisArray[i] = div;
  }

  for (var i = 0; i < xAxisArray.length; i++) {
    document.getElementById("leftCont").appendChild(xAxisArray[i]);
  }

  var tempHeight =
    document.getElementById("gridCanvas").getBoundingClientRect().height - 20;
  var yLocation = 0;
  var yGapRate = (tempHeight / yAxisArray.length).toFixed(0);
  for (var i = 0; i < yAxisArray.length; i++) {
    const div = document.createElement("div" + i);
    div.id = "yCoord";
    div.style.width = "30px";
    div.style.height = "20px";
    div.style.position = "absolute";
    div.style.color = "#00adb5";
    div.style.zIndex = "2";
    div.style.bottom = yLocation + (i + 1) * yGapRate + "px";
    div.style.left += ".5%";

    var h1 = document.createElement("h4");
    h1.innerHTML = (i + 1) * yGapRate;
    div.append(h1);
    yAxisArray[i] = div;
  }
  for (var i = 0; i < yAxisArray.length; i++) {
    document.getElementById("leftCont").appendChild(yAxisArray[i]);
  }
}

function removeGridIntervals() {
  for (var i = 0; i < xAxisArray.length; i++) {
    var elem = document.getElementById("xCoord");
    elem.remove();
  }

  for (var i = 0; i < yAxisArray.length; i++) {
    var el = document.getElementById("yCoord");
    el.remove();
  }
}
/*                                   End Display Grid (via Toggle Button) Section                      */

/*                                           Begin Verifying Canvas Dimension Input Section                         */
var stageWidth = 0;
var stageHeight = 0;
var interval = 0;
var isToggled = false;
var haveDimensions = false;
function newTrack() {
  stageWidth = document.getElementById("stageWidth").value;
  stageHeight = document.getElementById("stageHeight").value;
  stageWidthInch = parseInt(document.getElementById("inchesWidth").value);
  stageHeightInch = parseInt(document.getElementById("inchesHeight").value);

  //stageWidth += stageWidthInch/12;
  //stageHeight += stageHeightInch/12;
  interval = document.getElementById("myRange").value * 1000; // this will turn the seconds into milliseconds

  var popup = document.getElementById("myPopup");
  if (stageWidth == 0 || stageHeight == 0) {
    popup.classList.toggle("show");
    isToggled = true;
  } else {
    isValidToDraw = true;
    if (isToggled == true) {
      popup.classList.toggle("show"); //this will remove the pop up warning
      isToggled = false;
    }

    console.log(stageWidth);
    document.getElementById("displayDim").innerHTML =
      "Width: " +
      stageWidth +
      " inches \n" +
      "Height: " +
      stageHeight +
      " inches";
    haveDimensions = true;
  }
}
/*                                          End Verifying Canvas Dimension Input Section                           */

/*                                    Begin Addtional Button Functions Section                             */
function displayPoints() {
  document.getElementById("xAndYCoordinates").innerHTML = ""; //clear the pre-existing text in the div element

  var rect = document.getElementById("drawingCanvas").getBoundingClientRect();
  //currentXPos = (event.clientX - rect.left) / (rect.right - rect.left) * drawingCanvas.width;
  //currentYPos = (event.clientY - rect.top) / (rect.bottom - rect.top) * drawingCanvas.height;
  var realX, realY;
  for (var i = 0; i < criticalPointsList.length; i++) {
    var tempx = criticalPointsList[i].x;
    var tempy = criticalPointsList[i].y;
    realX = ((tempx / rect.width) * stageWidth).toFixed(2);
    realY = (stageHeight - (tempy / rect.height) * stageHeight).toFixed(2);
    if (i + 1 == criticalPointsList.length) {
      //for the last set of points, do not add the extra comma at the end
      document.getElementById("xAndYCoordinates").innerHTML +=
        "(" + realX + ", " + realY + ")";
    } else {
      document.getElementById("xAndYCoordinates").innerHTML +=
        "(" + realX + ", " + realY + "), ";
    }
  }
}

function copyPointsFunction() {
  var copyElement = document.getElementById("xAndYCoordinates"); //select the element
  var elementText = copyElement.textContent; //get the text content from the element
  navigator.clipboard.writeText(elementText);
  alert("Copied the text: " + elementText);
}
//function to reload the page and reset everything
function reloadPage() {
  location = location.href;
}

document.querySelector("#saveButton").addEventListener("click", () => {
  var wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "SheetJS Tutorial",
    Subject: "Test",
    Author: "Red Stapler",
    CreatedDate: new Date(2017, 12, 19),
  };

  wb.SheetNames.push("Test Sheet");
  var ws_data = [["mouseHistoryX", "mouseHistoryY"]];
  for (var i = 0; i < fullMouseHistoryPoints.length; i++) {
    var temp = [];
    temp.push(fullMouseHistoryPoints[i].x);
    temp.push(fullMouseHistoryPoints[i].y);
    ws_data.push(temp);
  }
  var criticalPointsHeading = [
    "XPos",
    "YPos",
    "Width",
    "Height",
    "isClicked",
    "Color",
  ];
  ws_data.push(criticalPointsHeading);

  for (var i = 0; i < criticalPointsList.length; i++) {
    var temp = [];
    temp.push(criticalPointsList[i].x);
    temp.push(criticalPointsList[i].y);
    temp.push(criticalPointsList[i].width);
    temp.push(criticalPointsList[i].height);
    temp.push(criticalPointsList[i].isClicked);
    temp.push(criticalPointsList[i].color);
    ws_data.push(temp);
  }

  var ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Test Sheet"] = ws;
  var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "Workspace.xlsx"
  );
  for (var i = 0; i < fullMouseHistoryPoints.length; i++) {
    console.log(fullMouseHistoryPoints[i].x, fullMouseHistoryPoints[i].y);
  }
  for (var i = 0; i < criticalPointsList.length; i++) {
    console.log("critPoint", criticalPointsList[i].x, criticalPointsList[i].y);
  }
});

/*                                    End Addtional Button Functions Section                             */

/*                                          Begin User Drawing Section                              */
drawingCanvas = document.getElementById("drawingCanvas"); //get the canvas by name
var context = drawingCanvas.getContext("2d"); //set its dimentions to 2d
context.canvas.width = drawingCanvas.getBoundingClientRect().width;
context.canvas.height = drawingCanvas.getBoundingClientRect().height;
context.lineWidth = 1;
context.lineCap = "round";
context.strokeStyle = "black"; //finish setting up the drawing canvas

var fullMouseHistoryPoints = []; //stores all the mouse history
var criticalPointsList = []; //this list stores all the critical points extracted at specified intervals
var pointsSelected = []; //this list stores the two points that are selected and we need to erase everything in the middle
var timer;
var startDrawing = false; //variable to conrol when to start drawing
var numPointsSelected = 0;
var indexEdited = 0;
var editLocation = "none";

//every time the mouse moves, a new timer function is called and a set of points are pushed into the array
var startTimerOnce = true;
document.addEventListener("mousemove", function (event) {
  var rect = drawingCanvas.getBoundingClientRect();
  currentXPos =
    ((event.clientX - rect.left) / (rect.right - rect.left)) *
    drawingCanvas.width;
  currentYPos =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
    drawingCanvas.height;

  if (drawingCanvas.contains(event.target)) {
    if (startDrawing) {
      if (startTimerOnce) {
        startTimerOnce = false;
        timer = setInterval(function () {
          criticalPointsList.push(new criticalPoint(currentXPos, currentYPos));
        }, interval);
      }
      draw(window.event);
    }
  }
});

document.onmouseup = function () {
  var rect = drawingCanvas.getBoundingClientRect();
  var currentXPos, currentYPos;
  if (drawingCanvas.contains(event.target)) {
    if (startDrawing) {
      console.log("welp");
      currentXPos =
        ((event.clientX - rect.left) / (rect.right - rect.left)) *
        drawingCanvas.width;
      currentYPos =
        ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
        drawingCanvas.height;
      criticalPointsList.push(new criticalPoint(currentXPos, currentYPos));
    }
  }
  clearInterval(timer);
  startTimerOnce = true;
  startDrawing = false;
};

/*
realX = ((currentXPos / rect.width) * stageWidth).toFixed(2);
realY = (stageHeight-((currentYPos / rect.height) * stageHeight)).toFixed(2);
*/

//when the mouse is pressed down, it check whether there is a line drawn and if the current mouse position is near where the line was last drawn
document.addEventListener("mousedown", function (event) {
  var rect = drawingCanvas.getBoundingClientRect();
  var currentXPos, currentYPos; //get the current x and y position with respects to the drawing canvas
  currentXPos =
    ((event.clientX - rect.left) / (rect.right - rect.left)) *
    drawingCanvas.width;
  currentYPos =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
    drawingCanvas.height;
  startDrawing = false;

  if (drawingCanvas.contains(event.target)) {
    console.log(haveDimensions);
    if (haveDimensions == true) {
      console.log(fullMouseHistoryPoints.length);
      if (fullMouseHistoryPoints.length > 0) {
        //if there is a list of old mouse locations
        //if there is a list of old mouse locations, we want to have the option to be able to edit at the front of the path and at the end
        for (var i = 200; i < fullMouseHistoryPoints.length; i++) {
          console.log(fullMouseHistoryPoints[i].x, fullMouseHistoryPoints[i].y);
        }
        console.log(
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x,
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y
        );
        var lastLocation = new MyRect(
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x - 5,
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y - 5,
          10,
          10
        );
        var startLocation = new MyRect(
          fullMouseHistoryPoints[0].x - 5,
          fullMouseHistoryPoints[0].y - 5,
          10,
          10
        );
        if (lastLocation.contains(currentXPos, currentYPos)) {
          startDrawing = true;
          criticalPointsList.push(new criticalPoint(currentXPos, currentYPos));
          setPosition(window.event);
        }
      } else {
        startDrawing = true;
        criticalPointsList.push(new criticalPoint(currentXPos, currentYPos)); //where the mouse was first pressed down, get a critical point
        setPosition(window.event);
      }
    }
  }

  if (document.getElementById("pointsCanvas").contains(event.target)) {
    if (criticalPointsList.length > 0) {
      for (var i = 0; i < criticalPointsList.length; i++) {
        if (criticalPointsList[i].contains(currentXPos, currentYPos)) {
          console.log(pointsSelected.includes(criticalPointsList[i]));
          if (pointsSelected.includes(criticalPointsList[i])) {
            pointsSelected.splice(
              pointsSelected.indexOf(criticalPointsList[i]),
              1
            );
            numPointsSelected--;
            criticalPointsList[i].updateColor();
            reDrawPoints();
          } else {
            if (numPointsSelected < 2) {
              pointsSelected.push(criticalPointsList[i]);
              criticalPointsList[i].updateColor();
              reDrawPoints();
              numPointsSelected++;
            }
          }
        }
      }
      console.log(
        "Points Selected Contains: ",
        pointsSelected.length,
        "points"
      );
    }
  }
});

// new position from mouse event
function setPosition(e) {
  var rect = drawingCanvas.getBoundingClientRect();
  currentXPos =
    ((event.clientX - rect.left) / (rect.right - rect.left)) *
    drawingCanvas.width;
  currentYPos =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
    drawingCanvas.height;
  fullMouseHistoryPoints.push(new myPoint(currentXPos, currentYPos));
}

function MyRect(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;

  this.contains = function (x, y) {
    return (
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
  };
  this.draw = function (ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.rect(this.x, this.y, this.width, this.height);
  };
  this.toString = function () {
    console.log(
      "x: " + this.x,
      " y: " + this.y,
      " width: " + this.width,
      " height: " + this.height
    );
  };
}

function myPoint(x, y) {
  this.x = x;
  this.y = y;
}

function criticalPoint(x, y) {
  this.x = x - 5;
  this.y = y - 5;
  this.width = 10;
  this.height = 10;
  this.isClicked = false;
  this.color = "red";

  this.updateColor = function () {
    if (this.color == "red") {
      this.color = "green";
    } else {
      this.color = "red";
    }
  };

  this.contains = function (x, y) {
    return (
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
  };

  this.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  };

  this.toString = function () {
    console.log("Critical Point at: ", this.x, this.y, this.width, this.height);
  };
}

var isValidToDraw = false;
var isDrawing = false;
function draw(e) {
  if (isValidToDraw == true) {
    if (e.buttons !== 1) return;
    context.strokeStyle = "black";
    context.lineWidth = 1;
    isDrawing = true;
    context.beginPath(); // begin
    context.moveTo(
      fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x,
      fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y
    );
    setPosition(e);
    context.lineTo(
      fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x,
      fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y
    );
    context.stroke(); // draw it!
  }
}
/*                                                      End User Drawing Section                            */

/*                                        Begin Draw Points on Canvas Section                            */
var isPointsToggled = false;
function drawCoordinates() {
  var elnt = document.getElementById("pointsCanvas");
  if (isPointsToggled == false) {
    isPointsToggled = true;
    elnt.style.visibility = "visible";
    document.getElementById("pointsPopup").style.visibility = "visible";
    reDrawPoints();
  } else {
    elnt.style.visibility = "hidden";
    document.getElementById("pointsPopup").style.visibility = "hidden";
    isPointsToggled = false;
  }
}

function reDrawPoints() {
  var pointsCanvas = document.getElementById("pointsCanvas");
  var rect = pointsCanvas.getBoundingClientRect();
  var ctx = "";
  ctx = pointsCanvas.getContext("2d"); //set its dimentions to 2d
  ctx.canvas.width = pointsCanvas.getBoundingClientRect().width;
  ctx.canvas.height = pointsCanvas.getBoundingClientRect().height;
  for (var i = 0; i < criticalPointsList.length; i++) {
    criticalPointsList[i].draw(ctx);
  }
}
/*                                  End Draw Points on Canvas Section                          */

/*                                                       Begin Undo Button Section                            */
var undoTimer;
document.getElementById("undoButton").onmousedown = function (event) {
  editLocation = "none";
  undoTimer = setInterval(function () {
    if (criticalPointsList.length > 0) {
      while (
        criticalPointsList[criticalPointsList.length - 1].contains(
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x,
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y
        )
      ) {
        if (
          pointsSelected.includes(
            criticalPointsList[criticalPointsList.length - 1]
          )
        ) {
          pointsSelected.splice(
            pointsSelected.indexOf(
              criticalPointsList[criticalPointsList.length - 1]
            ),
            1
          );
          numPointsSelected--;
        }
        criticalPointsList.pop();
        if (criticalPointsList.length == 0) {
          break;
        }
      }
    }
    fullMouseHistoryPoints.pop();
    drawLinesFromHistory();
    reDrawPoints();
  }, 25);
};

document.getElementById("undoButton").onmouseup = function (event) {
  clearInterval(undoTimer);
};

function drawLinesFromHistory() {
  context = null;
  context = drawingCanvas.getContext("2d"); //set its dimentions to 2d
  context.canvas.width = drawingCanvas.getBoundingClientRect().width;
  context.canvas.height = drawingCanvas.getBoundingClientRect().height;

  context.lineWidth = 1;
  context.lineCap = "round";
  context.strokeStyle = "black";

  if (fullMouseHistoryPoints.length >= 2) {
    for (var i = 0; i < fullMouseHistoryPoints.length - 1; i++) {
      if (i == indexEdited && editLocation == "middle") {
        console.log("why am i in here");
        i = i + 1;
      }
      context.beginPath(); // begin
      context.moveTo(fullMouseHistoryPoints[i].x, fullMouseHistoryPoints[i].y);
      context.lineTo(
        fullMouseHistoryPoints[i + 1].x,
        fullMouseHistoryPoints[i + 1].y
      );
      context.stroke();
    }
  }
}

/*                                                       End Undo Button Section                            */

/*                                                    Begin Erase Button Section                            */
var edit = false;
function eraseFunction() {
  if (edit == false) {
    var startSplice, endSplice;
    editLocation = "middle";
    if (numPointsSelected == 2) {
      //verified that we have two distinct pionts in points Selected
      pointsSelected[0].toString();
      pointsSelected[1].toString();
      //indexes are correct
      var indexFirstPoint = criticalPointsList.indexOf(pointsSelected[0]);
      var indexSecondPoint = criticalPointsList.indexOf(pointsSelected[1]);

      //find the distance between the two indexes
      var distance =
        Math.max(indexFirstPoint, indexSecondPoint) -
        Math.min(indexFirstPoint, indexSecondPoint);
      if (indexFirstPoint < indexSecondPoint) {
        for (var i = 0; i < fullMouseHistoryPoints.length; i++) {
          if (
            pointsSelected[0].contains(
              fullMouseHistoryPoints[i].x,
              fullMouseHistoryPoints[i].y
            )
          ) {
            startSplice = i;
            break;
          }
        }
        for (var i = fullMouseHistoryPoints.length - 1; i >= 0; i--) {
          if (
            pointsSelected[1].contains(
              fullMouseHistoryPoints[i].x,
              fullMouseHistoryPoints[i].y
            )
          ) {
            endSplice = i;
            break;
          }
        }
      } else {
        for (var i = 0; i < fullMouseHistoryPoints.length; i++) {
          if (
            pointsSelected[1].contains(
              fullMouseHistoryPoints[i].x,
              fullMouseHistoryPoints[i].y
            )
          ) {
            startSplice = i;
            break;
          }
        }
        for (var i = fullMouseHistoryPoints.length - 1; i >= 0; i--) {
          if (
            pointsSelected[0].contains(
              fullMouseHistoryPoints[i].x,
              fullMouseHistoryPoints[i].y
            )
          ) {
            endSplice = i;
            break;
          }
        }
      }

      var lineSpliceDistance =
        Math.max(startSplice, endSplice) - Math.min(startSplice, endSplice);

      //if the first critical point is selected
      if (
        edit == false &&
        fullMouseHistoryPoints[0].x ==
          criticalPointsList[Math.min(indexFirstPoint, indexSecondPoint)].x +
            5 &&
        fullMouseHistoryPoints[0].y ==
          criticalPointsList[Math.min(indexFirstPoint, indexSecondPoint)].y + 5
      ) {
        editLocation = "beginning";
      }

      //if the last critical point is selected
      if (
        edit == false &&
        fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x ==
          criticalPointsList[Math.max(indexFirstPoint, indexSecondPoint)].x +
            5 &&
        fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y ==
          criticalPointsList[Math.max(indexFirstPoint, indexSecondPoint)].y + 5
      ) {
        editLocation = "end";
      }

      //if both the first and last critical points are selected
      if (
        edit == false &&
        fullMouseHistoryPoints[0].x ==
          criticalPointsList[Math.min(indexFirstPoint, indexSecondPoint)].x +
            5 &&
        fullMouseHistoryPoints[0].y ==
          criticalPointsList[Math.min(indexFirstPoint, indexSecondPoint)].y + 5
      ) {
        if (
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].x ==
            criticalPointsList[Math.max(indexFirstPoint, indexSecondPoint)].x +
              5 &&
          fullMouseHistoryPoints[fullMouseHistoryPoints.length - 1].y ==
            criticalPointsList[Math.max(indexFirstPoint, indexSecondPoint)].y +
              5
        ) {
          editLocation = "clearPage";
        }
      }
      // Before this code we are checking to see where the erase funciton should happend
      //after this, we can execute the desired locations
      console.log(editLocation);
      if (edit == false && editLocation == "clearPage") {
        for (var i = 0; i < fullMouseHistoryPoints.length; i++) {
          fullMouseHistoryPoints.pop();
        }
        for (var i = 0; i < criticalPointsList.length; i++) {
          criticalPointsList.pop();
        }
        fullMouseHistoryPoints.length = 0;
        criticalPointsList.length = 0;
        fullMouseHistoryPoints = [];
        criticalPointsList = [];
        console.log(criticalPointsList.length);
        console.log(fullMouseHistoryPoints.length);
        postEraseProtocol("full");
      }

      if (edit == false && editLocation == "beginning") {
        startSplice = 0;
        fullMouseHistoryPoints.splice(
          Math.min(startSplice, endSplice),
          lineSpliceDistance
        );
        criticalPointsList.splice(
          Math.min(indexFirstPoint, indexSecondPoint),
          distance
        );
        indexEdited = 0;
        edit = true;
        postEraseProtocol("some");
      }

      //erase in the middle works
      if (edit == false && editLocation == "middle") {
        fullMouseHistoryPoints.splice(
          Math.min(startSplice, endSplice) + 1,
          lineSpliceDistance - 1
        );
        criticalPointsList.splice(
          Math.min(indexFirstPoint, indexSecondPoint) + 1,
          distance - 1
        );
        indexEdited = Math.min(startSplice, endSplice);
        edit = true;
      }

      if (edit == false && editLocation == "end") {
        fullMouseHistoryPoints.splice(
          Math.min(startSplice, endSplice) + 1,
          fullMouseHistoryPoints.length - Math.min(startSplice, endSplice) + 1
        );
        criticalPointsList.splice(
          Math.min(indexFirstPoint, indexSecondPoint) + 1,
          criticalPointsList.length -
            Math.min(indexFirstPoint, indexSecondPoint)
        );
        indexEdited = Math.min(startSplice, endSplice);
        edit = true;
        postEraseProtocol("some");
      }

      drawLinesFromHistory();
      reDrawPoints();
    } else {
      alert("Please select atleast 2 points");
    }
  } else {
    alert("please finish editing");
  }
}

function postEraseProtocol(temp) {
  for (var i = 0; i < pointsSelected.length; i++) {
    pointsSelected[i].updateColor();
  }
  numPointsSelected = 0;
  pointsSelected = [];
  edit = false;
}
/*                                                      End Erase Button Section                            */

document.getElementById("docpicker").addEventListener("change", importFile);
function importFile(evt) {
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = (e) => {
      var contents = processExcel(e.target.result);
      console.log(contents);
    };
    r.readAsBinaryString(f);
  } else {
    console.log("Failed to load file");
  }
}
function processExcel(data) {
  fullMouseHistoryPoints = [];
  criticalPointsList = [];
  var isCritPoint = false;
  var workbook = XLSX.read(data, {
    type: "binary",
  });
  var firstSheet = workbook.SheetNames[0];
  var excelRows = XLSX.utils.sheet_to_row_object_array(
    workbook.Sheets[firstSheet]
  );
  for (var i = 0; i < excelRows.length; i++) {
    if (excelRows[i].mouseHistoryX == "XPos") {
      i++;
      isCritPoint = true;
    }

    if (isCritPoint == false) {
      fullMouseHistoryPoints.push(
        new myPoint(excelRows[i].mouseHistoryX, excelRows[i].mouseHistoryY)
      );
    } else {
      criticalPointsList.push(
        new criticalPoint(
          excelRows[i].mouseHistoryX + 5,
          excelRows[i].mouseHistoryY + 5
        )
      );
    }
  }
  drawLinesFromHistory();
}
