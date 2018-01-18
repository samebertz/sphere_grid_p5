requirejs.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'lib',
    p5: 'lib/p5/p5',
    v3d: 'lib/V3D',
    utils: 'lib/utils'
  }
})

requirejs(['p5', 'v3d', 'geometry', 'utils'],
function   (p5,   v3d,   geometry,   utils) {
  var sketch = new p5(function(sketch) {
    utils.bind_to_sketch(sketch)

    var icosahedron
    sketch.setup = function() {
      sketch.createCanvas(sketch.windowWidth - 30, sketch.windowHeight - 20, sketch.WEBGL)
      sketch.camera(5, -5, 7.5, 0, 0, 0, 0, 1, 0)
      sketch.perspective(sketch.PI/4, sketch.width/sketch.height, 1, 50)
      sketch.noStroke()
      sketch.noFill()
      icosahedron = sketch.loadModel('../assets/blender_icosahedron.obj',true)
      icosahedron = geometry
      // sketch.noLoop()
    }

    sketch.draw = function() {
      // console.log('draw')
      sketch.background(72)
      // sketch.orbitControl()
      sketch.utils.drawAxes(2)
      // sketch.translate(0,0,0)
      sketch.strokeWeight(0.05)
      sketch.stroke(255)
      sketch.fill(0)
      // sketch.scale(.01, .01, .01)
      // sketch.model(icosahedron)
      sketch.rotateZ(sketch.millis() / 1000)
      icosahedron.draw.bind(sketch)()
      // utils.rotate_camera(sketch.frameCount*.01)
      // sketch.utils.rotate_camera(sketch.frameCount*.01)
      // sketch.utils.rotate_camera(sketch.frameCount*.01)
    }
  }, 'p5_wrapper')
});
