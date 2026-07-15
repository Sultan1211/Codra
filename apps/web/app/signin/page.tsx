import React from "react";
import { WorldMapDemo } from "../../components/UI/WorldMap";
import SignIn from "../../components/UI/SignIn";
import { GridBackgroundDemo } from "../../components/UI/GridBg";

function page() {
  return (
    <div className="relative h-screen w-screen ">
      <GridBackgroundDemo isLogin />
    </div>
  );
}

export default page;
