import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

const container = document.getElementById('container');
container.style.position = 'relative';
let renderer, stats, gui;

let scene, camera, controls;

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    camera.position.z = 5;
}

function initStats() {
    stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = 0;
    stats.dom.style.left = 0;
    container.appendChild(stats.dom);
}

function initGUI() {
    gui = new GUI();
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0px';
    gui.domElement.style.right = '0px';
    container.appendChild(gui.domElement);
}

function loadPLY(filePath) {
    const loader = new PLYLoader();
    loader.load(
        filePath,
        function (geometry) {
            // Create a material for the points
            let material = new THREE.PointsMaterial({
                color: 0x99aa99,
                size: 0.05, // Adjust the point size as needed
            });

            let points = new THREE.Points(geometry, material);
            points.position.set(0, 0, 0);
            points.name = "pointCloud"; // Define objectName or set a static name
            scene.add(points);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Failed to load PLY file:', error);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    stats.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

initScene();
initStats();
initGUI();
loadPLY('../assets/assignment2/results/fountain-P11/point-clouds/cloud_8_view.ply');
animate();