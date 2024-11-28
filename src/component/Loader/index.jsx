export const Loader = () => (
  <div className="flex gap-1 w-full h-full items-center justify-center">
    <div className="before-element relative w-[35px] aspect-square shadow-[inset_0_0_0_3px_white] animate-l3-1 bg-black"></div>
    <div
      className="after-element relative w-[35px] aspect-square shadow-[inset_0_0_0_3px_white] animate-l3-2 bg-black"
      style={{ '--s': -1 }}
    ></div>
  </div>
);
