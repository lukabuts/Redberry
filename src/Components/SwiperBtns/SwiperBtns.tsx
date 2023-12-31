import { useSwiper } from "swiper/react";
import arrow_left from "../../assets/images/arrow_left.svg";
import arrow_right from "../../assets/images/arrow_right.svg";
import { useEffect, useState } from "react";

function SwiperBtns() {
  const [disabledLeft, setDisabledLeft] = useState(true);
  const [disabledRight, setDisabledRight] = useState(false);
  const swiper = useSwiper();

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", handleSlideChange);
    }

    function handleSlideChange() {
      setDisabledLeft(swiper.isBeginning);
      setDisabledRight(swiper.isEnd);
    }
  }, [swiper]);

  return (
    <div className="flex gap-components">
      <button
        className="flex items-center justify-center rounded-full bg-active_inp w-btn h-btn disabled:bg-disabled_btn hover:bg-active_btn_hover"
        onClick={() => swiper && swiper.slidePrev()}
        disabled={disabledLeft}
      >
        <img src={arrow_left} alt="Go Back" />
      </button>
      <button
        className="flex items-center justify-center rounded-full bg-active_inp w-btn h-btn disabled:bg-disabled_btn hover:bg-active_btn_hover"
        onClick={() => swiper && swiper.slideNext()}
        disabled={disabledRight}
      >
        <img alt="Go Forward" src={arrow_right} />
      </button>
    </div>
  );
}

export default SwiperBtns;
