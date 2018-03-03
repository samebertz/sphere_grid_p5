// TODO: refactor so primitive generation is separate

define(['p5', 'v3d'],
function(p5,   v3d) {
  // create an icosahedron, defined by a triangulated mesh, and having self
  // modification functions such as subdivision and mesh dual computation
  //
  // the mesh is currently represented as an array of faces, with each face
  // being an array of 3 vertex coordinates.
  //
  // something TODO eventually is change to half-edge or winged half-edge
  function icosahedron() {
    // initialize the vertices for a unit regular icosahedron centered at the origin
    // function init(origin, radius) {
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
    // }

    // little helper to keep track of neighboring vertices for each vertex. XXX
    var vertex_neighbors = []
    for (i=0;i<vertices.length;i++) {
      vertex_neighbors.push([])
    }
    // console.log(vertex_neighbors)

    // define faces for primitive, as triples of vertices
    // NOTE: currently storing value, not reference
    var faces = []
    for (let i = 0; i < 5; i++) {
      // define face 1
      faces.push([vertices[0], vertices[1+i], vertices[1+(i+1)%5]])
      // add face 1 to neighbors list for each vertex associated with it
      vertex_neighbors[0].push(4*i)
      vertex_neighbors[1+i].push(4*i)
      vertex_neighbors[1+(i+1)%5].push(4*i)

      faces.push([vertices[1+i], vertices[6+i], vertices[1+(i+1)%5]])
      vertex_neighbors[1+i].push(4*i+1)
      vertex_neighbors[6+i].push(4*i+1)
      vertex_neighbors[1+(i+1)%5].push(4*i+1)
      faces.push([vertices[1+i], vertices[6+(i+4)%5], vertices[6+i]])
      vertex_neighbors[1+i].push(4*i+2)
      vertex_neighbors[6+(i+4)%5].push(4*i+2)
      vertex_neighbors[6+i].push(4*i+2)
      faces.push([vertices[6+i], vertices[6+(i+1)%5], vertices[11]])
      vertex_neighbors[6+i].push(4*i+3)
      vertex_neighbors[6+(i+1)%5].push(4*i+3)
      vertex_neighbors[11].push(4*i+3)
      // doodle of storing vertex reference instead
      // faces.push([ 0,    1+i,        1+(i+1)%5 ])
      // faces.push([ 1+i,  6+i,        1+(i+1)%5 ])
      // faces.push([ 1+i,  6+(i+4)%5,  6+i       ])
      // faces.push([ 6+i,  6+(i+1)%5,  11        ])
    }
    // console.log(vertex_neighbors)
    // for (neighbor of vertex_neighbors) {
    //   neighbor.sort(function(a,b) {
    //     return a-b
    //   })
    // }

    // draw 3D using p5 WEBGL mode (requires bind to sketch)
    // assumes an array of faces, which are each a triple of order_vertices
    // i.e. must be triangulated
    function draw() {
      this.beginShape(this.TRIANGLES)
      for (face of faces) {
        this.vertex(...face[0])
        this.vertex(...face[1])
        this.vertex(...face[2])
      }
      this.endShape()
    }

    // TEMP draw mesh dual using p5 WEBGL mode (requires bind to sketch)
    // just a temporary hack to visualize dual computation results
    // eventually should have a single draw, or maybe have one for triangulated
    // meshes and one for arbitrary planar()?) polygons?
    // assumes an array of faces, which are aech an array of vertices
    function draw_dual() {
      // some fill gradient vars to help visualize
      var i, step = 255.0/4.0
      for (face of dual) {
        i=0
        // NOTE: WEBGL TRIANGLE_FAN draw mode relies on ordered/wound vertices
        this.beginShape(this.TRIANGLE_FAN)
        for(vertex of face) {
          // fill gradient
          this.fill(i*step,i*step,100)
          i++
          this.vertex(...vertex)
        }
        this.endShape()
      }
    }

    // subdivide triangle faces by edge midpoint
    function subdivide(face) {
      // get face vertices
      var v1 = face[0]
      var v2 = face[1]
      var v3 = face[2]
      // compute midpoints
      var v1_v2_midpoint = v3d.scl(v3d.add(v1, v2), 0.5)
      var v2_v3_midpoint = v3d.scl(v3d.add(v2, v3), 0.5)
      var v3_v1_midpoint = v3d.scl(v3d.add(v3, v1), 0.5)
      // define new faces
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

    function order_vertices(vertex_array) {
      // compute centroid
      var c = v3d.scl(vertex_array.reduce(function(accumulator, current) {
        return v3d.add(accumulator, current)
      }, [0,0,0]), 1.0/vertex_array.length)

      // compute vector from centroid to each vertex and normalize
      var spokes = vertex_array.map(function(vertex) {
        return [v3d.nrm(v3d.sub(vertex,c)), vertex]
      })
      // console.log(spokes)

      // select a reference spoke
      var ref = spokes[0][0]
      // console.log(ref)
      // compute the surface normal
      var normal = v3d.nrm(v3d.crs(spokes[0][0], spokes[1][0]))

      // for (spoke of spokes) {
      //   let spoke_angle = v3d.sep_angle(ref, spoke[0])
      //   let cross = v3d.crs(ref, spoke[0])
      //   if(v3d.dot(normal, cross) < 0) {
      //     spoke_angle = 2*Math.PI - spoke_angle
      //   }
      //   console.log(spoke_angle)
      // }

      // console.log(spokes)
      // sort spokes based on angle from reference
      spokes.sort(function(a_, b_) {
        a = a_[0]
        b = b_[0]

        var a_angle = v3d.sep_angle(ref, a)
        var a_cross = v3d.crs(ref, a)
        // console.log(a_angle)
        if(v3d.dot(normal, a_cross) < 0) {
          // console.log('CCW')
          a_angle = 2*Math.PI - a_angle
        }
        // console.log(a_angle)

        var b_angle = v3d.sep_angle(ref, b)
        var b_cross = v3d.crs(ref, b)
        // console.log(b_angle)
        if(v3d.dot(normal, b_cross) < 0) {
          // console.log('CCW')
          b_angle = 2*Math.PI - b_angle
        }
        // console.log(b_angle)

        return a_angle - b_angle
      })
      // console.log(spokes)

      // for (spoke of spokes) {
      //   let spoke_angle = v3d.sep_angle(ref, spoke[0])
      //   let cross = v3d.crs(ref, spoke[0])
      //   if(v3d.dot(normal, cross) < 0) {
      //     spoke_angle = 2*Math.PI - spoke_angle
      //   }
      //   console.log(spoke_angle)
      // }

      // just extracting vertex from [spoke, vertex] pair
      return spokes.map(function(spoke) {
        return spoke[1]
      })
    }

    var dual
    function compute_VT_dual() {
      dual = []
      var circumcenters = []
      for (face of faces) {
        circumcenters.push(...project([circumcenter(face)], 1))
      }
      for(let i=0; i<vertices.length; i++) {
        dual.push([])
        for (neighbor of vertex_neighbors[i]) {
          dual[i].push(circumcenters[neighbor])
        }
        // console.log(dual[i])
        dual[i] = order_vertices(dual[i])
        // console.log(dual[i])
        // console.log('======')
      }
      // console.log(dual)
      // return dual
      vertices = dual
    }

    // console.log(circumcenter([[1,4,5],[3,1,4],[4,5,3]]))

    return {
      primitive: {
        vertices: vertices,
        faces: faces
      },
      draw: draw,
      draw_dual: draw_dual,
      subdivide_and_project: subdivide_and_project,
      compute_VT_dual: compute_VT_dual
    }
  }
  return icosahedron()
})
