import { createEffect, createMemo, createSignal, For } from "solid-js";
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
  activeActionAnim as activeActionAnimsS,
  setAnimsUrl,
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
  // {
  //   name: "SMPL Male",
  //   model: "fbx_files/male_model.fbx",
  //   // anims: ["fbx_files/test_animation.fbx"],
  // },
  // {
  //   name: "SMPL Female",
  //   model: "fbx_files/female_model.fbx",
  //   // anims: ["fbx_files/test_animation.fbx"],
  // },
  {
    name: "SMPL Kate",
    model: "fbx_files/SMPL-Kate.fbx",
  },
];

const fbxDb = [
  "animations/0073_Impact_loc_Arms-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0025_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0038_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0083_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "animations/0091_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0005_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0088_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "animations/0053_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0035_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "animations/0003_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0052_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0094_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0070_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_release_sequences_1.fbx",
  "animations/0059_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0030_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0080_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0092_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0084_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0089_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0027_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "animations/0069_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "animations/0090_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "animations/0075_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "animations/0013_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0057_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "animations/0086_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0029_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0059_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0033_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0024_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "animations/0033_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0071_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0036_Impact_loc_Head-Impact_attr_Push-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0055_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0050_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0022_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "animations/0012_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_release_sequences_0.fbx",
  "animations/0011_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0027_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "animations/0056_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0055_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0010_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0002_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "animations/0019_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0051_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0068_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0061_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0001_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0062_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0054_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0001_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0040_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "animations/0064_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0003_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0010_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0016_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0051_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0021_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0086_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0072_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "animations/0020_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0021_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0019_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0005_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0046_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "animations/0061_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0068_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0046_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "animations/0009_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "animations/0036_Impact_loc_Head-Impact_attr_Push-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0062_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0002_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "animations/0065_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0008_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0043_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0091_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0054_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0045_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0052_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0030_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0058_Impact_loc_Head-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0081_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0080_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0000_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "animations/0035_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "animations/0048_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "animations/0087_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0040_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "animations/0070_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_release_sequences_0.fbx",
  "animations/0017_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0014_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0018_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0014_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0028_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0043_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0081_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0034_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0066_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0000_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "animations/0063_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0039_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0090_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "animations/0017_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0066_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0026_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0018_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0008_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0056_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0084_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0012_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_release_sequences_1.fbx",
  "animations/0044_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_spin-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0077_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0082_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0050_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0078_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0072_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "animations/0069_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "animations/0085_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0041_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0022_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "animations/0047_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0037_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0075_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "animations/0009_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "animations/0013_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0026_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0024_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "animations/0011_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0016_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0053_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0067_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0064_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0032_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0020_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0071_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0028_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0034_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0088_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "animations/0047_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0093_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0078_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0087_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0085_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0023_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_spin-Fall_Attribute_release_sequences_0.fbx",
  "animations/0038_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0031_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "animations/0060_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_release_sequences_1.fbx",
  "animations/0041_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0092_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0076_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0045_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0065_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0094_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_hinge_sequences_0.fbx",
  "animations/0032_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0042_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0007_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0093_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0083_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "animations/0037_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0048_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "animations/0006_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0057_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "animations/0089_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0073_Impact_loc_Arms-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0049_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "animations/0006_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0004_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0015_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "animations/0049_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "animations/0074_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0042_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0079_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "animations/0031_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "animations/0023_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_spin-Fall_Attribute_release_sequences_1.fbx",
  "animations/0029_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0015_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0039_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0007_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0025_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0044_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_spin-Fall_Attribute_hinge_sequences_1.fbx",
  "animations/0058_Impact_loc_Head-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_0.fbx",
  "animations/0004_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "animations/0074_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "animations/0077_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "animations/0063_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0067_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0076_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "animations/0079_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "animations/0060_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_release_sequences_0.fbx",
  "animations/0082_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
];

function getFbxRegex(
  il?: string | null,
  ia?: string | null,
  ga?: string | null,
  fa?: string | null
) {
  const matchAll = "[a-zA-Z ]+";
  return new RegExp(
    `${il ?? matchAll}-Impact_attr_${ia ?? matchAll}-Glitch_attr_${
      ga ?? matchAll
    }-Fall_Attribute_${fa ?? matchAll}`,
    "i"
  );
}

const getAvailableIL = (
  currAttribs: { [key: string]: string | null } | undefined
) =>
  ["Head", "Torso", "Legs", "Arms"].filter((x) =>
    fbxDb.some((fbx) =>
      getFbxRegex(
        x,
        currAttribs?.["Impact Attribute"],
        currAttribs?.["Glitch Attribute"],
        currAttribs?.["Fall Attribute"]
      ).test(fbx)
    )
  );

const getAvailableIA = (
  currAttribs: { [key: string]: string | null } | undefined
) =>
  ["Prick", "Contraction", "Explosion", "Shot", "Push"].filter((x) =>
    fbxDb.some((fbx) =>
      getFbxRegex(
        currAttribs?.["Impact Location"],
        x,
        currAttribs?.["Glitch Attribute"],
        currAttribs?.["Fall Attribute"]
      ).test(fbx)
    )
  );

const getAvailableGA = (
  currAttribs: { [key: string]: string | null } | undefined
) =>
  [
    "Shake",
    "Fail",
    "Flash",
    "Stutter",
    "Short",
    "Contort",
    "Stumble",
    "Spin",
    "Freeze",
  ].filter((x) =>
    fbxDb.some((fbx) =>
      getFbxRegex(
        currAttribs?.["Impact Location"],
        currAttribs?.["Impact Attribute"],
        x,
        currAttribs?.["Fall Attribute"]
      ).test(fbx)
    )
  );

const getAvailableFA = (
  currAttribs: { [key: string]: string | null } | undefined
) =>
  ["Release", "Let go", "Hinge", "Surrender", "Suspend"].filter((x) =>
    fbxDb.some((fbx) =>
      getFbxRegex(
        currAttribs?.["Impact Location"],
        currAttribs?.["Impact Attribute"],
        currAttribs?.["Glitch Attribute"],
        x
      ).test(fbx)
    )
  );

export function App() {
  const [attribs_, setAttribs] = createSignal<{
    [key: string]: string | null;
  }>();

  // createEffect(() => {
  //   console.log("effect:", attribs_());
  // });

  const dropDownMenuList = {
    "Impact Location": createMemo(() => getAvailableIL(attribs_())),
    "Impact Attribute": createMemo(() => getAvailableIA(attribs_())),
    "Glitch Attribute": createMemo(() => getAvailableGA(attribs_())),
    "Fall Attribute": createMemo(() => getAvailableFA(attribs_())),
  };

  const attribs = () =>
    attribs_() as
      | {
          [K in keyof typeof dropDownMenuList]: string | null;
        }
      | undefined;

  //
  //
  //
  //
  //

  const filteredFbx = createMemo(() => {
    const currAttribs = attribs();
    if (
      currAttribs != null &&
      Object.keys(dropDownMenuList).every((x) =>
        Object.keys(currAttribs).includes(x)
      )
    ) {
      return fbxDb.filter((fbx) =>
        getFbxRegex(
          currAttribs["Impact Location"],
          currAttribs["Impact Attribute"],
          currAttribs["Glitch Attribute"],
          currAttribs["Fall Attribute"]
        ).test(fbx)
      );
    }
  });

  //
  //
  //
  //
  //

  const [modelAnim, setModelAnim] = createSignal(modelAnims[0]);
  const [loading, setLoading] = createSignal(false);

  //
  //
  //
  //
  //

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
      class=" [&_button:active]:scale-95"
    >
      <div class="min-w-[22rem] basis-1/5 p-3 [&_h1]:font-bold [&_h1]:text-3xl [&_h1]:text-center">
        <Card>
          <CardHeader>
            <CardTitle class="font-bold">Select Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap">
              <For each={modelAnims} fallback={<Loading />}>
                {(model) => (
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

        <Card class="mt-3">
          <CardHeader>
            <CardTitle class="font-bold">Select Attributes</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <For each={Object.entries(dropDownMenuList)} fallback={<Loading />}>
              {([attribName, xs]) => (
                <>
                  <div class="py-1 text-sm font-medium">{attribName}</div>
                  <Select
                    class="w-full h-12 text-center"
                    value={
                      attribs()?.[attribName as keyof typeof dropDownMenuList]
                    }
                    onChange={(x) => {
                      setAttribs((att) =>
                        att?.[attribName] === x
                          ? att
                          : {
                              ...att,
                              [attribName]: x,
                            }
                      );
                      // console.log(attribName, ":", x);
                    }}
                    options={xs()}
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

            {/* <div class="flex gap-2">
              <For each={filteredFbx() ?? []}>
                {(fbx, i) => (
                  <Button
                    title={fbx}
                    onClick={() => {
                      setAnimsUrl(fbx);
                    }}
                  >
                    {i() + 1}
                  </Button>
                )}
              </For>
            </div> */}

            <Button
              class="mt-4 w-full"
              disabled={
                loading() ||
                Object.keys(attribs() ?? {}).length <
                  Object.keys(dropDownMenuList).length
              }
              onClick={() => {
                setLoading(true);
                new Promise((resolve) => setTimeout(resolve, 2000))
                  .then(() => {
                    const fbx = filteredFbx();
                    if (fbx != null && fbx.length > 0)
                      setAnimsUrl(shuffle(fbx));
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              {loading() ? <Loading /> : "Show"}
            </Button>
            <div class="flex gap-x-2">
              <Button
                class="mt-4 flex-1"
                variant="destructive"
                disabled={Object.values(attribs() ?? {}).every(
                  (x) => x == null
                )}
                onClick={() => {
                  setAttribs(() => undefined);
                }}
              >
                Reset
              </Button>
              <Button
                class="mt-4 flex-1"
                variant="outline"
                onClick={() => {
                  const shuffledAttribs: ReturnType<typeof attribs> = {
                    "Impact Location": null,
                    "Impact Attribute": null,
                    "Glitch Attribute": null,
                    "Fall Attribute": null,
                  };
                  shuffledAttribs["Impact Location"] = shuffle(
                    getAvailableIL(shuffledAttribs)
                  );
                  shuffledAttribs["Impact Attribute"] = shuffle(
                    getAvailableIA(shuffledAttribs)
                  );
                  shuffledAttribs["Glitch Attribute"] = shuffle(
                    getAvailableGA(shuffledAttribs)
                  );
                  shuffledAttribs["Fall Attribute"] = shuffle(
                    getAvailableFA(shuffledAttribs)
                  );
                  // console.log("shuffledAttribs", shuffledAttribs);
                  setAttribs(shuffledAttribs);
                }}
              >
                Shuffle
              </Button>
            </div>
            {/*  */}
          </CardContent>
        </Card>
      </div>

      <Animation model={modelAnim().model} />
    </div>
  );
}

const Loading = () => <Loader2 class="animate-spin" />;

const shuffle = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
