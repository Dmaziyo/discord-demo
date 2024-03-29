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

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'server name can not be empty '
  }),
  image: z.string().min(1, {
    message: 'image can not be empty'
  })
})

type FormType = z.infer<typeof formSchema>

const InitialModal = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: ''
    }
  })

  const { t } = useClientTranslation()
  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    setIsMount(true)
  }, [])

  const onSubmit = async (values: FormType) => {
    try {
      const res = await axios.post('/api/servers', {
        image: values.image,
        name: values.name
      })
      window.location.reload()
      console.log(res, 'SERVER_CREATE_SUCCESSFUL')
    } catch (error) {
      console.log('[SERVER_CREATE_ERROR]', error)
    }
  }

  if (!isMount) {
    return null
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-primary p-0 dark:bg-[#1E1F22]   ">
        <DialogHeader className="p-8">
          <DialogTitle className="text-primary text-center text-3xl font-bold">{t('Customize your server')}</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {t('Give me your server a personality with a name and an image.You can always change it later')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUpload onChange={field.onChange} value={field.value} endpoint={'imageUploader'}></FileUpload>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="px-5">
                    <FormLabel className="uppercase text-zinc-500 text-sm font-bold">{t('server name')}</FormLabel>
                    <FormControl>
                      <Input className="bg-zinc-300/50 dark:bg-zinc-700  without-ring" placeholder={t('Enter server name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <DialogFooter className="bg-gray-100 p-5 dark:bg-[#313338]/10">
              <Button className="text-white bg-indigo-500 hover:bg-indigo-500/90">{t('Create')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default InitialModal
