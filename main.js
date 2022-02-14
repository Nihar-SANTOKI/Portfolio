import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 5);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function floatingtext() {

    const loader = new FontLoader();

    loader.load( 'poire.json', function ( font ) {
        const competence = ['HTML', 'PHP', 'CSS', 'Java', 'Scala', 'Python', 'Javascript', 'ReactJs', 'C', 'GIT', 'GANT', 'PERT', 'Agile', 'SQL', 'PgSql', 'Expo', 'Three.Js'];
        for (let i = 0; i < competence.length; i++) {
            let geometry = new TextGeometry( competence[i], {
		        font: font,
		        size: THREE.MathUtils.randFloat(2, 5),
	            height: THREE.MathUtils.randFloat(4, 8),
            })

            const textMesh = new THREE.Mesh( geometry, [
                new THREE.MeshPhongMaterial({color:  Math.random() * 0xffffff}),
            ]);

            function animate() {
                requestAnimationFrame(animate);
                
                textMesh.rotation.x += THREE.MathUtils.randFloat(0.01, 0.05);
                textMesh.rotation.z += THREE.MathUtils.randFloat(0.01, 0.075);
                textMesh.rotation.y += THREE.MathUtils.randFloat(0.05, 0.1);
                
                textMesh.translate.y = THREE.MathUtils.randFloat(500, 1000);
                textMesh.translate.z = THREE.MathUtils.randFloat(500, 1000);            
                renderer.render(scene, camera);
            }
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
            textMesh.position.set(x, y, z);
            scene.add(textMesh)
            animate()
        }
    });
}

floatingtext()
const color1 = new THREE.Color('black');
scene.background = color1;

