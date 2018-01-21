// TODO: refactor so primitive generation is separate

define(['p5', 'v3d'],
function(p5,   v3d) {
  function icosahedron() {
    var vertices = []
    vertices.push([0, 0, 1])
    var top_ring_init = [1, Math.PI/3, 0]
    for (let i = 0; i < 5; i++) {
      vertices.push(v3d.sph_to_crt(v3d.sph_rot_z(top_ring_init, i*2*Math.PI/5)))
    }
    var bot_ring_init = [1, 2*Math.PI/3, Math.PI/5]
    for (let i = 0; i < 5; i++) {
      vertices.push(v3d.sph_to_crt(v3d.sph_rot_z(bot_ring_init, i*2*Math.PI/5)))
    }
    vertices.push([0, 0, -1])
    // console.log(vertices)

    var faces = []
    for (let i = 0; i < 5; i++) {
      faces.push([vertices[0], vertices[1+i], vertices[1+(i+1)%5]])
      faces.push([vertices[1+i], vertices[6+i], vertices[1+(i+1)%5]])
      faces.push([vertices[1+i], vertices[6+(i+4)%5], vertices[6+i]])
      faces.push([vertices[6+i], vertices[6+(i+1)%5], vertices[11]])
      // faces.push([ 0,    1+i,        1+(i+1)%5 ])
      // faces.push([ 1+i,  6+i,        1+(i+1)%5 ])
      // faces.push([ 1+i,  6+(i+4)%5,  6+i       ])
      // faces.push([ 6+i,  6+(i+1)%5,  11        ])
    }

    function draw() {
      this.beginShape(this.TRIANGLES)
      for (face of faces) {
        this.vertex(...face[0])
        this.vertex(...face[1])
        this.vertex(...face[2])
      }
      this.endShape()
    }

    function subdivide(face) {
      var v1 = face[0]
      var v2 = face[1]
      var v3 = face[2]
      var v1_v2_midpoint = v3d.scl(v3d.add(v1, v2), 0.5)
      var v2_v3_midpoint = v3d.scl(v3d.add(v2, v3), 0.5)
      var v3_v1_midpoint = v3d.scl(v3d.add(v3, v1), 0.5)
      var f1_ = [v1, v1_v2_midpoint, v3_v1_midpoint]
      var f2_ = [v2, v2_v3_midpoint, v1_v2_midpoint]
      var f3_ = [v3, v3_v1_midpoint, v2_v3_midpoint]
      var f4_ = [v1_v2_midpoint, v2_v3_midpoint, v3_v1_midpoint]
      return [f1_, f2_, f3_, f4_]
    }

    function project(points, r) {
      var projection = []
      for (point of points) {
        projection.push(v3d.scl(v3d.nrm(point), r))
      }
      return projection
    }

    function subdivide_and_project() {
      var subdivisions = []
      for (face of faces) {
        for (sub of subdivide(face)) {
          subdivisions.push(project(sub, 1))
        }
      }
      // console.log(subdivisions)
      faces = subdivisions
    }

    function circumcenter(triangle) {
      var a = v3d.sub(triangle[0], triangle[2]),
          b = v3d.sub(triangle[1], triangle[2]),
          c = v3d.sub(triangle[0], triangle[1]),
          n = 2*v3d.msq(v3d.crs(c, b))
      var alpha = v3d.msq(b) * v3d.dot(c, a) / n,
          beta  = v3d.msq(a) * v3d.dot(v3d.scl(c,-1), b) / n,
          gamma = v3d.msq(c) * v3d.dot(v3d.scl(a,-1), v3d.scl(b,-1)) / n
      return v3d.add(v3d.add(
        v3d.scl(triangle[1], beta),
        v3d.scl(triangle[2], gamma)),
        v3d.scl(triangle[0], alpha)
      )
    }

    // console.log(circumcenter([[1,4,5],[3,1,4],[4,5,3]]))

    return {
      primitive: {
        vertices: vertices,
        faces: faces
      },
      draw: draw,
      subdivide_and_project: subdivide_and_project
    }
  }
  return icosahedron()
})
