define(['v3d', 'p5'],
function(v3d,   p5) {
  return {
    rotate_camera: function (amount) {
      var pos = v3d.crt_to_sph([200, -200, 500])
      pos = v3d.sph_rot_z(pos, amount*PI)
      pos = v3d.sph_to_crt(pos)
      camera(pos[0], pos[1], pos[2], 0, 0, 0, 0, 1, 0)
    },
    drawAxes: function () {
      strokeWeight(3)
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
    },
    draw_mesh_triangle: function (face) {
      beginShape()
      vertex(face[0][0], face[0][1], face[0][2])
      vertex(face[1][0], face[1][1], face[1][2])
      vertex(face[2][0], face[2][1], face[2][2])
      endShape(CLOSE)
    }
  }
})
