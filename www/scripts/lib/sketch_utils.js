define(['v3d', 'p5'],
function(v3d,   p5) {
  return {
    // rotate camera about z-axis, very clugdy
    // TODO: have initial camera params attached to sketch so can modify
    rotate_camera: function (amount) {
      var pos = v3d.crt_to_sph([4, 12, 6])
      pos = v3d.sph_rot_z(pos, amount*Math.PI)
      pos = v3d.sph_to_crt(pos)
      this.camera(pos[0], pos[1], pos[2], 0, 0, 0, 0, 0, -1)
    },
    // draw axes where +x, +y, and +z are red, green and blue respectively
    drawAxes: function (scale) {
      this.stroke(255, 0, 0)
      this.beginShape(this.LINES)
      this.vertex(0, 0, 0)
      this.vertex(scale, 0, 0)
      this.endShape()
      this.stroke(0, 255, 0)
      this.beginShape(this.LINES)
      this.vertex(0, 0, 0)
      this.vertex(0, scale, 0)
      this.endShape()
      this.stroke(0, 0, 255)
      this.beginShape(this.LINES)
      this.vertex(0, 0, 0)
      this.vertex(0, 0, scale)
      this.endShape()
    },
    // draw WEBGL triangle, param is face: [<v1>, <v2>, <v3>]
    draw_mesh_triangle: function (face) {
      this.beginShape()
      this.vertex(face[0][0], face[0][1], face[0][2])
      this.vertex(face[1][0], face[1][1], face[1][2])
      this.vertex(face[2][0], face[2][1], face[2][2])
      this.endShape(CLOSE)
    },
    // bind utils to specific sketch under sketch.utils to work with p5 instance mode
    bind_to_sketch: function(sketch) {
      sketch.utils = sketch.utils || {}
      for (var util in this) {
        if (this.hasOwnProperty(util)) {
          Object.defineProperty(
            sketch.utils,
            util,
            { value: Object.getOwnPropertyDescriptor(this, util).value.bind(sketch) }
          )
        }
      }
    }
  }
})
