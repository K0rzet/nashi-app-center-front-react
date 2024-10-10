import { Loader2 } from 'lucide-react'

export const Spinner = () => (
  <div className='mt-10 flex h-24 items-center justify-center'>
    <Loader2 className='h-8 w-8 animate-spin text-primary' />
  </div>
)
