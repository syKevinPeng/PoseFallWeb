import * as THREE from "three";
import { onMount, onCleanup, createSignal, createEffect } from "solid-js";
import { animation } from "./animation";
import { GUI } from "dat.gui";

const gui = new GUI();
export const [activeAction, setActiveAction] =
  createSignal<THREE.AnimationAction>();

export function App() {
  const [time, setTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);

  onMount(() => animation(gui, activeAction, setActiveAction));
  onCleanup(() => {
    gui.destroy();
    document.getElementById("threejs")!.replaceChildren();
  });

  createEffect(() => {
    setDuration(Math.ceil(activeAction()?.getClip().duration || 0));
    let stop = false;
    function updTime() {
      requestAnimationFrame(updTime);
      setTime(activeAction()?.time || 0);
    }
    (async () => updTime())();
    return () => {
      stop = true;
    };
  });

  return (
    <div style={{ display: "flex", "justify-content": "center" }}>
      <pre style={{ width: "5rem" }}>
        {(Math.round(time() * 100) / 100).toFixed(2)}/{duration()}
      </pre>
      <input
        type="range"
        min="0"
        max={duration()}
        step="0.01"
        value={time()}
        onInput={(e) => {
          console.log("e.currentTarget.value", e.currentTarget.value);
          const _activeAction = activeAction();
          if (_activeAction) _activeAction.time = +e.currentTarget.value;
        }}
      />
    </div>
  );
}
