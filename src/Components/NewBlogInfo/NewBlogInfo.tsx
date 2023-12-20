import folder_add from "../../assets/images/folder_add.svg";
import arrow_down from "../../assets/images/arrow_down.svg";

function NewBlogInfo() {
  return (
    <div className="flex flex-col w-full m-auto gap-blog max-w-blog my-newBlogCont">
      <h1 className="text-black_ text-32 font-700 leading-40">
        ბლოგის დამატება
      </h1>

      <form className="flex flex-col gap-addBlog">
        {/* Image */}
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
        {/* Author, Title */}
        <div className="flex gap-addBlog">
          {/* Author */}
          <div className="flex-1">
            <label
              htmlFor="author"
              className="text-black_ text-normal font-500 leading-20"
            >
              ავტორი*
            </label>
            <input
              required
              className="my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20"
              id="author"
              type="text"
              name="author"
              placeholder="შეიყვანეთ ავტორი"
            />
            <ul className="list-disc text-gray_ text-12 font-400 leading-20 ml-[16px]">
              <li>მინიმუმ 4 სიმბოლო</li>
              <li>მინიმუმ 2 სიტყვა</li>
              <li>მხოლოდ ქართული ასოები</li>
            </ul>
          </div>
          {/* Title */}
          <div className="flex-1">
            <label
              htmlFor="title"
              className="text-black_ text-normal font-500 leading-20"
            >
              სათაური*
            </label>
            <input
              required
              className="my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20"
              type="text"
              name="title"
              placeholder="შეიყვანეთ სათაური"
              id="title"
            />
            <ul className=" text-gray_ text-12 font-400 leading-20">
              <li>მინიმუმ 2 სიმბოლო</li>
            </ul>
          </div>
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="text-black_ text-normal font-500 leading-20"
          >
            აღწერა*
          </label>
          <textarea
            required
            name="description"
            className="mt-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg h-textarea focus:outline-none resize-none text-normal text-gray_ font-400 leading-20"
            placeholder="შეიყვანეთ აღწერა"
            cols={30}
            rows={10}
            id="description"
          />
          <ul className=" text-gray_ text-12 font-400 leading-20">
            <li>მინიმუმ 2 სიმბოლო</li>
          </ul>
        </div>
        {/* Publish Date and Category */}
        <div className="flex gap-addBlog">
          {/* Publish Date */}
          <div className="flex-1">
            <label
              htmlFor="date"
              className="text-black_ text-normal font-500 leading-20"
            >
              გამოქვეყნების თარიღი*
            </label>
            <input
              required
              className="my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20"
              type="date"
              name="Date"
              id="date"
            />
          </div>
          {/* Category */}
          <div className="flex-1">
            <label
              htmlFor="author"
              className="text-black_ text-normal font-500 leading-20"
            >
              კატეგორია*
            </label>
            <div className="relative">
              <input
                required
                className="my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20"
                type="text"
                name="Category"
                placeholder="აირჩიეთ კატეგორია"
                id="category"
              />
              <button
                type="button"
                className="absolute transform translate-x-1/2 -translate-y-1/2 right-x_icon top-1/2"
              >
                <img src={arrow_down} alt="Arrow Down" />
              </button>
            </div>
          </div>
        </div>
        {/* E-mail */}
        <div className="text-red-400 max-w-authorInp">
          <label
            htmlFor="e-mail"
            className="text-black_ text-normal font-500 leading-20"
          >
            ავტორი
          </label>
          <input
            className="my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20"
            type="text"
            name="e-mail"
            placeholder="Example@redberry.ge"
            id="e-mail"
          />
        </div>
        {/* Submit Button */}
        <button
          className="self-end w-full text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login max-w-authorInp"
          type="submit"
        >
          გამოქვეყნება
        </button>
      </form>
    </div>
  );
}

export default NewBlogInfo;
