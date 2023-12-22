/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface imageProps {
  setImage: React.Dispatch<React.SetStateAction<any>>;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  imageError: boolean;
  image: any;
}
