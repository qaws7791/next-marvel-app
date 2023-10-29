import React from 'react'
import Icon from './Icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

type Props = {
  name: keyof typeof dynamicIconImports
  label: string
  onClick?: () => void
}

const IconButton = ({ label, name, onClick, ...props }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='hover:bg-black hover:bg-opacity-10 p-1 rounded-md'
            aria-label={label}
            onClick={onClick}
            {...props}
          >
            <Icon name={name} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default IconButton
