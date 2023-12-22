export default interface NotificationProps {
  resultError: boolean;
  success: boolean;
  message: string;
  buttonInput: string;
  setActivePopup: React.Dispatch<React.SetStateAction<boolean>>;
}
