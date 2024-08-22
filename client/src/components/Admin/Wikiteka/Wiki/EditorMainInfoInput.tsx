import { FC } from 'react'

interface IEditorMainInfoInput {
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  type: string
  title: string
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

const EditorMainInfoInput: FC<IEditorMainInfoInput> = ({
  state,
  setState,
  type,
  title,
  setIsVisible
}) => {
  return (
    <div className='flex h-[3.8125rem]'>
      <div className='flex h-full w-[30rem] items-center justify-center'>
        <p className='text-center text-[1.5625rem] text-[#FFF]'>{title}</p>
      </div>
      <div className='flex h-full w-[36.25rem] items-center justify-center'>
        {type === 'category' ? (
          <button
            onClick={() => setIsVisible?.(true)}
            className='h-full w-full bg-transparent text-center text-[1.5625rem] text-[#A3A3A3] outline-none transition-all placeholder:text-secondaryHover hover:bg-tertiary'
          >
            {!!state ? state.title : 'Выбрать'}
          </button>
        ) : (
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={type}
            className='h-full w-full bg-transparent text-center text-[1.5625rem] text-[#A3A3A3] outline-none placeholder:text-secondaryHover'
          />
        )}
      </div>
    </div>
  )
}

export default EditorMainInfoInput
