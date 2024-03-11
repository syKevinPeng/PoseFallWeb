import { createSignal, createEffect, Show, Switch, Match } from "solid-js";

import {
  Animation,
  activeAction,
  activeActionPaused,
  setActiveActionPaused,
} from "./Animation";
import { CirclePause, CirclePlay } from "lucide-solid";

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
  const [time, setTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [modelAnim, setModelAnim] = createSignal(modelAnims[0]);

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
    } else {
      setDuration(0);
      setTime(0);
    }
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        "flex-direction": "column",
        "overflow-y": "hidden",
      }}
    >
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
      {activeAction() != null && (
        <div
          style={{
            position: "fixed",
            bottom: "10%",
            width: "100%",
            display: "flex",
            "justify-content": "center",
            "z-index": 100,
          }}
        >
          <div
            style={{
              width: "40%",
              margin: "auto",
              display: "flex",
              "align-items": "center",
              "padding-left": "2rem",
              "padding-right": "2rem",
              "column-gap": ".3rem",
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
              style={{ "flex-grow": "1" }}
              value={time()}
              onInput={(e) => {
                console.log("e.currentTarget.value", e.currentTarget.value);
                const _activeAction = activeAction();
                if (_activeAction) _activeAction.time = +e.currentTarget.value;
              }}
            />
          </div>
        </div>
      )}
      <Animation {...modelAnim()} />
      {/* 
      
  addModelAnim({
    name: "SMPL Male",
    model: "fbx_files/male_model.fbx",
    anims: ["fbx_files/test_animation.fbx"],
  });
  addModelAnim({
    name: "SMPL Female",
    model: "fbx_files/female_model.fbx",
    anims: ["fbx_files/test_animation.fbx"],
  });
   */}
    </div>
  );
}
