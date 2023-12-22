import x from "../../assets/images/x.svg";
import white_x from "../../assets/images/white_x.svg";
import vector from "../../assets/images/vector.svg";
import NotificationProps from "../../Types/notificationProps";

function Notification({
  resultError,
  success,
  message,
  buttonInput,
  setActivePopup,
}: NotificationProps) {
  function closePopup() {
    setActivePopup(false);
  }
  return (
    <div className="fixed  top-0 left-0 flex items-center justify-center w-full h-full cursor-pointer bg-black_ bg-opacity-[0.24] z-popup ">
      <div className="relative flex flex-col w-full bg-white px-popup_x py-popup_y rounded-12 max-w-popup">
        {/* X icon */}
        <button
          onClick={closePopup}
          className="absolute top-x_icon right-x_icon"
        >
          <img src={x} alt="exit" />
        </button>
        {/* Vector Icon */}
        <div
          className={`flex items-center self-center justify-center rounded-full w-successImg h-successImg ${
            success ? "bg-success" : "bg-err"
          }`}
        >
          {success ? (
            <img src={vector} alt="Success" />
          ) : (
            <img
              src={white_x}
              alt="Error"
              className="w-successImg h-successImg"
            />
          )}
        </div>
        {/* Message */}
        <h5 className="text-center text-black_ text-24 font-700 leading-32 mt-[16px]">
          {message}
        </h5>

        <button
          onClick={() => {
            closePopup();
            success && !resultError && window.open("/", "_self");
          }}
          className="flex-1 mt-[48px] text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login"
        >
          {buttonInput}
        </button>
      </div>
    </div>
  );
}

export default Notification;
