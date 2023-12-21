import axios from "axios";
import white_x from "../../assets/images/white_x.svg";
import arrow_down from "../../assets/images/arrow_down.svg";
import PublishCategoryProps from "../../Types/publishcategoryprops";
import { useEffect } from "react";

function PublishCategory({
  setPublishDate,
  selectedCategories,
  setSelectedCategories,
  setShowCategories,
  categories,
  setLoading,
  setCategories,
  publishDate,
  setCategoriesFilter,
  showCategories,
  loading,
  categoriesFilter,
}: PublishCategoryProps) {
  // ?? Setting Items to sessionstorage
  // ! publish Date
  useEffect(() => {
    sessionStorage.setItem("publishDate", publishDate);
  }, [publishDate]);

  // ! selectedCategories
  useEffect(() => {
    sessionStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  // ! general Category Data
  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // ?? Handle Changes
  // ! Handle Date Change
  function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setPublishDate(inpValue);
  }
  // ? Get Current Date
  function getFreshDate(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.min) {
      target.min = new Date().toISOString().split("T")[0];
    }
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
  return (
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
          <div className="relative flex flex-1 pt-[12px] pb-[8px] specialScrollbar">
            <input
              onChange={(e) => {
                setCategoriesFilter(e.target.value.trim());
                getCategories();
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
                .filter((category) => selectedCategories.includes(category.id))
                .map((category) => {
                  return (
                    <div
                      className="flex rounded-component_item px-small_component_x py-small_component_y -500 w-max gap-[8px]"
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
              !showCategories || selectedCategories.length === categories.length
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
  );
}

export default PublishCategory;