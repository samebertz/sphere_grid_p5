define(['p5'],
function(p5) {
  var instance = new p5()
  function v3d_magnitude (a) {
    return p5.prototype.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2])
  }
  function v3d_scale (a, s) {
    return [s*a[0], s*a[1], s*a[2]]
  }
  function v3d_normalize (a) {
    return v3d_scale(a, 1.0/v3d_magnitude(a))
  }
  function v3d_add (a, b) {
    return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]
  }
  function v3d_subtract (a, b) {
    return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]
  }
  function v3d_dot_product (a, b) {
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
  }
  function v3d_cross_product (a, b) {
    return [
      a[1]*b[2] - a[2]*b[1],
      a[2]*b[0] - a[0]*b[2],
      a[0]*b[1] - a[1]*b[0]
    ]
  }

  // coordinate conversion using trig functions from p5.js Math
  function v3d_cartesian_to_spherical (a) {
    var r = v3d_magnitude(a)
    var theta = p5.prototype.atan2(a[1], a[0])
    var phi = p5.prototype.acos(a[2] / r)
    return [r, theta, phi]
  }

  function v3d_spherical_to_cartesian (a) {
    var x = a[0] * p5.prototype.sin(a[1]) * p5.prototype.sin(a[2])
    var y = a[0] * p5.prototype.sin(a[1]) * p5.prototype.cos(a[2])
    var z = a[0] * p5.prototype.cos(a[1])
    return [x, y, z]
  }

  function v3d_spherical_rotate_z (a, angle) {
    return [a[0], a[1], a[2] + angle]
  }

  return {
    mag:        v3d_magnitude,
    scl:        v3d_scale,
    nrm:        v3d_normalize,
    add:        v3d_add,
    sub:        v3d_subtract,
    dot:        v3d_dot_product,
    crs:        v3d_cross_product,
    crt_to_sph: v3d_cartesian_to_spherical,
    sph_to_crt: v3d_spherical_to_cartesian,
    sph_rot_z:  v3d_spherical_rotate_z
  }
})
