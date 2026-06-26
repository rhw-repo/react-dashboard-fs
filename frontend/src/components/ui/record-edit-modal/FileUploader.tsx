import '@uppy/react/css/style.css'

import { useState } from 'react'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import {
  UppyContextProvider,
  Dropzone,
  FilesList,
  useUppyState,
  useUppyEvent,
} from '@uppy/react'
import { Button } from '@/components/ui/Button'
import type { FullPerson } from '@/types/types'

export type UploadedFile = {
  uploadURL: string
  fileName: string
  fileType: string
  fileSize: number
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

type FileUploaderProps = {
  person: FullPerson
  onUploadComplete?: (files: UploadedFile[]) => void
}

export function FileUploader({ person, onUploadComplete }: FileUploaderProps) {
  const [uppy] = useState(() =>
    new Uppy({
      id: `record-uploader-${person.id}`,
      autoProceed: false,
      restrictions: {
        maxFileSize: 50 * 1024 * 1024,
      },
    }).use(XHRUpload, {
      endpoint: 'https://httpbin.org/post',
    }),
  )

  const fileCount = useUppyState(uppy, (state) => Object.keys(state.files).length)
  const [status, setStatus] = useState<UploadStatus>('idle')

  // useUppyEvent(uppy, 'upload-error', (_file, error) => {
  //   console.error('[uppy] upload-error:', error)
  // })

  useUppyEvent(uppy, 'upload', () => {
    setStatus('uploading')
  })

  useUppyEvent(uppy, 'complete', (result) => {
    const uploaded: UploadedFile[] =
      result.successful?.map((f) => ({
        uploadURL: f.uploadURL ?? '',
        fileName: f.name,
        fileType: f.type ?? '',
        fileSize: f.size ?? 0,
      })) ?? []
    onUploadComplete?.(uploaded)
    setStatus((result.failed?.length ?? 0) > 0 ? 'error' : 'success')
  })

  return (
    <section className="mt-6 space-y-3 [--uppy-color-gray-50:transparent] [--uppy-color-gray-300:var(--color-indigo-500)] [--uppy-color-gray-500:var(--color-neutral-50)] [--uppy-color-gray-600:var(--color-neutral-50)] [--uppy-color-blue-50:transparent]">
      <UppyContextProvider uppy={uppy}>
        <Dropzone height="180px" note="Images, PDFs and documents up to 50 MB" />
        <FilesList />
      </UppyContextProvider>
      <Button
        type="button"
        variant="submit"
        disabled={fileCount === 0 || status === 'uploading'}
        onClick={() => {
          // console.log('[uppy] upload triggered, files:', uppy.getState().files)
          uppy
            .upload()
            // .then((result) => console.log('[uppy] result:', result))
            .catch((err: unknown) => console.error('[uppy] error:', err))
        }}
      >
        {status === 'uploading' ? 'Uploading…' : 'Upload files'}
      </Button>

      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">File uploaded</p>
      )}

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </section>
  )
}
