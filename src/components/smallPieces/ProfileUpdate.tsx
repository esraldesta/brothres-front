"use client";

import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Avatar from "./Avatar";

interface AvatarUploaderProps {
  fieldchange: (FILES: File[]) => void;
  mediaUrl: string | null;
}

export default function ProfileUpdate({
  fieldchange,
  mediaUrl,
}: AvatarUploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  // when the user drags and drops, onDrop will be excuted
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // set the file state to dropped file
      setFile(acceptedFiles);
      fieldchange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldchange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg", ".webp"],
    },
  });

  useEffect(() => {
    if (file.length > 0) {
      setIsImageSelected(true);
    }
  }, [file]);

  return (
    <div className="flex flex-col items-start max-sm:gap-6 sm:gap-10">
      {isImageSelected ? (
        <img
          {...getRootProps()}
          src={fileUrl}
          alt="profile-image"
          className="w-20 h-20 rounded-full cursor-pointer focus:outline-none"
        />
      ) : (
        <div className="w-[300px] h-[150px] bg-gray-200"></div>
      )}
      <div className="w-[300px] flex justify-end gap-4">
        <button
          type="button"
          {...getRootProps()}
          className="bg-orangeRed mt-3 px-3 py-2 text-white text-sm rounded-md"
        >
          Select
        </button>
      </div>
      <input {...getInputProps()} className="cursor-pointer " />
    </div>
  );
}
