requirejs.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'lib',
    p5: 'lib/p5/p5_x.min',
    v3d: 'lib/V3D',
    sketch_utils: 'lib/sketch_utils'
  }
})

requirejs(['p5', 'v3d', 'geometry', 'sketch_utils'],
function   (p5,   v3d,   geometry,   sketch_utils) {
  var fillScale = 0.999, strokeScale = 1.0/fillScale
  var sketch = new p5(function(sketch) {
    sketch_utils.bind_to_sketch(sketch)

    var icosahedron
    sketch.setup = function() {
      // canvas and camera setup
      sketch.createCanvas(sketch.windowWidth - 30, sketch.windowHeight - 20, sketch.WEBGL)
      sketch.camera(4, 12, 6.2, 0, 0, .2, 0, 0, -1)
      sketch.perspective(sketch.PI/12, sketch.width/sketch.height, 1, 50)

      // default/initial draw settings
      sketch.stroke(255)
      sketch.strokeWeight(0.01)
      sketch.noStroke()
      sketch.fill(0)

      // load and draw .obj icosahedron for reference
      sketch.loadModel('../assets/blender_icosahedron.obj', true, model => {
        sketch.noFill()
        sketch.stroke(255)
        sketch.scale(0.01)
        sketch.model(model)
      })

      sketch.setFrameRate(30)
      sketch.noLoop()
    }

    sketch.draw = function() {
      // background, camera, and visual aids
      sketch.background(72)
      // sketch.rotateZ(sketch.millis()/2000)
      sketch.utils.drawAxes(1.5)
      sketch.stroke(200,100,200)
      sketch.fill(0)
      sketch.box(.75)

      // draw icosahedron
    }
  }, 'p5_wrapper')
});
