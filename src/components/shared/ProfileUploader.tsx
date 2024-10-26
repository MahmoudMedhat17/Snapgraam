import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface ProfileUploaderProps {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      fieldChange(acceptedFiles);
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      // Do something with the files
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
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "/icons/profile-placeholder.svg"}
          className="w-12 md:w-24 h-12 md:h-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:base-semibold">
          Change Profile Picture
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
