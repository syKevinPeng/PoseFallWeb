import { createSignal, For, Index } from "solid-js";

import { Animation, activeActionAnims } from "./Animation";
import { Loader2 } from "lucide-solid";

const modelAnims = [
  {
    name: "SMPL Male",
    model: "fbx_files/male_model.fbx",
    anims: ["fbx_files/test_animation.fbx"],
  },
  {
    name: "SMPL Female",
    model: "fbx_files/female_model.fbx",
    anims: ["fbx_files/test_animation.fbx"],
  },
];

export function App() {
  const [modelAnim, setModelAnim] = createSignal(modelAnims[0]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <div style={{ "flex-basis": "20%" }}>
        <div
          style={{
            display: "flex",
            "flex-flow": "column",
            "align-items": "center",
          }}
        >
          <h1>Select Models</h1>
          <For each={modelAnims} fallback={<Loading />}>
            {(model, i) => (
              <button
                style={{ width: "80%", height: "3rem" }}
                onClick={() => {
                  setModelAnim(model);
                }}
              >
                {model.name}
              </button>
            )}
          </For>
        </div>
        <div
          style={{
            display: "flex",
            "flex-flow": "column",
            "align-items": "center",
          }}
        >
          <h1>Select Animation</h1>
          <For each={activeActionAnims()} fallback={<Loading />}>
            {(anim, i) => (
              <button
                style={{ width: "80%", height: "3rem" }}
                onClick={anim.callback}
              >
                {anim.name}
              </button>
            )}
          </For>
        </div>
      </div>
      <Animation {...modelAnim()} />
    </div>
  );
}

const Loading = () => <Loader2 class="animate-spin" />;
