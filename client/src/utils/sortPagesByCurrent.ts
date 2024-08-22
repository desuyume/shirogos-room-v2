import { IFetchMangaPage } from '@/types/manga.interface'

const sortPagesByCurrent = (pages: IFetchMangaPage[], currentPage: number): IFetchMangaPage[] => {
  return pages.sort((a, b) => {
    // Calculate the difference in their positions relative to the current page
    const relativeA = (a.page_number - currentPage + pages.length) % pages.length
    const relativeB = (b.page_number - currentPage + pages.length) % pages.length
    return relativeA - relativeB
  })
}

export default sortPagesByCurrent
