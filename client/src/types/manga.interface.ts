export interface IMangaPage {
  id: number
  page: number
  img: string | File | null
}

export interface IManga {
  id: string
  chapterId: number
  title: string
  description: string | null
  cover_img: string
  chapter: number
  pages: IFetchMangaPage[]
}

export interface IMangaGeneral {
  id: string
  title: string
  description: string | null
  cover_img: string
  lastChapter: number
}

export interface IMangaReader {
  id: string
  title: string
  chaptersCount: number
  chapter: number
  pages: IFetchMangaPage[]
}

export interface IFetchMangaPage {
  id: number
  page_img: string
  page_number: number
}
