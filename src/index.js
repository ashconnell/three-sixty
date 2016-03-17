/**
 * @author ashconnell / http://ashconnell.com/
 */
var defaults = require('lodash.defaults');
var QuadMesh = require('./QuadMesh');
var ThreeSixtyMaterial = require('./ThreeSixtyMaterial');
var ThreeSixtyFile = require('./ThreeSixtyFile');

require('./libs/FileSaver.min.js');
require('./libs/canvasToBlobPolyfill');

window.threeSixty = function (options) {
    options = options || {};
    defaults(options, {
        width: 2048,
        height: 1024,
        position: new THREE.Vector3(),
        rotation: new THREE.Euler()
    });

    if (!options.renderer) throw new Error('threeSixty requires a renderer');
    if (!options.scene) throw new Error('threeSixty requires a scene');

    var cubeCamera = new THREE.CubeCamera(0.1, 100, 512);
    cubeCamera.position.copy(options.position);
    cubeCamera.rotation.copy(options.rotation);
    cubeCamera.updateCubeMap(options.renderer, options.scene);

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
    var material = new ThreeSixtyMaterial(cubeCamera.renderTarget);
    var quad = new QuadMesh({ material: material });
    scene.add(quad);
    scene.add(camera);

    var originWidth = options.renderer.domElement.width;
    var originHeight = options.renderer.domElement.height;

    options.renderer.setSize(options.width, options.height);
    options.renderer.render(scene, camera);

    var imageData = options.renderer.domElement.toDataURL();
    var file = new ThreeSixtyFile(imageData);
    options.renderer.domElement.toBlob(function (blob) {
        file._setBlob(blob);
    });

    options.renderer.setSize(originWidth, originHeight);

    return file;

};
