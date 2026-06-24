import { type ChangeEvent, useState } from 'react';
import { Button } from '../Button';

type UploadStatus ="idle" | "uploading" | "success" | "error";  

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, _setStatus] = useState<UploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="m-12 space-y-2">
      <input
        type="file"
        onChange={handleFileChange}
        className="text-sm text-white file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-violet-700 file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-accent"
      />

      {file && (
        <div className="mb-4 text-sm">
          <p>Filename: {file.name}</p>
          <p>Size: {file.size}</p>
          <p>Type: {file.type}</p>
        </div>
      )}
      {file && status !== "uploading" && <Button variant={'submit'}>Upload</Button>
      }
    </div>
  );
};

export default FileUploader;
