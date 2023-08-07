const previewUploadedImg = (
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  imgRef: React.MutableRefObject<HTMLImageElement | null>,
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (inputRef.current) {
    inputRef.current.onchange = () => {
      const file = inputRef.current?.files?.[0];
      if (file && imgRef.current) {
        imgRef.current.src = URL.createObjectURL(file);
        setIsUploaded(true)
      }
    };
  }
};

export default previewUploadedImg