import './style.css'
import * as THREE from 'three';
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

function floatingtext() {

    const loader = new FontLoader();

    loader.load( 'poire.json', function ( font ) {
        const competence = ['HTML', 'PHP', 'CSS', 'Java', 'Scala', 'Python', 'Javascript', 'ReactJs', 'C', 'GIT', 'GANT', 'PERT', 'Agile', 'SQL', 'PgSql', 'Expo', 'Three.Js'];
        for (let i = 0; i < competence.length; i++) {
            let geometry = new TextGeometry( competence[i], {
		        font: font,
		        size: THREE.MathUtils.randFloat(2, 4),
	            height: THREE.MathUtils.randFloat(4, 8),
            })

            const textMesh = new THREE.Mesh( geometry, [
                new THREE.MeshPhongMaterial({color:  Math.random() * 0xffffff}),
            ]);

            function animate() {
                requestAnimationFrame(animate);
                
                textMesh.rotation.x += THREE.MathUtils.randFloat(0.01, 0.05);
                textMesh.rotation.z += THREE.MathUtils.randFloat(0.01, 0.05);
                textMesh.rotation.y += THREE.MathUtils.randFloat(0.01, 0.05);
                
                textMesh.translate.y = THREE.MathUtils.randFloat(500, 1000);
                textMesh.translate.z = THREE.MathUtils.randFloat(500, 1000);     
    
                renderer.render(scene, camera);
            }
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(75));
            textMesh.position.set(x, y, z);
            scene.add(textMesh)
            animate()
        }
    });
}

floatingtext()
const color1 = new THREE.Color('black');
scene.background = color1;


/* const idk = document.querySelectorAll('li');
for (let i = 0; i < cbox.length; i++) {
     idk[i].addEventListener("click", randomColor);
}
function randomColor() {
    let hex = '#' + Math.floor(Math.random()*16777215).toString(16);
    idk.style.backgroundColor = hex 
} */

var $cont = document.querySelector('.cont');
var $elsArr = [].slice.call(document.querySelectorAll('.el'));
var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

setTimeout(function() {
  $cont.classList.remove('s--inactive');
}, 200);

$elsArr.forEach(function($el) {
  $el.addEventListener('click', function() {
    if (this.classList.contains('s--active')) return;
    $cont.classList.add('s--el-active');
    this.classList.add('s--active');
  });
});

$closeBtnsArr.forEach(function($btn) {
  $btn.addEventListener('click', function(e) {
    e.stopPropagation();
    $cont.classList.remove('s--el-active');
    document.querySelector('.el.s--active').classList.remove('s--active');
  });
});

