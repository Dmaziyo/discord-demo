import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Smile } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Button } from '@/components/ui/button'
import { useClientTranslation } from '@/hooks/use-i18n'

interface EmojiPickerProps {
  onChange: (emoji: any) => void
}
const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const {i18n} = useClientTranslation()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-transparent">
          <Smile></Smile>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="p-0">
        <Picker locale={i18n.language} data={data} onEmojiSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
