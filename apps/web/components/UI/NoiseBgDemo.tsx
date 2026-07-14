import { NoiseBackground } from "./NoiseBackground";

export function NoiseBackgroundDemo({onClick}: {onClick: ()=>void}) {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(37, 99, 235)", // blue-600
          "rgb(59, 130, 246)", // blue-500
          "rgb(14, 165, 233)", // sky-500 (#0ea5e9)
        ]}
      >
        <button  onClick={onClick} className="h-full w-full cursor-pointer rounded-full bg-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 ">
          Start Now! &rarr;
        </button>
      </NoiseBackground>
    </div>
  );
}
