import { pariclesPropsMain } from '@/consts/particles'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { FC, useEffect, useState } from 'react'
import { loadFull } from 'tsparticles'

const ParticlesMain: FC = () => {
	const [init, setInit] = useState(false)

	// this should be run only once per application lifetime
	useEffect(() => {
		initParticlesEngine(async engine => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadFull(engine)
			//await loadBasic(engine);
		}).then(() => {
			setInit(true)
		})
	}, [])

	return (
		init && (
			<Particles
				id='tsparticles'
				className='w-full h-[45.5625rem] absolute'
				{...pariclesPropsMain}
			/>
		)
	)
}

export default ParticlesMain
