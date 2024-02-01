import { X } from 'lucide-react'
import { UploadDropzone } from '@/lib/upload-thing'
import { File } from 'lucide-react'
import Image from 'next/image'
import { useClientTranslation } from '@/hooks/use-i18n'
interface FileUploadProps {
  onChange: (value: any) => void
  value: string
  endpoint: 'imageUploader'|'fileUploader'
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const { t } = useClientTranslation()
  const fileType = value.split('.').pop()
  const imageFileTypes = ['jpg', 'jpeg', 'png', 'gif']
  if (value && imageFileTypes.includes(fileType as string)) {
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
  if (value && fileType) {
    return (
      <div className="relative">
        <div className="flex text-indigo-500 items-center">
          <File className="fill-indigo-200 stroke-indigo-400"></File>
          <a href={value} target="_blank" rel="noopener noreferrer" className='text-sm'>
            {t('Preview Address')}
          </a>
          <button
            className="absolute -top-2 -right-6 text-white bg-rose-500 rounded-full p-1"
            onClick={() => {
              onChange('')
            }}
          >
            <X className="h-4 w-4"></X>
          </button>
        </div>
      </div>
    )
  }
  return (
    <UploadDropzone 
    className='dark:border-white'
      onClientUploadComplete={res => {
        onChange(res[0].url)
      }}
      endpoint={endpoint}
    ></UploadDropzone>
  )
}

export default FileUpload
