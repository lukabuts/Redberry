export default interface imageProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  imageError: boolean;
  image: File | null;
}
