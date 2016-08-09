# ThreeSixty

A [ThreeJS][three] extension for taking equirectangular screenshots of a scene

## Example

[Basic Example](http://ashconnell.github.io/three-sixty/)

## Usage

```javascript
    
    var file = threeSixty({
        renderer: renderer,
        scene: scene
    });

    // open image in the browser
    file.open();

    // save/download image
    file.save();

    // use image as a texture
    var image = new Image();
    var texture = new THREE.Texture(image);
    image.onload = function () {
        texture.needsUpdate = true;
    }
    image.src = file.data;

    // upload to your server
    myScreenshotUploader(file.data);

```

## Options

```javascript

    var options = {
        width: 2048,                    // the width of the screenshot
        height: 1024,                   // the height of the screenshot
        renderer: renderer,             // your WebGLRenderer
        scene: scene,                   // your scene
        position: new THREE.Vector3(),  // the position of the screenshot
        rotation: new THREE.Euler(),    // the rotation of the screenshot
    }

    var file = threeSixty(options);

```

[three]: http://threejs.org/
