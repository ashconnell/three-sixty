var defaults    = require('lodash.defaults');
var md5         = require('md5');

var __geoms = {};

function QuadMesh (options) {
    options = options || {};
    defaults(options, {
        alignX: 0.5,
        alignY: 0.5,
        material: new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        })
    });

    var geometry = makeGeometry(options.alignX, options.alignY);
    THREE.Mesh.call(this, geometry, options.material);
}

QuadMesh.prototype = Object.create(THREE.Mesh.prototype);

function makeGeometry (alignX, alignY) {
    alignX = alignX === undefined ? 0.5 : alignX;
    alignY = alignY === undefined ? 0.5 : alignY;
    var hash = md5('' + alignX + alignY);
    var geom = __geoms[hash];
    var offsetX = 0.5 - alignX;
    var offsetY = 0.5 - alignY;
    if (!geom) {
        geom = new THREE.PlaneGeometry(1, 1, 1, 1);
        geom.vertices.forEach(function(vertex) {
            vertex.x += offsetX;
            vertex.y += offsetY;
        });
        geom.verticesNeedUpdate = true;
        __geoms[hash] = geom;
    }
    return geom;
}

module.exports = QuadMesh;
