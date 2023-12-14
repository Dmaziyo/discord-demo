import { X } from 'lucide-react'
import { UploadDropzone } from '@/lib/upload-thing'
import Image from 'next/image'
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
        <div className="h-[80px] w-[80px] rounded-full overflow-hidden relative">
          <Image src={value} fill alt="Pic" />
        </div>
        <button
          className="absolute top-0 right-0 text-white bg-rose-500 rounded-full p-1"
          onClick={() => {
            onChange('')
          }}
        >
          <X className="h-4 w-4"></X>
        </button>
      </div>
    )
  }
  return (
    <UploadDropzone
      onClientUploadComplete={(res) => {
        onChange(res[0].url)
      }}
      endpoint={endpoint}
    ></UploadDropzone>
  )
}

export default FileUpload
