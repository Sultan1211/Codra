import React from "react";
import { GridBackgroundDemo } from "../../components/UI/GridBg";

function page() {
  return (
    <div className="relative h-screen w-screen ">
      <GridBackgroundDemo isLogin={false} />

      {/* <div className='relative z-10 h-full w-full flex items-center justify-center'>
        <SignupFormDemo/>
      </div> */}
    </div>
  );
}

export default page;
