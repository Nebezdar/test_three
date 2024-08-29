
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';


const container = document.getElementById('3d-container');


const scene = new THREE.Scene();


scene.background = new THREE.Color(0xF2F2F2);


const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0x9B9B9B);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x9B9B9A, 70);
directionalLight.position.set(20, 20, 20).normalize();
scene.add(directionalLight);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Включаем инерцию
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0.1;
controls.maxDistance = 500;

function updateRendererSize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}


updateRendererSize();


window.addEventListener('resize', updateRendererSize);


const loader = new STLLoader();
loader.load('CLMA-6-2N.FLD.RU.stl', function (geometry) {

    const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0xF2F2F2, shininess: 50 });
    const mesh = new THREE.Mesh(geometry, material);


    scene.add(mesh);


    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());


    controls.target.set(center.x, center.y, center.z);
    camera.position.set(center.x, center.y, size.z * 2);
    camera.lookAt(center);


    function animate() {
        requestAnimationFrame(animate);

        // Вращаем объект (опционально)
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;


        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
