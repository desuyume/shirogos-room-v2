import { FC } from 'react'

interface IEditorInput {
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  type: string
  title: string
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
  isTextarea?: boolean
  isDisabled?: boolean
}

const EditorInput: FC<IEditorInput> = ({
  state,
  setState,
  type,
  title,
  setIsVisible,
  isTextarea,
  isDisabled
}) => {
  return (
    <div className={(isTextarea ? 'mt-[0.31rem] h-[11.1875rem] ' : 'h-[3.8125rem] ') + 'flex'}>
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
        ) : isTextarea ? (
          <textarea
            disabled={isDisabled}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={type}
            className='h-full w-full resize-none bg-transparent px-2 text-center font-secondary text-[1.125rem] font-bold leading-[140%] text-[#A3A3A3] outline-none placeholder:text-secondaryHover'
          />
        ) : (
          <input
            disabled={isDisabled}
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

export default EditorInput
