function v3d_len (a) {
  return sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2])
}
function v3d_add (a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}
function v3d_sub (a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}
function v3d_dot (a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
function v3d_scl (a, s) {
  return [s*a[0], s*a[1], s*a[2]]
}
function v3d_nrm (a) {
  return v3d_scl(a, 1.0/v3d_len(a))
}


// coordinate conversion using trig functions from p5.js
function v3d_cartesian_to_spherical (a) {
  var r = v3d_len(a)
  var theta = atan2(a[1], a[0])
  var phi = acos(a[2] / r)
  return [r, theta, phi]
}

function v3d_spherical_to_cartesian (a) {
  var x = a[0] * sin(a[1]) * sin(a[2])
  var y = a[0] * sin(a[1]) * cos(a[2])
  var z = a[0] * cos(a[1])
  return [x, y, z]
}

function v3d_spherical_rotate_z (u, angle) {
  return [u[0], u[1], u[2] + angle]
}
