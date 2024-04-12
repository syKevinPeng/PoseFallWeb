import * as THREE from "three";

import { createEffect, createSignal, onCleanup } from "solid-js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { untrack } from "solid-js/web";
import { CirclePause, CirclePlay } from "lucide-solid";

//
//
//

const [activeActionPaused, setActiveActionPaused] = createSignal(true);
export const [activeActionAnim, setActiveActionAnim] = createSignal<{
  // name: string;
  anim: THREE.AnimationAction;
  callback: () => void;
}>();

//
//
//

const [activeAction, setActiveAction_] = createSignal<THREE.AnimationAction>();
function setActiveAction(action?: THREE.AnimationAction) {
  setActiveAction_(action);
  setActiveActionPaused(action?.paused ?? true);
}

//
//
//

export const [animsUrl_, setAnimsUrl] = createSignal<string>();

//
//
//

const fbxLoader: FBXLoader = new FBXLoader();
let mixer: THREE.AnimationMixer | undefined;
let lastAction: THREE.AnimationAction | undefined;
let modelReady = false;
const lastObjectsInScene: THREE.Object3D[] = [];

//
//
//

export function Animation(props: { model: string }) {
  const [time, setTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);

  let statsRef: HTMLDivElement | undefined;
  let rendererRef: HTMLDivElement | undefined;

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
    props.model; // do not remove
    setActiveAction();
    setActiveActionAnim();
  });

  //
  //
  // handle anim time and duration
  createEffect(() => {
    const dur = activeAction()?.getClip().duration;
    if (dur != null && dur > 1) {
      setDuration(dur);

      let stop = false;
      function updTime() {
        if (stop || duration() === 0) return;
        requestAnimationFrame(updTime);
        // console.log(
        //   "activeAction()?.time",
        //   activeAction()?.time,
        //   activeAction()?.getClip().duration
        // );
        setTime(activeAction()?.time || 0);
      }
      updTime();

      return () => {
        stop = true;
      };
      //
      //
    }

    //else
    setDuration(0);
    setTime(0);
  });

  //
  //
  //

  function processAnimations(animation: THREE.AnimationClip) {
    {
      if (mixer == null) {
        alert("Mixer not ready!!!!!");
        throw new Error("Mixer not ready!!!!!");
      }
      // const propname =
      //   name + (notes != null ? ` ${notes}` : "") + (i != 0 ? ` ${i + 1}` : "");
      const animationAction = mixer.clipAction(animation);
      setActiveActionAnim({
        // name: propname,
        anim: animationAction,
        callback: () => {
          setAction(animationAction);
        },
      });
    }
  }

  function setAction(toAction: THREE.AnimationAction) {
    if (!modelReady) {
      alert("Model not ready!!!!!");
      throw new Error("Model not ready!!!!!");
    }

    if (toAction !== activeAction()) {
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

  //
  //
  //
  createEffect(() => {
    if (rendererRef == null) return;
    // console.log(`Loading ${props.name}!`);

    const scene = new THREE.Scene();
    // scene.add(new THREE.AxesHelper(10));

    const light = new THREE.PointLight(0xffffff, 500);
    light.position.set(2.5, 7.5, 15);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x404040); // Set background color to darker gray
    onWindowResize(false);
    rendererRef.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);

    //
    //
    //
    window.addEventListener("resize", () => onWindowResize(true), false);
    function onWindowResize(shouldRender: boolean) {
      const w = Math.min(
        rendererRef?.clientWidth ?? Number.POSITIVE_INFINITY,
        document.body.clientWidth
      );
      const h = Math.min(
        rendererRef?.clientHeight ?? Number.POSITIVE_INFINITY,
        document.body.clientHeight
      );
      // console.log("w", w, "h", h);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);

      if (shouldRender) render();
    }

    addModelAnim(props.model);

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

    function addModelAnim(model: string) {
      // gui.destroy();
      // gui = new GUI();

      for (const x of lastObjectsInScene) scene.remove(x);

      lastObjectsInScene.length = 0;

      mixer?.uncacheRoot(mixer.getRoot());
      mixer?.stopAllAction();
      untrack(() => {
        const x = activeActionAnim();
        if (x != null) {
          x.anim.stop();
          mixer?.uncacheClip(x.anim.getClip());
          mixer?.uncacheAction(x.anim.getClip());
        }
      });

      fbxLoader.load(
        model,
        (object) => {
          if (!(object instanceof THREE.Object3D)) return;

          object.scale.set(0.01, 0.01, 0.01);
          mixer = new THREE.AnimationMixer(object);

          object.animations.map((anim, i) => processAnimations(anim));

          lastObjectsInScene.push(object);
          scene.add(object);

          // for (const anim of anims ?? [])
          //   fbxLoader.load(
          //     anim,
          //     (object) => {
          //       if (!(object instanceof THREE.Object3D)) return;

          //       object.animations.map((anim, i) =>
          //         processAnimations(anim, i, "Anim")
          //       );

          //       lastObjectsInScene.push(object);
          //     },
          //     (xhr) => {
          //       //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          //     },
          //     console.error
          //   );

          modelReady = true;
        },
        (xhr) => {
          //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        console.error
      );
    }
  });

  createEffect(() => {
    modelReady = false;
    const animsUrl = animsUrl_();
    if (animsUrl != null)
      fbxLoader.load(
        animsUrl,
        (object) => {
          if (!(object instanceof THREE.Object3D)) return;

          object.animations.map((anim) => processAnimations(anim));

          lastObjectsInScene.push(object);

          modelReady = true;
          activeActionAnim()?.callback();
        },
        (xhr) => {
          //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        console.error
      );
  });

  return (
    <div
      style={{
        flex: 1,
        // display: "flex",
        // "flex-direction": "column",
        // "align-items": "center",
        position: "relative",
      }}
    >
      {activeAction() != null && duration() > 0 && (
        <div
          id="controls"
          style={{
            width: "100%",
            margin: "auto",
            position: "absolute",
            bottom: "10%",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            "column-gap": ".3rem",
            "z-index": 100,
            "background-color": "rgba(0, 0, 0, 0.2)",
          }}
        >
          {activeActionPaused() ? (
            <CirclePlay
              color="white"
              onClick={() => {
                const _activeAction = activeAction();
                if (_activeAction) {
                  _activeAction.paused = !_activeAction.paused;
                  setActiveActionPaused(false);
                }
              }}
            />
          ) : (
            <CirclePause
              color="white"
              onClick={() => {
                const _activeAction = activeAction();
                if (_activeAction) {
                  _activeAction.paused = !_activeAction.paused;
                  setActiveActionPaused(true);
                }
              }}
            />
          )}
          <pre
            style={{
              display: "inline-block",
              "flex-basis": "3rem",
              color: "white",
            }}
          >
            {(Math.round(time() * 100) / 100).toFixed(2)}/
            {(Math.round(duration() * 100) / 100).toFixed(2)}
          </pre>
          <input
            type="range"
            min="0"
            max={duration()}
            step="0.01"
            style={{ width: "30%" }}
            value={time()}
            onInput={(e) => {
              console.log("e.currentTarget.value", e.currentTarget.value);
              const _activeAction = activeAction();
              if (_activeAction) _activeAction.time = +e.currentTarget.value;
            }}
          />
        </div>
      )}
      <div
        id="stats"
        ref={statsRef}
        style={{ position: "absolute", bottom: 0 }}
      />
      <div id="renderer" ref={rendererRef} style={{ height: "100%" }} />
    </div>
  );
}
