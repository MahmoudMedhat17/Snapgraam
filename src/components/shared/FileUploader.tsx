import { Button } from "../ui/button";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useState, useCallback } from "react";

interface FileUploaderProps {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setfileUrl] = useState<string>(mediaUrl);
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      fieldChange(acceptedFiles);
      setFile(acceptedFiles);
      setfileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex w-full p-5 lg:p-10 justify-center">
            <img src={fileUrl} alt="fileUrl" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="icons/file-upload.svg" alt="upload-file" />
          <h3 className="base-medium mt-6 mb-2 text-light-2">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4 flex justify-center items-center rounded-[5px]">
            Select from your computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
