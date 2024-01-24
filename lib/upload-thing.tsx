import { generateComponents } from '@uploadthing/react'

import { OurFileRouter } from '@/app/[locale]/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()
