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
