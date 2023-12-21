import folder_add from "../../assets/images/folder_add.svg";

function Image() {
  return (
    <div>
      <label
        htmlFor="image"
        className="text-black_ text-normal font-500 leading-20"
      >
        აირჩიეთ ფოტო
      </label>
      <div className="relative flex flex-col items-center justify-center border-dashed gap-addBlog h-imgUpload bg-imgUpload border-input border-imgUpload rounded-12">
        <img width={40} height={40} src={folder_add} alt="Add image" />
        <p className="text-black_ text-normal font-400 leading-20 ">
          ჩააგდეთ ფაილი აქ ან{" "}
          <span className="underline font-500">აირჩიეთ ფაილი</span>
        </p>
        <input
          required
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          name="image"
          accept="image/*"
          id="image"
        />
      </div>
    </div>
  );
}

export default Image;
