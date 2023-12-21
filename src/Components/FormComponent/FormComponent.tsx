import folder_add from "../../assets/images/folder_add.svg";
import { useEffect, useState } from "react";
import Data from "../../Types/data";
import AuthorTitle from "./AuthorTitle";
import Description from "./Description";
import PublishCategory from "./PublishCategory";
import EmailBtn from "./EmailBtn";

function NewBlogInfo() {
  // Image
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
      selectedCategories.length > 0
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
  ]);

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
        <AuthorTitle
          setAuthor={setAuthor}
          author={author}
          setSmallAuthor={setSmallAuthor}
          setmin2Words={setmin2Words}
          min2Words={min2Words}
          setOnlyGeo={setOnlyGeo}
          onlyGeo={onlyGeo}
          setSmallTitle={setSmallTitle}
          setTitle={setTitle}
          title={title}
          smallAuthor={smallAuthor}
          smallTitle={smallTitle}
        />
        {/* Description */}
        <Description
          description={description}
          smallDesc={smallDesc}
          setDescription={setDescription}
          setSmallDesc={setSmallDesc}
        />
        {/* Publish Date and Category */}
        <PublishCategory
          setPublishDate={setPublishDate}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setShowCategories={setShowCategories}
          categories={categories}
          setLoading={setLoading}
          setCategories={setCategories}
          publishDate={publishDate}
          setCategoriesFilter={setCategoriesFilter}
          showCategories={showCategories}
          loading={loading}
          categoriesFilter={categoriesFilter}
        />

        {/* E-mail */}
        <EmailBtn
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
          setValidEmail={setValidEmail}
          isEverithingOk={isEverithingOk}
        />
      </form>
    </div>
  );
}

export default NewBlogInfo;
