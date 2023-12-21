import folder_add from "../../assets/images/folder_add.svg";
import arrow_down from "../../assets/images/arrow_down.svg";
import error from "../../assets/images/error.svg";
import white_x from "../../assets/images/white_x.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Data from "../../Types/Data";
import { ChangeEvent } from "react";

function NewBlogInfo() {
  // Author
  const [author, setAuthor] = useState("");
  const [smallAuthor, setSmallAuthor] = useState(false);
  const [min2Words, setmin2Words] = useState(false);
  const [onlyGeo, setOnlyGeo] = useState(true);
  // Title
  const [title, setTitle] = useState("");
  const [smallTitle, setSmallTitle] = useState(false);
  // Description
  const [description, setDescription] = useState("");
  const [smallDesc, setSmallDesc] = useState(false);
  // Publish Date
  const [publishDate, setPublishDate] = useState("");
  // Categories
  const [categories, setCategories] = useState<Data[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  // E-mail
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [longEmail, setLongEmail] = useState(false);
  // Check if everithing is OK
  const [isEverithingOk, setIsEverithingOk] = useState(false);

  // ! Is everithing ok?
  useEffect(() => {
    if (
      author.trim().length > 0 &&
      !smallAuthor &&
      min2Words &&
      onlyGeo &&
      title.trim().length > 0 &&
      !smallTitle &&
      description.trim().length > 0 &&
      !smallDesc &&
      publishDate.length > 0 &&
      selectedCategories.length > 0 &&
      email.trim().length > 0 &&
      validEmail &&
      !longEmail
    ) {
      setIsEverithingOk(true);
    } else {
      setIsEverithingOk(false);
    }
  }, [
    author,
    smallAuthor,
    min2Words,
    onlyGeo,
    title,
    smallTitle,
    description,
    smallDesc,
    publishDate,
    selectedCategories,
    email,
    validEmail,
    longEmail,
  ]);

  // !Handle Author Input
  function handleAuthor(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setAuthor(inpValue);

    // Small input
    inpValue.replace(/\s/g, "").length < 4
      ? setSmallAuthor(true)
      : setSmallAuthor(false);

    // Not 2 words
    inpValue.trim().split(" ").length < 2
      ? setmin2Words(false)
      : setmin2Words(true);

    // Only Georgian Alphabet
    const georgianRegex = /^[\u10A0-\u10FF\s]+$/;

    if (!georgianRegex.test(inpValue)) {
      setOnlyGeo(false);
    } else {
      setOnlyGeo(true);
    }
  }

  // ! Handle Title Input
  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setTitle(inpValue);
    inpValue.replace(/\s/g, "").length < 2
      ? setSmallTitle(true)
      : setSmallTitle(false);
  }

  // ! Handle Description Textarea
  function handleDesc(e: ChangeEvent<HTMLTextAreaElement>) {
    const inpValue = e.target.value;
    setDescription(inpValue);
    inpValue.replace(/\s/g, "").length < 2
      ? setSmallDesc(true)
      : setSmallDesc(false);
  }

  // ! Handle Date Change
  function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setPublishDate(inpValue);
  }
  // ? Get new Date
  function getFreshDate(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.min) {
      target.min = new Date().toISOString().split("T")[0];
    }
  }

  // ! Get Categories
  function getCategories() {
    setShowCategories(true);
    if (categories.length === 0) {
      setLoading(true);
      axios
        .get("https://api.blog.redberryinternship.ge/api/categories")
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  // ! Handling User E-mail
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const inputVal = e.target.value;
    setEmail(inputVal);
    inputVal.endsWith("@redberry.ge")
      ? setValidEmail(true)
      : setValidEmail(false);

    inputVal.trim().split(" ").length > 1
      ? setLongEmail(true)
      : setLongEmail(false);
  }

  // ! handle Selectedcategory change
  function handleSelectedCategory(id: number) {
    if (selectedCategories.includes(id)) return;
    setSelectedCategories([...selectedCategories, id]);
  }

  // ! unselect Category
  function unSelectCategory(id: number) {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((x) => x !== id));
    }
  }

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
              autoComplete="name"
              required
              className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input  focus:outline-none text-normal text-gray_ font-400 leading-20 ${
                author.trim().length > 0 && !smallAuthor && min2Words && onlyGeo
                  ? "border-success bg-success_bg"
                  : author.trim().length > 0
                  ? "border-err bg-err_bg"
                  : author.trim().length === 0 &&
                    "border-input_normal bg-inp_bg"
              }`}
              id="author"
              type="text"
              name="author"
              placeholder="შეიყვანეთ ავტორი"
              value={author}
              onChange={handleAuthor}
            />
            <ul className="list-disc text-gray_ text-12 font-400 leading-20 ml-[16px]">
              <li
                className={`${
                  author.trim().length === 0
                    ? ""
                    : !smallAuthor
                    ? "text-success"
                    : "text-err"
                }`}
              >
                მინიმუმ 4 სიმბოლო
              </li>
              <li
                className={`${
                  author.trim().length === 0
                    ? ""
                    : min2Words
                    ? "text-success"
                    : "text-err"
                }`}
              >
                მინიმუმ 2 სიტყვა
              </li>
              <li
                className={`${
                  author.trim().length === 0
                    ? ""
                    : onlyGeo
                    ? "text-success"
                    : "text-err"
                }`}
              >
                მხოლოდ ქართული ასოები
              </li>
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
              onChange={handleTitle}
              value={title}
              autoComplete="off"
              className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input focus:outline-none text-normal text-gray_ font-400 leading-20 ${
                title.length > 0 && !smallTitle
                  ? "border-success bg-success_bg"
                  : title.length > 0
                  ? "border-err bg-err_bg"
                  : "border-input_normal bg-inp_bg "
              }`}
              type="text"
              name="title"
              placeholder="შეიყვანეთ სათაური"
              id="title"
            />
            <ul className=" text-gray_ text-12 font-400 leading-20">
              <li
                className={`${
                  title.trim().length === 0
                    ? ""
                    : !smallTitle
                    ? "text-success"
                    : "text-err"
                }`}
              >
                მინიმუმ 2 სიმბოლო
              </li>
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
              onChange={handleDate}
              onClick={getFreshDate}
              value={publishDate}
              className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input border-input_normal bg-inp_bg focus:outline-none text-normal text-gray_ font-400 leading-20 ${
                publishDate
                  ? "border-success bg-success_bg"
                  : "border-input_normal bg-inp_bg"
              }`}
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
            <div className=" flex relative my-[8px] w-full px-inp_x  rounded-12 border-input border-input_normal bg-inp_bg">
              <div className="relative flex flex-1 pt-inp_y specialScrollbar">
                <input
                  onChange={(e) => {
                    setCategoriesFilter(e.target.value.trim());
                  }}
                  className="flex-1 focus:outline-none text-normal text-gray_ font-400 leading-20"
                  type="choose"
                  name="Category"
                  placeholder="აირჩიეთ კატეგორია"
                  id="category"
                  autoComplete="none"
                />

                {/* Show selected Categories */}
                <div className="absolute top-0 flex items-center h-full gap-[8px] ">
                  {categories
                    .filter((category) =>
                      selectedCategories.includes(category.id)
                    )
                    .map((category) => {
                      return (
                        <div
                          className="flex cursor-pointer rounded-component_item px-small_component_x py-small_component_y -500 w-max gap-[8px]"
                          key={category.id}
                          style={{ background: category.background_color }}
                        >
                          <p
                            className="text-12"
                            style={{ color: category.text_color }}
                          >
                            {category.title}
                          </p>
                          <button
                            onClick={() => {
                              unSelectCategory(category.id);
                            }}
                          >
                            <img src={white_x} alt="remove" />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* Show Categories */}
              <div
                className={` bottom-[-123px] left-0 flex flex-wrap w-full p-[16px] bg-white gap-[8px] rounded-12 h-[120px] overflow-y-scroll items-start ${
                  !showCategories ||
                  selectedCategories.length === categories.length
                    ? "hidden"
                    : "absolute"
                }`}
              >
                {!loading ? (
                  categories
                    .filter((category) => {
                      return (
                        !selectedCategories.includes(category.id) &&
                        category.title.includes(categoriesFilter)
                      );
                    })
                    .map((category) => {
                      return (
                        <div
                          onClick={() => {
                            handleSelectedCategory(category.id);
                          }}
                          className="cursor-pointer rounded-component_item px-small_component_x py-small_component_y -500"
                          key={category.id}
                          style={{ background: category.background_color }}
                        >
                          <p
                            className="text-12 "
                            style={{ color: category.text_color }}
                          >
                            {category.title}
                          </p>
                        </div>
                      );
                    })
                ) : (
                  <h1 className="w-full text-center text-normal">
                    იტვირთება კომპონენტები...
                  </h1>
                )}
              </div>
              {/* Button */}
              <button
                type="button"
                className="pl-[5px]"
                onClick={() => {
                  showCategories ? setShowCategories(false) : getCategories();
                }}
              >
                <img
                  src={arrow_down}
                  className={` transition-all ${
                    showCategories ? "rotate-0" : "rotate-180"
                  }`}
                  alt="Arrow Down"
                />
              </button>
            </div>
          </div>
        </div>
        {/* E-mail */}
        <div className=" max-w-authorInp">
          <label
            htmlFor="e-mail"
            className="text-black_ text-normal font-500 leading-20"
          >
            ელ-ფოსტა
          </label>
          <input
            value={email}
            onChange={handleEmail}
            autoComplete="email"
            spellCheck={false}
            className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input focus:outline-none text-normal text-gray_ font-400 leading-20 ${
              email.trim().length > 0 && validEmail
                ? "border-success bg-success_bg"
                : email.trim().length > 0
                ? "border-err bg-err_bg"
                : email.trim().length === 0 && "border-input_normal bg-inp_bg"
            }`}
            type="text"
            name="e-mail"
            placeholder="Example@redberry.ge"
            id="e-mail"
          />
          {/* !11111111 */}
          <div
            className={` gap-x-err ${
              !validEmail && email.trim().length > 0 ? "flex" : "hidden"
            }`}
          >
            <img height={20} width={20} src={error} alt="error" />
            <span className="font-normal text-err text-12 leading-20">
              {longEmail
                ? "მეილი უნდა შედგებოდეს ერთი სიტყვისგან"
                : !validEmail
                ? "მეილი უნდა მთავრდებოდეს @redberry.ge-ით"
                : ""}
            </span>
          </div>
        </div>
        {/* Submit Button */}
        <button
          disabled={!isEverithingOk}
          className="self-end w-full text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login max-w-authorInp disabled:bg-disabled_btn disabled:text-white disabled:cursor-not-allowed"
          type="submit"
        >
          გამოქვეყნება
        </button>
      </form>
    </div>
  );
}

export default NewBlogInfo;
