import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoom } from '@/api/useRoom'
import EditorNav from '../Editor/EditorNav'
import BadgesSection from '../Editor/BadgesSection'
import WidgetsSection from '../Editor/WidgetsSection'
import UserBar from '../Main/UserBar'
import EditorElement from '../Editor/EditorElement'
import Notepad from '../Editor/Widgets/Notepad'
import { useRoomEditor } from '@/api/useRoomEditor'
import { WidgetType } from '@/types/room.interface'
import { editorWidgetsProps } from '@/consts/editorElements'
import { useScreenObserver } from '@/hooks/useScreenObserver'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { compareObjectArrays } from '@/utils/isDeepEqual'

export type EditorSection = 'badges' | 'widgets'

export interface IEditorWidget {
  element: JSX.Element
  type: WidgetType
  className?: string
  translateX?: number
  translateY?: number
  zIndex: number
}

export interface IEditorBadge {
  badge_id: number
  badgeImg: string
  width?: number
  height?: number
  translateX?: number
  translateY?: number
  zIndex: number
}

const RoomEditor: FC = () => {
  const location = useLocation()
  const [isActiveEditor, setIsActiveEditor] = useState<boolean>(false)

  const { isLoading, isError, data: roomInfo } = useRoom()

  const [isUnsaved, setIsUnsaved] = useState<boolean>(false)
  const [initialEditorElements, setInitialEditorElements] = useState<{
    widgets: IEditorWidget[]
    badges: IEditorBadge[]
    notepadText: string
  }>({ widgets: [], badges: [], notepadText: '' })
  const [editorWidgets, setEditorWidgets] = useState<IEditorWidget[]>([])
  const [editorBadges, setEditorBadges] = useState<IEditorBadge[]>([])

  const [activeSection, setActiveSection] = useState<EditorSection | null>(null)

  const [isCancelEdit, setIsCancelEdit] = useState<boolean>(false)
  const [notepadText, setNotepadText] = useState<string>('')
  const [zIndexCount, setZIndexCount] = useState<number>(1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const roomAppearance = useContext(RoomAppearanceContext)

  const {
    data: editorElements,
    isLoading: isEditorLoading,
    isError: isEditorError,
    isSuccess: isEditorSuccess
  } = useRoomEditor()

  const setFetchedData = () => {
    if (!editorElements) {
      return
    }

    let maxZIndex = 0

    const fetchedWidgets: IEditorWidget[] = editorElements.widgets.map((widget) => {
      const newWidget = editorWidgetsProps.find((e) => e.type === widget.widgetType)

      if (widget.zIndex > maxZIndex) {
        maxZIndex = widget.zIndex
      }

      return {
        element: !!newWidget ? newWidget.element : <></>,
        className: newWidget?.className,
        type: widget.widgetType,
        translateX: widget.translateX,
        translateY: widget.translateY,
        zIndex: widget.zIndex
      }
    })
    const fetchedBadges: IEditorBadge[] = editorElements.badges.map((badge) => {
      if (badge.zIndex > maxZIndex) {
        maxZIndex = badge.zIndex
      }

      return {
        badge_id: badge.badge.id,
        badgeImg: badge.badge.img,
        width: badge.width,
        height: badge.height,
        translateX: badge.translateX,
        translateY: badge.translateY,
        zIndex: badge.zIndex
      }
    })

    setEditorWidgets(fetchedWidgets)
    setEditorBadges(fetchedBadges)

    setNotepadText(editorElements.notepad_text ?? '')
    setZIndexCount(maxZIndex + 1)

    setInitialEditorElements({
      widgets: fetchedWidgets,
      badges: fetchedBadges,
      notepadText: editorElements.notepad_text ?? ''
    })
  }

  const compareEditorWithInitial = () => {
    if (!initialEditorElements) return

    const isEqual =
      compareObjectArrays(editorBadges, initialEditorElements.badges) &&
      compareObjectArrays(editorWidgets, initialEditorElements.widgets) &&
      notepadText === initialEditorElements.notepadText

    if (isEqual) {
      setIsUnsaved(false)
    } else {
      setIsUnsaved(true)
    }
  }

  useEffect(() => {
    if (isEditorSuccess) {
      setFetchedData()
    }
  }, [isEditorSuccess])

  useEffect(() => {
    setFetchedData()
  }, [isCancelEdit])

  useEffect(() => {
    if (location.pathname.includes('/room/editor')) {
      setIsActiveEditor(true)
    } else {
      setIsActiveEditor(false)
    }
  }, [location])

  useEffect(() => {
    setContainerSize({
      width: containerRef.current?.clientWidth ?? 0,
      height: containerRef.current?.clientHeight ?? 0
    })
  }, [isActiveEditor, containerRef.current])

  useScreenObserver(() => {
    setContainerSize({
      width: containerRef.current?.clientWidth ?? 0,
      height: containerRef.current?.clientHeight ?? 0
    })
  }, [isActiveEditor, containerRef.current])

  useEffect(() => {
    if (isEditorSuccess) {
      compareEditorWithInitial()
    }
  }, [editorBadges, editorWidgets, notepadText, initialEditorElements])

  return (
    <div
      className={
        (isActiveEditor ? 'block' : 'hidden') + ' flex h-full w-full justify-between transition-all'
      }
    >
      {isLoading || isEditorLoading ? (
        <p className='w-full text-center text-xl'>Загрузка...</p>
      ) : isError || isEditorError ? (
        <p className='w-full text-center text-xl'>Не удалось получить данные</p>
      ) : (
        <>
          <div className='mr-[1.38rem] h-full flex-1'>
            <EditorNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              editorWidgets={editorWidgets}
              editorBadges={editorBadges}
              notepadText={notepadText}
              setIsCancelEdit={setIsCancelEdit}
              isUnsaved={isUnsaved}
              setIsUnsaved={setIsUnsaved}
            />

            <div
              className={
                (!!activeSection
                  ? 'visible mb-[1.125rem] h-[13.125rem] opacity-100 '
                  : 'invisible mb-0 h-0 opacity-0 ') + 'transition-all'
              }
            >
              {activeSection === 'badges' && (
                <BadgesSection
                  editorBadges={editorBadges}
                  setEditorBadges={setEditorBadges}
                  zIndexCount={zIndexCount}
                  setZIndexCount={setZIndexCount}
                />
              )}
              {activeSection === 'widgets' && (
                <WidgetsSection
                  editorWidgets={editorWidgets}
                  setEditorWidgets={setEditorWidgets}
                  zIndexCount={zIndexCount}
                  setZIndexCount={setZIndexCount}
                />
              )}
            </div>

            <div
              ref={containerRef}
              className='editor-container target relative aspect-[1163/953] w-full rounded-[2.3125rem] bg-secondaryHover'
            >
              {editorWidgets.filter((el) => el.type === 'NOTEPAD').length > 0 && (
                <EditorElement
                  className='aspect-[239/292.37] w-[20.55%]'
                  element={<Notepad notepadText={notepadText} setNotepadText={setNotepadText} />}
                  type='widget'
                  widgetType='NOTEPAD'
                  setEditorWidgets={setEditorWidgets}
                  setEditorBadges={setEditorBadges}
                  translateX={editorWidgets.find((el) => el.type === 'NOTEPAD')?.translateX}
                  translateY={editorWidgets.find((el) => el.type === 'NOTEPAD')?.translateY}
                  zIndex={editorWidgets.find((el) => el.type === 'NOTEPAD')?.zIndex || 0}
                  isActiveEditor={isActiveEditor}
                  isCancelEdit={isCancelEdit}
                  containerSize={containerSize}
                  setIsUnsaved={setIsUnsaved}
                />
              )}
              {editorWidgets
                .filter((el) => el.type !== 'NOTEPAD')
                .map((widget) => (
                  <EditorElement
                    key={widget.type}
                    element={widget.element}
                    className={
                      widget.type === 'FAVORITE_CHARACTER' || widget.type === 'STATISTIC'
                        ? `${widget.className} ${
                            colorVariants.bgRoomGradient[roomAppearance.active_room_color]
                          }`
                        : widget.className
                    }
                    widgetType={widget.type}
                    type='widget'
                    setEditorWidgets={setEditorWidgets}
                    setEditorBadges={setEditorBadges}
                    translateX={widget.translateX}
                    translateY={widget.translateY}
                    zIndex={widget.zIndex}
                    isActiveEditor={isActiveEditor}
                    isCancelEdit={isCancelEdit}
                    containerSize={containerSize}
                    setIsUnsaved={setIsUnsaved}
                  />
                ))}
              {editorBadges.map((badge) => (
                <EditorElement
                  key={badge.badge_id}
                  type='badge'
                  badge_img={badge.badgeImg}
                  badge_id={badge.badge_id}
                  setEditorWidgets={setEditorWidgets}
                  setEditorBadges={setEditorBadges}
                  width={badge.width}
                  height={badge.height}
                  translateX={badge.translateX}
                  translateY={badge.translateY}
                  zIndex={badge.zIndex}
                  isActiveEditor={isActiveEditor}
                  isCancelEdit={isCancelEdit}
                  containerSize={containerSize}
                  setIsUnsaved={setIsUnsaved}
                />
              ))}
            </div>
          </div>
          <UserBar
            profile_img={roomInfo.user.profile_img}
            username={roomInfo.user.username}
            twitchLogin={roomInfo.user.twitch.login}
            created_at={roomInfo.created_at}
            level={roomInfo.user.level}
            exp={roomInfo.user.level}
            past_usernames={roomInfo.user.past_usernames}
            className={!!activeSection ? 'mt-[14.25rem]' : ''}
          />
        </>
      )}
    </div>
  )
}

export default RoomEditor
