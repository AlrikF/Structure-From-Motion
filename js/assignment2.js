import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

const container = document.getElementById('container1');
container.style.position = 'relative';
let renderer, stats, gui;
let scene, camera, controls, pointCloud, dirlight, ambientLight;
let isinitialized = false;

// Container 2
const container2 = document.getElementById('container2');
container2.style.position = 'relative';
let renderer2, stats2, gui2;
let scene2, camera2, controls2, pointCloud2, dirlight2, ambientLight2;
let isinitialized2 = false;

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.5), 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    dirlight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight.position.set(0, 0, 1);
    scene.add(dirlight);

    ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);


	const loader = new PLYLoader();
    loader.load(
        '../assets/assignment2/results/fountain-P11/point-clouds/cloud_8_view.ply',
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
    

    camera.position.z = 5;
}

function initScene2() {
    scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0xffffff);
    camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.5), 0.1, 1000);

    renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight * 0.5);
    container2.appendChild(renderer2.domElement);

    controls2 = new OrbitControls(camera2, renderer2.domElement);
    controls2.minDistance = 2;
    controls2.maxDistance = 10;
    controls2.addEventListener('change', function () { renderer2.render(scene2, camera2); });

    dirlight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirlight2.position.set(0, 0, 1);
    scene2.add(dirlight2);

    ambientLight2 = new THREE.AmbientLight(0x404040, 2);
    scene2.add(ambientLight2);

    let loader2 = new PLYLoader();
    loader2.load(
        '../colmap/fountain.ply',
        function (geometry) {
            // Create a material for the points
            let material2 = new THREE.PointsMaterial({
                color: 0x99aa99,
                size: 0.05, // Adjust the point size as needed
            });

            let points2 = new THREE.Points(geometry, material2);
            points2.position.set(0, 0, 0);
            points2.name = "pointCloud"; // Define objectName or set a static name
            scene2.add(points2);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Failed to load PLY file:', error);
        }
    );

    camera2.position.z = 5;
}

function initSTATS() {
    stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = 0;
    stats.dom.style.left = 0;
    container.appendChild(stats.dom);
}

function initGUI() {
    if (!isinitialized) {
        gui = new GUI();
        pointCloud = scene.getObjectByName("pointCloud");
        // Adjust GUI according to your requirements
        isinitialized = true;
    }
}

function initSTATS2() {
    stats2 = new Stats();
    stats2.showPanel(0);
    stats2.dom.style.position = 'absolute';
    stats2.dom.style.top = 0;
    stats2.dom.style.left = 0;
    container2.appendChild(stats2.dom);
}

function initGUI2() {
    if (!isinitialized2) {
        gui2 = new GUI();
        pointCloud2 = scene2.getObjectByName("pointCloud2");
        // Adjust GUI according to your requirements
        isinitialized2 = true;
    }
}

function animate() {
    requestAnimationFrame(animate);

    pointCloud = scene.getObjectByName("pointCloud");
    if (pointCloud) {
        // Perform any necessary animations or updates
        initGUI(); // initialize the GUI after the object is loaded
    }

    renderer.render(scene, camera);
    stats.update();
}

function animate2() {
    requestAnimationFrame(animate2);

    pointCloud2 = scene2.getObjectByName("pointCloud2");
    if (pointCloud2) {
        // Perform any necessary animations or updates
        initGUI2(); // initialize the GUI after the object is loaded
    }

    renderer2.render(scene2, camera2);
    stats2.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / (window.innerHeight * 0.5);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);

    camera2.aspect = window.innerWidth / (window.innerHeight * 0.5);
    camera2.updateProjectionMatrix();
    renderer2.setSize(window.innerWidth, window.innerHeight * 0.5);
};

window.addEventListener('resize', onWindowResize, false);

initScene();
initScene2();
initSTATS();
initSTATS2();
animate();
animate2();
