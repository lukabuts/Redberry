import arrow_left from "../../assets/images/arrow_left.svg";
import arrow_right from "../../assets/images/arrow_right.svg";
import { useState, useEffect } from "react";

function SwiperBtns() {
  const [disabledLeft, setDisabledLeft] = useState(false);
  const [disabledRight, setDisabledRight] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const swiperDiv = document.getElementById("swiperDiv");
    if (!swiperDiv) return;
    scrollLeft < 0
      ? setScrollLeft(0)
      : scrollLeft > swiperDiv.scrollWidth - swiperDiv.clientWidth &&
        setScrollLeft(swiperDiv.scrollWidth - swiperDiv.clientWidth);
    // Scroll
    swiperDiv.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    // Disable left button
    scrollLeft === 0 ? setDisabledLeft(true) : setDisabledLeft(false);

    // Disable right button
    const scrolledRight =
      swiperDiv.scrollWidth - swiperDiv.clientWidth === scrollLeft;

    scrolledRight ? setDisabledRight(true) : setDisabledRight(false);
  }, [scrollLeft]);

  function handleClick(direction: string) {
    if (direction === "next") {
      setScrollLeft((prev) => prev + 440);
    } else if (direction === "previous") {
      setScrollLeft((prev) => prev - 440);
    }
  }

  return (
    <div className="flex gap-components">
      <button
        className="flex items-center justify-center rounded-full bg-active_inp w-btn h-btn disabled:bg-disabled_btn hover:bg-active_btn_hover"
        onClick={() => handleClick("previous")}
        disabled={disabledLeft}
      >
        <img src={arrow_left} alt="Go Back" />
      </button>
      <button
        className="flex items-center justify-center rounded-full bg-active_inp w-btn h-btn disabled:bg-disabled_btn hover:bg-active_btn_hover"
        onClick={() => handleClick("next")}
        disabled={disabledRight}
      >
        <img alt="Go Forward" src={arrow_right} />
      </button>
    </div>
  );
}

export default SwiperBtns;
