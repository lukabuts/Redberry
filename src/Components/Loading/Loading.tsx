import loadingProps from "../../Types/loadingProps";

function Loading({ fixed }: loadingProps) {
  return (
    <div
      className={`grid w-full h-full place-items-center ${
        fixed && "fixed top-0 left-0"
      }`}
    >
      <div className="h-[50px] w-[50px] border-4 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
