// Simple three.js example

import * as THREE from "https://unpkg.com/three@0.112/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

var mesh, renderer, scene, camera, controls;

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 20, 20, 20 );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 20,20, 0 );
    scene.add( light );
    
    // axes
    scene.add( new THREE.AxesHelper( 20 ) );

    // geometry
    var geometry = new THREE.TorusKnotGeometry(7, 1.5, 1000, 100, 2, 5); 
    // new THREE.SphereGeometry( 5, 12, 8 );
    
    // material
    /*var material = new THREE.MeshPhongMaterial( {
        color: 0x00ffff, 
        flatShading: true,
        transparent: true,
        opacity: 0.7,
    } );*/
    const threeTone = new THREE.TextureLoader().load("img/fourTone.jpg");
    threeTone.minFilter = THREE.NearestFilter;
    threeTone.magFilter = THREE.NearestFilter;
    var material = new THREE.MeshToonMaterial({
        color: 0xFF5733,
        fog: true,
        gradientMap: threeTone
    })
    
    // mesh
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    
}

function animate() {

    requestAnimationFrame( animate );
    
    //controls.update();
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;

    renderer.render( scene, camera );

}
