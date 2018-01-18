function icosahedron() {
  var vertices = []
  vertices.push([0, 0, 1])
  var top_ring_init = [1, PI/3, 0]
  for (let i = 0; i < 5; i++) {
    vertices.push(v3d_spherical_to_cartesian(v3d_spherical_rotate_z(top_ring_init, i*2*PI/5)))
  }
  var bot_ring_init = [1, 2*PI/3, PI/5]
  for (let i = 0; i < 5; i++) {
    vertices.push(v3d_spherical_to_cartesian(v3d_spherical_rotate_z(bot_ring_init, i*2*PI/5)))
  }
  vertices.push[0, 0, -1]

  var faces = []
  for (let i = 0; i < 5; i++) {
    // faces.push(vertices[0], vertices[1+i], vertices[1+(i+1)%5])
    // faces.push(vertices[1+i], vertices[6+i], vertices[1+(i+1)%5])
    // faces.push(vertices[1+i], vertices[6+(i+4)%5], vertices[6+i])
    // faces.push(vertices[6+i], vertices[6+(i+1)%5], vertices[11])
    faces.push([ 0,    1+i,        1+(i+1)%5 ])
    faces.push([ 1+i,  6+i,        1+(i+1)%5 ])
    faces.push([ 1+i,  6+(i+4)%5,  6+i       ])
    faces.push([ 6+i,  6+(i+1)%5,  11        ])
  }

  function draw() {
    for (face of faces) {
      beginShape()
      vertex(...vertices[face[0]])
      vertex(...vertices[face[1]])
      vertex(...vertices[face[2]])
      endShape(CLOSE)
    }
  }
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
  var projection = []
  for (point of points) {
    projection.push(v3d_scl(v3d_nrm(point), r))
  }
  return projection
}
