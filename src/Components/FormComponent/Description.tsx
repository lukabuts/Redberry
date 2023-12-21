import { ChangeEvent } from "react";
import DescriptionProps from "../../Types/descriptionProps";

function Description({
  description,
  smallDesc,
  setDescription,
  setSmallDesc,
}: DescriptionProps) {
  // ! Handle Description Textarea
  function handleDesc(e: ChangeEvent<HTMLTextAreaElement>) {
    const inpValue = e.target.value;
    setDescription(inpValue);
    inpValue.replace(/\s/g, "").length < 2
      ? setSmallDesc(true)
      : setSmallDesc(false);
  }

  return (
    <div>
      <label
        htmlFor="description"
        className="text-black_ text-normal font-500 leading-20"
      >
        აღწერა*
      </label>
      <textarea
        required
        onChange={handleDesc}
        autoComplete="off"
        name="description"
        className={`mt-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg h-textarea focus:outline-none resize-none text-normal text-gray_ font-400 leading-20 ${
          description.length > 0 && !smallDesc
            ? "border-success bg-success_bg"
            : description.length > 0
            ? "border-err bg-err_bg"
            : "border-input_normal bg-inp_bg "
        }`}
        placeholder="შეიყვანეთ აღწერა"
        cols={30}
        rows={10}
        id="description"
      />
      <ul className=" text-gray_ text-12 font-400 leading-20">
        <li
          className={`${
            description.trim().length === 0
              ? ""
              : !smallDesc
              ? "text-success"
              : "text-err"
          }`}
        >
          მინიმუმ 2 სიმბოლო
        </li>
      </ul>
    </div>
  );
}

export default Description;
