requirejs.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'lib',
    p5: 'lib/p5/p5',
    v3d: 'lib/V3D'
  }
})

requirejs(['p5', 'v3d', 'geometry', 'lib/utils'],
function   (p5,   v3d,   geometry,      util) {
  var sketch = new p5(function(sketch) {
    sketch.setup = function() {
      sketch.createCanvas(sketch.windowWidth - 20, sketch.windowHeight - 20, p5.WEBGL)
      // sketch.camera(10, -10, 15, 0, 0, 0, 0, 1, 0)
      // sketch.perspective(p5.PI/16, sketch.width/sketch.height, 1, 100)
      sketch.camera(300, -200, 500, 0, 0, 0, 0, 1, 0)
      sketch.perspective(PI/4, sketch.width/sketch.height, 100, 1000)
      // sketch.noStroke()
      sketch.strokeWeight(2)
      sketch.noFill()

      ico = sketch.loadModel('../assets/blender_icosahedron.obj', true)
      // ico = icosahedron()

      // sketch.noLoop()
    }

    sketch.draw = function() {
      sketch.background(72)
      util.drawAxes()
      sketch.orbitControl()
      // util.rotate_camera(sketch.frameCount*.01)
      // sketch.rotateZ(sketch.millis() / 1000)

      // sketch.fill(0)
      // sketch.stroke(200, 100, 100)
      // sketch.strokeWeight(.05)
      sketch.model(ico)
      console.log(ico)
      // sketch.scale(.01, .01, .01)
      // for(face of ico.faces) {
      //   sketch.fill(0)
      //   sketch.stroke(255)
      //   sketch.strokeWeight(.2)
      //   util.draw_mesh_triangle(face)
      //   for(subdivision of bisect(face)) {
      //     sketch.noFill()
      //     sketch.stroke(200, 100, 200)
      //     sketch.strokeWeight(.1)
      //     draw_triangle(project(subdivision, 1))
      //     for(subdivision_2 of bisect(subdivision)) {
      //       sketch.stroke(100, 200, 200)
      //       sketch.strokeWeight(.05)
      //       draw_triangle(project(subdivision_2, 1))
      //     }
      //   }
      // }

      sketch.noLoop()
    }
  })
});
