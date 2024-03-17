import { createSignal, For, Index } from "solid-js";
import { Loader2 } from "lucide-solid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Animation,
  activeActionAnims as activeActionAnimsS,
} from "./Animation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  let attribs: { [key: string]: string } = {};
  const [modelAnim, setModelAnim] = createSignal(modelAnims[0]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <div class="min-w-[22rem] basis-1/5 p-3 [&_h1]:font-bold [&_h1]:text-3xl [&_h1]:text-center">
        <Card>
          <CardHeader>
            <CardTitle>Select Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap">
              <For each={modelAnims} fallback={<Loading />}>
                {(model, i) => (
                  <div class="basis-1/2 p-1">
                    <Button
                      class="w-full"
                      onClick={() => {
                        setModelAnim(model);
                      }}
                    >
                      {model.name}
                    </Button>
                  </div>
                )}
              </For>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Attributes</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <For each={Object.entries(dropDownMemu)} fallback={<Loading />}>
              {([attribName, xs]) => (
                <>
                  <div class="py-1 text-sm font-medium">{attribName}</div>
                  <Select
                    class="w-full h-12 text-center"
                    onChange={(x) => {
                      attribs[attribName] = x;
                      console.log(x);
                    }}
                    options={xs}
                    placeholder={`Select a ${attribName} ...`}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.rawValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger class="text-center">
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </>
              )}
            </For>

            <Button
              class="mt-4 w-full"
              onClick={() => {
                console.log(attribs);
                const activeActionAnims = activeActionAnimsS();
                if (activeActionAnims)
                  activeActionAnims[activeActionAnims.length - 1].callback();
              }}
            >
              Show
            </Button>
          </CardContent>
        </Card>
      </div>

      <Animation {...modelAnim()} />
    </div>
  );
}

const Loading = () => <Loader2 class="animate-spin" />;
