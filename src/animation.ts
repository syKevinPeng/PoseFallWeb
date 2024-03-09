import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import {
  activeAction as activeActionApp,
  setActiveAction as setActiveActionApp,
} from "./App";

export function animation(
  gui: GUI,
  activeAction: typeof activeActionApp,
  setActiveAction: typeof setActiveActionApp
) {
  console.log(animation.name, "fn begin!");

  const scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(5));

  const light = new THREE.PointLight(0xffffff, 1000);
  light.position.set(2.5, 7.5, 15);
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0.8, 1.4, 1.0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("threejs")!.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);

  const animations: { [key: string]: () => void } = {
    //   default: function () {
    //     setAction(animationActions[0]);
    //   },
    //   samba: function () {
    //     setAction(animationActions[1]);
    //   },
    //   bellydance: function () {
    //     setAction(animationActions[2]);
    //   },
    //   goofyrunning: function () {
    //     setAction(animationActions[3]);
    //   },
  };

  const setAction = (toAction: THREE.AnimationAction) => {
    console.log(
      `setAction: to=${toAction} active=${activeAction()} last=${lastAction}`
    );

    if (!modelReady) throw new Error("Model not ready!!!!!");

    if (toAction != activeAction()) {
      lastAction = activeAction();
      setActiveAction(toAction);
      //lastAction.stop()
      lastAction?.fadeOut(1);
      activeAction()?.reset();
      activeAction()?.fadeIn(1);
      console.log("will play");
      activeAction()?.play();
    }
  };

  let mixer: THREE.AnimationMixer;
  let modelReady = false;
  const animationActions: THREE.AnimationAction[] = [];
  // let activeAction: THREE.AnimationAction;
  let lastAction: THREE.AnimationAction | undefined;
  const fbxLoader: FBXLoader = new FBXLoader();

  fbxLoader.load(
    "fbx_files/female_model.fbx",
    (object) => {
      if (!(object instanceof THREE.Object3D)) return;
      console.log("loaded test_model");

      object.scale.set(0.01, 0.01, 0.01);
      mixer = new THREE.AnimationMixer(object);

      object.animations.map((animation, i) => {
        const animationAction = mixer.clipAction(animation);
        animationActions.push(animationAction);
        const propname = `female_model ${i}`;
        animations[propname] = function () {
          setAction(animationAction);
        };
        animationsFolder.add(animations, propname);
        if (i === 0 || lastAction == null) setActiveAction(animationActions[0]);
      });

      scene.add(object);

      //add an animation from another file
      fbxLoader.load(
        "fbx_files/test_animation.fbx",
        (object) => {
          if (!(object instanceof THREE.Object3D)) return;
          console.log("loaded test_bone");

          object.animations.map((animation, i) => {
            const animationAction = mixer.clipAction(animation);
            animationActions.push(animationAction);
            const propname = `test_animation ${i}`;
            console.log(animation);
            animations[propname] = function () {
              setAction(animationAction);
            };
            animationsFolder.add(animations, propname);
          });

          modelReady = true;

          //   //add an animation from another file
          //   fbxLoader.load(
          //     "models/vanguard@bellydance.fbx",
          //     (object) => {
          //       console.log("loaded bellydance");
          //       const animationAction = mixer.clipAction(
          //         (object as THREE.Object3D).animations[0]
          //       );
          //       animationActions.push(animationAction);
          //       animationsFolder.add(animations, "bellydance");

          //       //add an animation from another file
          //       fbxLoader.load(
          //         "models/vanguard@goofyrunning.fbx",
          //         (object) => {
          //           console.log("loaded goofyrunning");
          //           (object as THREE.Object3D).animations[0].tracks.shift(); //delete the specific track that moves the object forward while running
          //           //console.dir((object as THREE.Object3D).animations[0])
          //           const animationAction = mixer.clipAction(
          //             (object as THREE.Object3D).animations[0]
          //           );
          //           animationActions.push(animationAction);
          //           animationsFolder.add(animations, "goofyrunning");

          //           modelReady = true;
          //         },
          //         (xhr) => {
          //           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          //         },
          //         (error) => {
          //           console.log(error);
          //         }
          //       );
          //     },
          //     (xhr) => {
          //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          //     },
          //     (error) => {
          //       console.log(error);
          //     }
          //   );
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  const stats = new Stats();
  document.getElementById("threejs")!.appendChild(stats.dom);

  const animationsFolder = gui.addFolder("Animations");
  animationsFolder.open();

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    if (modelReady) mixer.update(clock.getDelta());

    render();

    stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();
}