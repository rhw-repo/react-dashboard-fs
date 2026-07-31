import '@uppy/react/css/style.css';

import type Uppy from '@uppy/core';
import { UppyContextProvider, Dropzone, FilesList } from '@uppy/react';

export type UploadedFile = {
  uploadURL: string;
  fileName: string;
  fileType: string;
  fileSize: number;
};

type FileUploaderProps = {
  readonly uppy: Uppy;
};

export function FileUploader({ uppy }: FileUploaderProps) {
  return (
    <section className="mt-6 space-y-3 [--uppy-color-blue-50:transparent] [--uppy-color-gray-50:transparent] [--uppy-color-gray-300:var(--color-indigo-500)] [--uppy-color-gray-500:var(--color-neutral-50)] [--uppy-color-gray-600:var(--color-neutral-50)]">
      <UppyContextProvider uppy={uppy}>
        <Dropzone height="180px" note="Images, PDFs and documents up to 50 MB" />
        <FilesList />
      </UppyContextProvider>
    </section>
  );
}
