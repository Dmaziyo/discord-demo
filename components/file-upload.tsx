import Image from 'next/image'
import { X } from 'lucide-react'
import { UploadDropzone } from '@/lib/upload-thing'
interface FileUploadProps {
  onChange: (value: any) => void
  value: string
  endpoint: 'imageUploader'
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className="relative">
        <Image src={value} className="rounded-full" width={80} height={80} alt="Pic" />
        <button
          className="absolute top-0 right-0 text-white bg-rose-500 rounded-full p-1"
          onClick={() => {
            onChange('')
          }}
        >
          <X className='h-4 w-4'></X>
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
      onClientUploadComplete={res => {
        onChange(res[0].url)
      }}
      endpoint={endpoint}
    ></UploadDropzone>
  )
}

export default FileUpload
