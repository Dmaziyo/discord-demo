'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import qs from 'query-string'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-state'
import { useClientTranslation } from '@/hooks/use-i18n'
import { ChannelType } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'server name can not be empty '
    })
    .refine(str => str !== 'general', {
      message: 'Channel name cannot be general'
    }),
  type: z.nativeEnum(ChannelType)
})

type FormType = z.infer<typeof formSchema>

const ChannelCreateModal = () => {
  const router = useRouter()
  const { type, isOpen, onClose } = useModal()
  const params = useParams<{ serverId: string }>()
  const { t } = useClientTranslation()
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: ChannelType.TEXT
    }
  })

  const onSubmit = async (values: FormType) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params.serverId
        }
      })
      const res = await axios.post(url, {
        type: values.type,
        name: values.name
      })
      form.reset()
      router.refresh()
    } catch (error) {
      console.log('[SERVER_CREATE_ERROR]', error)
    }
  }

  const isOpened = isOpen && type === 'createChannel'

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpened} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0">
        <DialogHeader className="p-8">
          <DialogTitle className="text-black text-center text-3xl font-bold capitalize">{t('create your channel')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="px-5">
                    <FormLabel className="uppercase text-zinc-500 text-sm font-bold">{t('channel name')}</FormLabel>
                    <FormControl>
                      <Input className="bg-zinc-300/50 text-black without-ring" placeholder={t('Enter channel name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem className="px-5">
                    <FormLabel className="uppercase text-zinc-500 text-sm font-bold">{t('channel type')}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-zinc-300/50 uppercase focus:ring-transparent ">
                          <SelectValue placeholder={t('select channel type')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="uppercase" value={ChannelType.TEXT}>
                            {t('text')}
                          </SelectItem>
                          <SelectItem className="uppercase" value={ChannelType.AUDIO}>
                            {t('audio')}
                          </SelectItem>
                          <SelectItem className="uppercase" value={ChannelType.VIDEO}>
                            {t('video')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <DialogFooter className="bg-gray-100 p-5">
              <Button className="text-white bg-indigo-500 hover:bg-indigo-500/90">{t('Create')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default ChannelCreateModal
