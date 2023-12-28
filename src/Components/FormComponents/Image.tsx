import gallery from "../../assets/images/gallery.svg";
import folder_add from "../../assets/images/folder_add.svg";
import x from "../../assets/images/x.svg";
import imageProps from "../../Types/imageProps";
import { useEffect } from "react";

function Image({ setImage, setImageError, imageError, image }: imageProps) {
  // Handle image
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageError(false);
    } else {
      console.log("File Not Found");
      setImageError(true);
      setImage(null);
    }
  }

  // Remove Image
  function removeImage() {
    setImage(null);
    localStorage.removeItem("image");
    localStorage.removeItem("imageName");
    setImageError(false);
  }

  // Set image to localStorage
  useEffect(() => {
    if (image) {
      localStorage.setItem("imageName", image.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("image", reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  // Getting stored image
  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      const blob = dataURLtoBlob(storedImage);

      const imageName = localStorage.getItem("imageName");

      const file = new File([blob], `${imageName}`);

      setImage(file);
    }
  }, [setImage]);

  // Convert data URL to Blob
  function dataURLtoBlob(dataURL: string): Blob {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  return (
    <div>
      <label
        htmlFor="image"
        className="text-black_ text-normal font-500 leading-20"
      >
        აირჩიეთ ფოტო
      </label>
      {/* Image Uploaded */}
      {image && !imageError ? (
        <div className="relative flex items-center justify-between h-imgUploaded bg-imgUploaded rounded-12 px-inp_x">
          <div className="flex items-center gap-[12px]">
            <img width={40} height={40} src={gallery} alt="Add image" />
            <p className="text-black_ text-normal font-400 leading-20 ">
              {image.name}
            </p>
          </div>
          <button onClick={removeImage}>
            <img src={x} alt="Remove image" />
          </button>
        </div>
      ) : (
        // Image not Uploaded
        <div
          className={`relative flex flex-col items-center justify-center border-dashed gap-addBlog h-imgUpload bg-imgUpload  border-input rounded-12 ${
            image && imageError
              ? "border-err"
              : !image &&
                !imageError &&
                "border-imgUpload hover:bg-imgUpload_hover"
          }`}
        >
          <img width={40} height={40} src={folder_add} alt="Add image" />
          <p className="text-black_ text-normal font-400 leading-20 ">
            ჩააგდეთ ფაილი აქ ან{" "}
            <span className="underline font-500">აირჩიეთ ფაილი</span>
          </p>
          <input
            onChange={handleImage}
            required
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            name="image"
            accept="image/*"
            id="image"
          />
        </div>
      )}
    </div>
  );
}

export default Image;
