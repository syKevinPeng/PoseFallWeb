import * as THREE from "three";

import { createEffect, createSignal, onCleanup } from "solid-js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

export const [activeAction, setActiveAction_] =
  createSignal<THREE.AnimationAction>();
export const [activeActionPaused, setActiveActionPaused] = createSignal(true);

export function setActiveAction(action: THREE.AnimationAction) {
  setActiveAction_(action);
  setActiveActionPaused(action.paused);
}

export function Animation(props: {
  name: string;
  model: string;
  anims?: string[];
}) {
  let statsRef: HTMLDivElement | undefined;
  let guiRef: HTMLDivElement | undefined;
  let rendererRef: HTMLDivElement | undefined;
  const [guiInfoS, setGuiInfo] = createSignal<{
    gui: GUI;
    modelsFolder: GUI;
    animationsFolder: GUI;
  }>();

  //
  //
  //
  const stats = new Stats();
  stats.dom.style.height = "100%";
  stats.dom.style.position = "absolute";
  stats.dom.style.display = "flex";
  stats.dom.style.flexDirection = "column-reverse";
  createEffect(() => {
    statsRef?.replaceChildren(stats.dom);
  });

  //
  //
  //
  createEffect(() => {
    props.name; // do not remove

    const gui = new GUI({ autoPlace: false });
    const modelsFolder = gui.addFolder("Models");
    const animationsFolder = gui.addFolder("Animations");
    setGuiInfo({ gui, modelsFolder, animationsFolder });

    modelsFolder.open();
    animationsFolder.open();
    gui.domElement.style.position = "absolute";
    gui.domElement.style.right = "0";

    guiRef?.replaceChildren(gui.domElement);
  });

  //
  //
  //
  createEffect(() => {
    if (rendererRef == null) return;
    console.log(`Loading ${props.name}!`);

    const lastObjectsInScene: THREE.Object3D[] = [];
    const lastAnimActions: THREE.AnimationAction[] = [];
    let modelReady = false;

    let mixer: THREE.AnimationMixer | undefined;
    let animationCallbacks: { [key: string]: () => void } = {};
    let lastAction: THREE.AnimationAction | undefined;

    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));

    const light = new THREE.PointLight(0xffffff, 500);
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
    renderer.setClearColor(0x404040); // Set background color to darker gray
    onWindowResize(false);
    rendererRef.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    window.addEventListener("resize", () => onWindowResize(true), false);
    function onWindowResize(shouldRender: boolean) {
      const w = Math.min(
        rendererRef?.clientWidth ?? Infinity,
        document.body.clientWidth
      );
      const h = Math.min(
        rendererRef?.clientHeight ?? Infinity,
        document.body.clientHeight
      );
      console.log("w", w, "h", h);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);

      if (shouldRender) render();
    }

    addModelAnim(props);

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!modelReady) {
        // throw new Error("Model not ready!!!!!");
        return;
      }

      controls.update();

      if (mixer != null) mixer.update(clock.getDelta());

      render();

      stats.update();
    }

    animate();

    function render() {
      renderer.render(scene, camera);
    }

    function addModelAnim({
      name,
      model,
      anims,
    }: {
      name: string;
      model: string;
      anims?: string[];
    }) {
      // gui.destroy();
      // gui = new GUI();

      lastObjectsInScene.forEach((x) => {
        scene.remove(x);
      });
      lastObjectsInScene.length = 0;

      mixer?.uncacheRoot(mixer.getRoot());
      mixer?.stopAllAction();
      lastAnimActions.forEach((x) => {
        x.stop();
        mixer?.uncacheClip(x.getClip());
        mixer?.uncacheAction(x.getClip());
      });
      animationCallbacks = {};

      const fbxLoader: FBXLoader = new FBXLoader();

      fbxLoader.load(
        model,
        (object) => {
          if (!(object instanceof THREE.Object3D)) return;

          object.scale.set(0.01, 0.01, 0.01);
          mixer = new THREE.AnimationMixer(object);

          object.animations.map((animation, i) => {
            if (mixer == null) {
              alert("Mixer not ready!!!!!");
              throw new Error("Mixer not ready!!!!!");
            }
            const animationAction = mixer.clipAction(animation);
            lastAnimActions.push(animationAction);

            const propname = name + (i != 0 ? ` ${i + 1}` : "");
            animationCallbacks[propname] = function () {
              setAction(animationAction);
            };
            guiInfoS()?.modelsFolder.add(animationCallbacks, propname);
            // if (i === 0 || lastAction == null) setActiveAction(animationActions[0]);
          });

          lastObjectsInScene.push(object);
          scene.add(object);

          for (const anim of anims ?? [])
            fbxLoader.load(
              anim,
              (object) => {
                if (!(object instanceof THREE.Object3D)) return;

                object.animations.map((animation, i) => {
                  if (mixer == null) {
                    alert("Mixer not ready!!!!!");
                    throw new Error("Mixer not ready!!!!!");
                  }
                  const animationAction = mixer.clipAction(animation);
                  lastAnimActions.push(animationAction);

                  const propname =
                    `${name} Animation` + (i != 0 ? ` ${i + 1}` : "");
                  animationCallbacks[propname] = function () {
                    setAction(animationAction);
                  };
                  guiInfoS()?.animationsFolder.add(
                    animationCallbacks,
                    propname
                  );
                });

                lastObjectsInScene.push(object);
              },
              (xhr) => {
                //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
              },
              console.error
            );

          modelReady = true;
        },
        (xhr) => {
          //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        console.error
      );
    }

    function setAction(toAction: THREE.AnimationAction) {
      if (!modelReady) {
        alert("Model not ready!!!!!");
        throw new Error("Model not ready!!!!!");
      }

      if (toAction != activeAction()) {
        console.log(
          `setAction: to=${toAction} active=${activeAction()} last=${lastAction}`
        );
        lastAction = activeAction();
        setActiveAction(toAction);
        lastAction?.fadeOut(1);
        activeAction()?.reset();
        activeAction()?.fadeIn(1);
        activeAction()?.play();
        // lastAction?.stop();
      }
    }
  });

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      <div ref={statsRef} style={{ position: "relative" }} />
      <div ref={guiRef} />
      <div ref={rendererRef} style={{ flex: 1 }} />
    </div>
  );
}
