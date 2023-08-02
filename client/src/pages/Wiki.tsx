import Header from '@/layout/Header/Header'
import titleImg from '@/assets/wiki-title-img.png'
import searchIcon from '@/assets/search-icon.png'

const Wiki = () => {
	return (
		<div className='bg-wiki min-h-screen'>
			<Header />
			<div className='flex items-center relative'>
				<div className='bg-tertiary w-[17.8125rem] h-[9.5rem] flex justify-center items-center mt-[0.81rem] relative'>
					<p className='text-primary text-[1.875rem] text-center leading-tight'>Легендарная Википедия Персонажей</p>
					<img className='absolute bottom-[-1.63rem] right-[-1.31rem] pointer-events-none' src={titleImg} alt='title-img' />
				</div>
				<div className='absolute left-[50%] translate-x-[-50%]'>
					<input className='w-[56.8125rem] h-[4.375rem] bg-tertiary rounded-[1.25rem] outline-none text-[#FFF] font-secondary text-[1.875rem] font-bold pl-[4.81rem] caret-primary' />
					<img className='pointer-events-none absolute top-[1.13rem] left-6' src={searchIcon} alt='search-icon' />
				</div>
			</div>
		</div>
	)
}

export default Wiki
