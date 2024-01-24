'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FileUpload from '@/components/file-upload'
import axios from 'axios'
import { useClientTranslation } from '@/hooks/use-i18n'
import { useModal } from '@/hooks/use-modal-state'
import qs from 'query-string'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'attachment can not be empty'
  })
})

type FormType = z.infer<typeof formSchema>

const FileAttachmentModal = () => {
  const { isOpen, type, data, onClose } = useModal()
  const [loading, setLoading] = useState(false)
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: ''
    }
  })
  const { apiUrl, query } = data

  const { t } = useClientTranslation()
  const isOpened = isOpen && type === 'fileAttachment'

  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query
      })
      await axios.post(url, { ...values, content: values.fileUrl })
      onClose()
      form.reset()
      setLoading(false)
    } catch (error) {
      console.log('[FILE_ATTACHMENT_ERROR]', error)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0">
        <DialogHeader className="p-8">
          <DialogTitle className="text-black text-center text-3xl font-bold">{t('Upload your attachment')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUpload onChange={field.onChange} value={field.value} endpoint={'fileUploader'}></FileUpload>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>

            <DialogFooter className="bg-gray-100 p-5">
              <Button disabled={loading} className="text-white bg-indigo-500 hover:bg-indigo-500/90">
                {t('Submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default FileAttachmentModal
