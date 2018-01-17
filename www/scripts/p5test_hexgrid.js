const SEAMSEALER = 0.1

function setup() {
  // put setup code here
  // let container = document.getElementById('p5canvas_wrapper')
  // var cnv = createCanvas()
  // cnv.parent(container)
  // resizeCanvas(container.width - 16, windowHeight - 10)
  var cnv = createCanvas(windowWidth - 100, windowHeight - 100)
  // cnv.style('border: 1px solid #000;')
  background(255)
  noStroke()
  noFill()
  noLoop()
}

function draw() {
  // put drawing code here
  function hex(center, height, hl) {
    // function equi_tri() {
    //   if(hl) fill(hl)
    //   beginShape()
    //   vertex(-(height/2)*(1/sqrt(3)), -height/2)
    //   vertex((height/2)*(1/sqrt(3)), -height/2)
    //   vertex(0, 0)
    //   endShape(CLOSE)
    //   // triangle(-100*1/(2*sqrt(3)), -100*1/2, 100*1/(2*sqrt(3)), -100*1/2, 0, 0)
    // }
    // translate(center.x, center.y)
    // for(let i = 0; i < 6; i++) {
    //   fill(255-abs(255/4-i*255/6))
    //   rotate(PI / 3)
    //   equi_tri()
    // }
    // translate(-center.x, -center.y)
    translate(center.x, center.y)
    if(hl) {fill(hl)} else {fill(200)}
    beginShape()
    vertex(-(height/2)*(1/sqrt(3))-SEAMSEALER, -height/2)
    vertex((height/2)*(1/sqrt(3))+SEAMSEALER, -height/2)
    vertex(height*(1/sqrt(3))+SEAMSEALER, 0)
    vertex((height/2)*(1/sqrt(3))+SEAMSEALER, height/2)
    vertex(-(height/2)*(1/sqrt(3))-SEAMSEALER, height/2)
    vertex(-height*(1/sqrt(3))-SEAMSEALER, 0)
    endShape()
    translate(-center.x, -center.y)
  }
  function hex_grid(cols, rows) {
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        hex({x: 100+(100*3/sqrt(3))*i, y: 100+100*j}, 100)
        hex({x: 100+100*1.5/sqrt(3)+(100*3/sqrt(3))*i, y: 150+100*j}, 100)
      }
    }
  }
  hex_grid(5, 9)

  function highlight_cell(x, y) {
    hl = 'rgb(255,100,100)'
    x_ = floor(x/2)
    if(x_ == x/2) {
      hex({x: 100+(100*3/sqrt(3))*x/2, y: 100+100*y}, 100, hl)
    } else {
      hex({x: 100+100*1.5/sqrt(3)+(100*3/sqrt(3))*x_, y: 150+100*y}, 100, hl)
    }
  }
  highlight_cell(1, 3)
  highlight_cell(0, 4)
  highlight_cell(1, 4)
  highlight_cell(2, 3)
  highlight_cell(3, 5)
  highlight_cell(3, 3)
  highlight_cell(3, 4)
  highlight_cell(2, 5)
  highlight_cell(2, 2)
  highlight_cell(6, 7)
  // console.log(getFrameRate())
}


/* == QUICK MAFFS ==
x/2^2 + 1/2^2 = x^2
x^2/4 + 1/4 = x^2
1/4 = 3/4*x^2
1/3 = x^2
x = 1/sqrt(3)
*/
