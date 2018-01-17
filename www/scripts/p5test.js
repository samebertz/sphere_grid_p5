var ico
function icosahedron() {
  var vertices_ = []
  vertices_.push([0, 0, 1])
  var top_ring_init = [1, PI/3, 0]
  for (let i = 0; i < 5; i++) {
    vertices_.push(v3d_spherical_to_cartesian(v3d_spherical_rotate_z(top_ring_init, i*2*PI/5)))
  }
  var bot_ring_init = [1, 2*PI/3, PI/5]
  for (let i = 0; i < 5; i++) {
    vertices_.push(v3d_spherical_to_cartesian(v3d_spherical_rotate_z(bot_ring_init, i*2*PI/5)))
  }
  vertices_.push([0, 0, -1])
  console.log(vertices_)

  var faces_ = []
  for (let i = 0; i < 5; i++) {
    faces_.push([vertices_[0], vertices_[1+i], vertices_[1+(i+1)%5]])
    faces_.push([vertices_[1+i], vertices_[6+i], vertices_[1+(i+1)%5]])
    faces_.push([vertices_[1+i], vertices_[6+(i+4)%5], vertices_[6+i]])
    faces_.push([vertices_[6+i], vertices_[6+(i+1)%5], vertices_[11]])
    // faces_.push([ 0,    1+i,        1+(i+1)%5 ])
    // faces_.push([ 1+i,  6+i,        1+(i+1)%5 ])
    // faces_.push([ 1+i,  6+(i+4)%5,  6+i       ])
    // faces_.push([ 6+i,  6+(i+1)%5,  11        ])
  }

  return {
    vertices: vertices_,
    faces: faces_
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20, WEBGL)
  // camera(10, -10, 15, 0, 0, 0, 0, 1, 0)
  // perspective(PI/16, width/height, 1, 100)
  camera(300, -200, 500, 0, 0, 0, 0, 1, 0)
  perspective(PI/4, width/height, 100, 1000)
  // noStroke()
  strokeWeight(2)
  noFill()

  ico = loadModel('../assets/blender_icosahedron.obj', true)
  // ico = icosahedron()

  // noLoop()
}

function rotate_camera(amount) {
  var pos = v3d_cartesian_to_spherical([200, -200, 500])
  pos = v3d_spherical_rotate_z(pos, amount*PI)
  pos = v3d_spherical_to_cartesian(pos)
  camera(pos[0], pos[1], pos[2], 0, 0, 0, 0, 1, 0)
}
function drawAxes() {
  // strokeWeight(.05)
  stroke(255, 0, 0)
  beginShape(LINES)
  vertex(0, 0, 0)
  vertex(250, 0, 0)
  endShape()
  stroke(0, 255, 0)
  beginShape(LINES)
  vertex(0, 0, 0)
  vertex(0, 250, 0)
  endShape()
  stroke(0, 0, 255)
  beginShape(LINES)
  vertex(0, 0, 0)
  vertex(0, 0, 250)
  endShape()
}
function bisect(face) {
  var v1 = face[0]
  var v2 = face[1]
  var v3 = face[2]
  var v1_v2_midpoint = v3d_scl(v3d_add(v1, v2), 0.5)
  var v2_v3_midpoint = v3d_scl(v3d_add(v2, v3), 0.5)
  var v3_v1_midpoint = v3d_scl(v3d_add(v3, v1), 0.5)
  var f1_ = [v1, v1_v2_midpoint, v3_v1_midpoint]
  var f2_ = [v2, v2_v3_midpoint, v1_v2_midpoint]
  var f3_ = [v3, v3_v1_midpoint, v2_v3_midpoint]
  var f4_ = [v1_v2_midpoint, v2_v3_midpoint, v3_v1_midpoint]
  return [f1_, f2_, f3_, f4_]
}
function project(points, r) {
  var res = []
  for (point of points) {
    res.push(v3d_scl(v3d_nrm(point), r))
  }
  return res
}
function draw_triangle(face) {
  beginShape()
  vertex(face[0][0], face[0][1], face[0][2])
  vertex(face[1][0], face[1][1], face[1][2])
  vertex(face[2][0], face[2][1], face[2][2])
  endShape(CLOSE)
}

function draw() {
  background(72)
  drawAxes()
  orbitControl()
  // rotate_camera(frameCount*.01)
  // rotateZ(millis() / 1000)

  // fill(0)
  // stroke(200, 100, 100)
  // strokeWeight(.05)
  model(ico)
  console.log(ico)
  // scale(.01, .01, .01)
  // for(face of ico.faces) {
  //   fill(0)
  //   stroke(255)
  //   strokeWeight(.2)
  //   draw_triangle(face)
  //   for(subdivision of bisect(face)) {
  //     noFill()
  //     stroke(200, 100, 200)
  //     strokeWeight(.1)
  //     draw_triangle(project(subdivision, 1))
  //     for(subdivision_2 of bisect(subdivision)) {
  //       stroke(100, 200, 200)
  //       strokeWeight(.05)
  //       draw_triangle(project(subdivision_2, 1))
  //     }
  //   }
  // }

  // var top = [0, 0, 100]
  // var top_ring_1_spherical = [1, PI/3, 0]
  // var top_ring_1 = v3d_scl(v3d_spherical_to_cartesian(top_ring_1_spherical), 100)
  // var top_ring_2_spherical = v3d_spherical_rotate_z(top_ring_1_spherical, 2/5*PI)
  // var top_ring_2 = v3d_scl(v3d_spherical_to_cartesian(top_ring_2_spherical), 100)
  // var v1 = top
  // var v2 = top_ring_1
  // var v3 = top_ring_2
  // var f1 = [v1, v2, v3]
  // console.log(f1)
  // var f1_b = bisect(f1)
  // console.log(f1_b)
  // var f1_1 = project(f1_b[0], 100)
  // console.log(f1_1)
  // draw_triangle(f1_1)
  // var f1_2 = project(f1_b[1], 100)
  // draw_triangle(f1_2)
  // var f1_3 = project(f1_b[2], 100)
  // draw_triangle(f1_3)
  // var f1_4 = project(f1_b[3], 100)
  // draw_triangle(f1_4)
  // // console.log(getFrameRate())

  noLoop()
}
