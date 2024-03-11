import { createSignal, Index } from "solid-js";

import { Animation, activeActionAnims } from "./Animation";

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
        <div style={{ display: "flex", "justify-content": "center" }}>
          {modelAnims.map((x) => (
            <button
              onClick={() => {
                setModelAnim(x);
              }}
            >
              {x.name}
            </button>
          ))}
        </div>
        <Index each={activeActionAnims()} fallback={<div>loading...</div>}>
          {(anim, i) => (
            <button onClick={anim().callback}>{anim().name}</button>
          )}
        </Index>
      </div>
      <Animation {...modelAnim()} />
    </div>
  );
}
