import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.physicallyCorrectLights = false;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 1);

    const fov = 45;
    const aspect = window.innerWidth * 0.7 / window.innerHeight * 1;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();

    {
        const skyColor = 0xB1E1FF;
        const groundColor = 0xFFFFFF;
        const intensity = 1.5;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        light.position.set(0, 10, -14);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 0.3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(2, 2, 5);
        scene.add(light);
        scene.add(light.target);
    }

    {
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

        camera.near = boxSize / 100;
        camera.far = boxSize * 100;

        camera.updateProjectionMatrix();

        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }

    {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('ogs7.gltf', (gltf) => {
            const a = gltf.scene;

            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs2.gltf', (gltf) => {
                    const b = gltf.scene;
                    a.add(b);
                });
            }

            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs3.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }

            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs4.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs5.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs6.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs7.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
            {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs1.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
                        {
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('ogs8.gltf', (gltf) => {
                    const c = gltf.scene;
                    a.add(c);
                });
            }
            scene.add(a);

            const box = new THREE.Box3().setFromObject(a);

            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());

            frameArea(boxSize * 0.6, boxSize, boxCenter, camera);

            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
        });
    }

    function resizeRendererToDisplaySize(renderer) {

        const canvas = renderer.domElement;
        const width = window.innerWidth * 0.7;
        const height = window.innerHeight * 1;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = window.innerWidth * 0.7 / window.innerHeight * 1;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
