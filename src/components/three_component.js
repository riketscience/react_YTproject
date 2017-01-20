import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
 
class Simple extends Component {
  constructor(props, context) {
    super(props, context);
 
    // construct the position vector here, because if we use 'new' within render, 
    // React will think that things have changed when they have not. 
    this.cssRenderer = new THREE.WebGLRenderer();
    console.log('renderer');
    console.log (this.cssRenderer);
    this.cameraPosition = new THREE.Vector3(0, 0, 3);
    this.colourConverted = this.intToRGB(this.hashCode('0xf0ff00'));
 
    this.state = {
      cubeRotation: new THREE.Euler(),
    };
 
    this._onAnimate = () => {
      // we will get this callback every frame 
 
      // pretend cubeRotation is immutable. 
      // this helps with updates and pure rendering. 
      // React will be sure that the rotation has now updated. 
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.01,
          this.state.cubeRotation.y + 0.01,
          0
        ),
      });
    };
  }
 
hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    console.log(`${str} becomes ${hash}`);
    return hash;
} 

intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    console.log("00000".substring(0, 6 - c.length) + c);
    return "00000".substring(0, 6 - c.length) + c;
}


  render() {
    const width = window.innerWidth/5; // canvas width 
    const height = window.innerHeight/5; // canvas height 

    const colour = 0xf5af0e;
    return (<React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below 
        width={width}
        height={height}
        onAnimate={this._onAnimate}>
      <scene>
        <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
        <boxGeometry
            width={1}
            height={1}
            depth={1}
        />
        <meshBasicMaterial
            color={colour}
        />
        </mesh>
    </scene>
    </React3>);
  }
}
 
export default Simple;
//ReactDOM.render(<Simple/>, document.body);