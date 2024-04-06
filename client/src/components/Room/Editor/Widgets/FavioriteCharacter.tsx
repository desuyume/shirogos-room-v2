import { useFavoriteCharacter } from '@/api/useFavoriteCharacter'
import { IFavoriteCharacter } from '@/types/room.interface'
import { FC } from 'react'

interface IFavioriteCharacter {
	isGuide?: boolean
	guideFavoriteCharacter?: IFavoriteCharacter
}

const FavioriteCharacter: FC<IFavioriteCharacter> = ({
	isGuide,
	guideFavoriteCharacter,
}) => {
	const {
		data: favoriteCharacter,
		isLoading,
		isError,
	} = useFavoriteCharacter(!isGuide)

	return (
		<>
			{isLoading && !isGuide ? (
				<div className='w-full h-full flex justify-center items-center handle'>
					<p className='text-primaryText text-center text-xl'>Загрузка...</p>
				</div>
			) : isError && !isGuide ? (
				<div className='w-full h-full flex justify-center items-center handle'>
					<p className='text-primaryText text-center text-xl'>Ошибка</p>
				</div>
			) : !favoriteCharacter && !guideFavoriteCharacter ? (
				<div className='w-full h-full flex justify-center items-center handle'>
					<p className='text-primaryText text-center text-[1vw] px-2'>
						Не выбран любимый персонаж
					</p>
				</div>
			) : (
				<div className='w-[90%] h-full flex flex-col items-center relative handle'>
					<div className='w-full aspect-[179/49] bg-tertiary rounded-[1.5625rem] flex justify-center items-center my-[3%]'>
						<p className='text-primaryText text-[1vw] leading-[97.8%] px-2 text-center pointer-events-none'>
							Любимый персонаж
						</p>
					</div>
					<div className='w-full flex-1 flex flex-col items-center'>
						<div className='w-full aspect-[179/240] bg-tertiary rounded-[1.25rem] border-2 border-primaryText'>
							<img
								className='w-full h-full rounded-[1.25rem] pointer-events-none'
								src={`${import.meta.env.VITE_SERVER_URL}/${
									isGuide
										? guideFavoriteCharacter?.miniature_img
										: favoriteCharacter?.miniature_img
								}`}
							/>
						</div>
						<div className='w-full flex-1 flex justify-center items-center overflow-hidden'>
							<p className='text-white text-[0.7vw] text-center leading-[97.8%] max-h-full overflow-hidden pointer-events-none'>
								{isGuide
									? guideFavoriteCharacter?.name
									: favoriteCharacter?.name}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FavioriteCharacter
