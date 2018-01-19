requirejs.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'lib',
    p5: 'lib/p5/p5.min',
    v3d: 'lib/V3D',
    sketch_utils: 'lib/sketch_utils'
  }
})

requirejs(['p5', 'v3d', 'geometry', 'sketch_utils'],
function   (p5,   v3d,   geometry,   sketch_utils) {
  var sketch = new p5(function(sketch) {
    sketch_utils.bind_to_sketch(sketch)

    var icosahedron
    sketch.setup = function() {
      sketch.createCanvas(sketch.windowWidth - 30, sketch.windowHeight - 20, sketch.WEBGL)
      sketch.camera(4, 12, 6.2, 0, 0, .2, 0, 0, -1)
      sketch.perspective(sketch.PI/12, sketch.width/sketch.height, 1, 50)
      sketch.noStroke()
      sketch.noFill()
      // icosahedron = sketch.loadModel('../assets/blender_icosahedron.obj',true)
      icosahedron = geometry
      icosahedron.draw = icosahedron.draw.bind(sketch)
      sketch.setFrameRate(30)
      // sketch.noLoop()
    }

    sketch.draw = function() {
      sketch.background(72)
      // sketch.orbitControl()
      // sketch.utils.drawAxes(1.5)
      sketch.strokeWeight(0.05)
      // sketch.scale(.01, .01, .01)
      // sketch.model(icosahedron)
      icosahedron.draw()
    }
  }, 'p5_wrapper')
});
