export class UpdateRoomEditorDto {
  notepad_text: string;
  widgets: IEditorWidget[];
  badges: IEditorBadge[];
}

type WidgetType =
	| 'UNIQUE_ROLE'
	| 'STATISTIC'
	| 'FAVORITE_CHARACTER'
	| 'NOTEPAD'


export interface IEditorWidget {
  widgetType: WidgetType;
  translateX: number
  translateY: number
  zIndex: number
}

export interface IEditorBadge {
  badgeId: number;
  width: number;
  height: number
  translateX: number
  translateY: number
  zIndex: number
}
