#### TO DOs?
- [ ] half-edge / winged half-edge mesh data structure
- [ ] mesh baking
- [ ] other primitives
- [ ] refactor
- [ ] compute dual

#### WIP
VT dual has issue after subdivision, pretty sure because of messy mesh data structure. Dual computation relies on __faces__, __vertices__, and __vertex_neighbors__ but ___subdivide()___ only changes faces

###### data structure
Mesh for primitive currently defined as:
- first, an array of vertices, each an array of coordinates
- second, an array of faces, each an array of vertices, each an array of coordinates, hardcoded for platonic icosahedron
- third, an array of vertex neighbors (one element per vertex), each an array of indices of faces which "neighbor" - or use as a vertex - the corresponding vertex in the array of vertices

there's probably not a way to preserve a correct vertex neighbor array with the current setup, since new vertices at midpoints are created twice, since it's per face not per edge
