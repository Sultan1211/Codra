import React from "react";
import { WorldMapDemo } from "../../components/UI/WorldMap";
import SignupFormDemo from "../../components/UI/SignupForm";
import { GridBackgroundDemo } from "../../components/UI/GridBg";

function page() {
  return (
    <div className="relative h-screen w-screen ">
      <GridBackgroundDemo />

      {/* <div className='relative z-10 h-full w-full flex items-center justify-center'>
        <SignupFormDemo/>
      </div> */}
    </div>
  );
}

export default page;
