import { createSignal, For, Index } from "solid-js";

import {
  Animation,
  activeActionAnims as activeActionAnimsS,
} from "./Animation";
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

const dropDownMemu = {
  "Impact Location": ["Head", "Torso", "Legs", "Arms"],
  "Impact Attribute": ["Prick", "Contraction", "Explosion", "Shot", "Push"],
  "Glitch Attribute": [
    "Shake",
    "Fail",
    "Flash",
    "Stutter",
    "Short",
    "Contort",
    "Stumble",
    "Spin",
    "Freeze",
  ],
  "Fall Attribute": ["Release", "Let go", "Hinge", "Surrender", "Suspend"],
};

export function App() {
  let attribRefs: { [key: string]: HTMLSelectElement } = {};
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
          <h1>Select Attributes</h1>
          <For each={Object.entries(dropDownMemu)} fallback={<Loading />}>
            {([attribName, xs]) => (
              <>
                <h2>{attribName}</h2>
                <select
                  style={{
                    width: "80%",
                    height: "3rem",
                    "text-align": "center",
                  }}
                  ref={(ref) => {
                    attribRefs[attribName] = ref;
                  }}
                >
                  <For each={xs} fallback={<Loading />}>
                    {(x) => (
                      <option
                        value={x}
                        // onClick={anim.callback}
                      >
                        {x}
                      </option>
                    )}
                  </For>
                </select>
              </>
            )}
          </For>
          <button
            onClick={() => {
              console.log(
                Object.entries(attribRefs).map(([k, v]) => ({
                  [k]: v.value,
                }))
              );
              const activeActionAnims = activeActionAnimsS();
              if (activeActionAnims)
                activeActionAnims[activeActionAnims.length - 1].callback();
            }}
          >
            Show
          </button>
        </div>

        {/* <div
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
        </div> */}
      </div>
      <Animation {...modelAnim()} />
    </div>
  );
}

const Loading = () => <Loader2 class="animate-spin" />;
