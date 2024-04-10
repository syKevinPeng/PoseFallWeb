import { createMemo, createSignal, For, Index, untrack } from "solid-js";
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

const fbxDb = [
  "public/animations/0073_Impact_loc_Arms-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0025_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0038_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0083_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0091_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0005_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0088_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0053_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0035_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0003_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0052_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0094_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0070_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0059_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0030_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0080_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0092_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0084_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0089_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0027_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0069_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0090_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0075_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0013_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0057_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0086_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0029_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0059_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0033_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0024_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0033_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0071_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0036_Impact_loc_Head-Impact_attr_Push-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0055_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0050_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0022_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0012_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0011_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0027_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0056_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0055_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0010_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0002_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0019_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0051_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0068_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0061_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0001_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0062_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0054_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0001_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0040_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0064_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0003_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0010_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0016_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0051_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0021_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0086_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0072_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0020_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0021_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0019_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0005_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0046_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0061_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0068_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0046_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0009_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0036_Impact_loc_Head-Impact_attr_Push-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0062_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0002_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0065_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0008_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0043_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0091_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0054_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0045_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0052_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0030_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0058_Impact_loc_Head-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0081_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0080_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0000_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0035_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0048_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0087_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0040_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0070_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0017_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0014_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0018_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0014_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0028_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0043_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0081_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0034_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0066_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0000_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0063_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0039_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0090_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0017_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0066_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0026_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0018_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0008_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0056_Impact_loc_Head-Impact_attr_Prick-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0084_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0012_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_contort-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0044_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_spin-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0077_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0082_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0050_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0078_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0072_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0069_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0085_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0041_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0022_Impact_loc_Legs-Impact_attr_Contraction-Glitch_attr_stumble-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0047_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0037_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0075_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_stutter-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0009_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0013_Impact_loc_Torso-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0026_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0024_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0011_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0016_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0053_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0067_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0064_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0032_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0020_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0071_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0028_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0034_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0088_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0047_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_flail-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0093_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0078_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_shake-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0087_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0085_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0023_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_spin-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0038_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0031_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0060_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0041_Impact_loc_Legs-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0092_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0076_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0045_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0065_Impact_loc_Torso-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0094_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_spin-Fall_Attribute_hinge_sequences_0.fbx",
  "public/animations/0032_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_spin-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0042_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0007_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0093_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_freeze-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0083_Impact_loc_Legs-Impact_attr_Shot-Glitch_attr_freeze-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0037_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0048_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_stutter-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0006_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0057_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0089_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0073_Impact_loc_Arms-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0049_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0006_Impact_loc_Torso-Impact_attr_Prick-Glitch_attr_stumble-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0004_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0015_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_1.fbx",
  "public/animations/0049_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_flash-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0074_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_flash-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0042_Impact_loc_Torso-Impact_attr_Contraction-Glitch_attr_shake-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0079_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_shake-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0031_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_flail-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0023_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_spin-Fall_Attribute_release_sequences_1.fbx",
  "public/animations/0029_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0015_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0039_Impact_loc_Head-Impact_attr_Push-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0007_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_flail-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0025_Impact_loc_Legs-Impact_attr_Push-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0044_Impact_loc_Arms-Impact_attr_Explosion-Glitch_attr_spin-Fall_Attribute_hinge_sequences_1.fbx",
  "public/animations/0058_Impact_loc_Head-Impact_attr_Push-Glitch_attr_stumble-Fall_Attribute_let go_sequences_0.fbx",
  "public/animations/0004_Impact_loc_Legs-Impact_attr_Prick-Glitch_attr_stutter-Fall_Attribute_surrender_sequences_1.fbx",
  "public/animations/0074_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_flash-Fall_Attribute_surrender_sequences_0.fbx",
  "public/animations/0077_Impact_loc_Arms-Impact_attr_Contraction-Glitch_attr_short-Fall_Attribute_let go_sequences_1.fbx",
  "public/animations/0063_Impact_loc_Torso-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0067_Impact_loc_Head-Impact_attr_Explosion-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0076_Impact_loc_Arms-Impact_attr_Prick-Glitch_attr_short-Fall_Attribute_suspend_sequences_0.fbx",
  "public/animations/0079_Impact_loc_Head-Impact_attr_Shot-Glitch_attr_shake-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0060_Impact_loc_Arms-Impact_attr_Shot-Glitch_attr_contort-Fall_Attribute_release_sequences_0.fbx",
  "public/animations/0082_Impact_loc_Head-Impact_attr_Contraction-Glitch_attr_freeze-Fall_Attribute_surrender_sequences_1.fbx",
];

export function App() {
  const [attribs_, setAttribs] = createSignal<{
    [key: string]: string;
  }>();

  function getFbxRegex(il?: string, ia?: string, ga?: string, fa?: string) {
    const matchAll = "[a-zA-Z ]+";
    return new RegExp(
      `${il ?? matchAll}-Impact_attr_${ia ?? matchAll}-Glitch_attr_${
        ga ?? matchAll
      }-Fall_Attribute_${fa ?? matchAll}`,
      "i"
    );
  }

  const dropDownMenuList = {
    "Impact Location": createMemo(() =>
      ["Head", "Torso", "Legs", "Arms"].filter((x) => {
        console.log("Impact Location memo", x);
        const currAttribs = attribs_();
        return fbxDb.some((fbx) =>
          getFbxRegex(
            x,
            currAttribs?.["Impact Attribute"],
            currAttribs?.["Glitch Attribute"],
            currAttribs?.["Fall Attribute"]
          ).test(fbx)
        );
      })
    ),
    "Impact Attribute": createMemo(() =>
      ["Prick", "Contraction", "Explosion", "Shot", "Push"].filter((x) => {
        console.log("Impact Attribute memo", x);
        const currAttribs = attribs_();
        return fbxDb.some((fbx) =>
          getFbxRegex(
            currAttribs?.["Impact Location"],
            x,
            currAttribs?.["Glitch Attribute"],
            currAttribs?.["Fall Attribute"]
          ).test(fbx)
        );
      })
    ),
    "Glitch Attribute": createMemo(() =>
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
      ].filter((x) => {
        console.log("Glitch Attribute memo", x);
        const currAttribs = attribs_();
        return fbxDb.some((fbx) =>
          getFbxRegex(
            currAttribs?.["Impact Location"],
            currAttribs?.["Impact Attribute"],
            x,
            currAttribs?.["Fall Attribute"]
          ).test(fbx)
        );
      })
    ),
    "Fall Attribute": createMemo(() =>
      ["Release", "Let go", "Hinge", "Surrender", "Suspend"].filter((x) => {
        console.log("Fall Attribute memo", x);
        const currAttribs = attribs_();
        return fbxDb.some((fbx) =>
          getFbxRegex(
            currAttribs?.["Impact Location"],
            currAttribs?.["Impact Attribute"],
            currAttribs?.["Glitch Attribute"],
            x
          ).test(fbx)
        );
      })
    ),
  };

  const attribs = () =>
    attribs_() as
      | {
          [K in keyof typeof dropDownMenuList]: string;
        }
      | undefined;

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

        <Card class="mt-3">
          <CardHeader>
            <CardTitle>Select Attributes</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <For each={Object.entries(dropDownMenuList)} fallback={<Loading />}>
              {([attribName, xs]) => (
                <>
                  <div class="py-1 text-sm font-medium">{attribName}</div>
                  <Select
                    class="w-full h-12 text-center"
                    onChange={(x) => {
                      setAttribs((att) =>
                        att?.[attribName] == x
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

            <Button
              class="mt-4 w-full"
              disabled={
                Object.keys(attribs() ?? {}).length <
                Object.keys(dropDownMenuList).length
              }
              onClick={() => {
                console.log(attribs());
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
