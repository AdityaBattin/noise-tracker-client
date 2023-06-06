import React from 'react'
import { TiTick } from 'react-icons/ti'
import { GiCrossMark } from 'react-icons/gi'



const Info = () => {
  return (
    <div className='flex justify-center items-center lg:flex-row flex-col gap-5  min-w-[70vw] lg:min-h-[90%]'>
      <div className='flex flex-col rounded-lg justify-center gap-6 items-center bg-green-200 border border-gray-400  w-[90%] lg:w-[35%] h-[90%]' >
        <div className='flex justify-center items-center gap-2 text-2xl font-semibold text-black'>
          <TiTick color='green'></TiTick>
          Do's for Healty Ears
        </div>
        <div className='flex flex-col w-[90%] justify-center items-center gap-3 text-gray-900'>
          <div className='text-lg text-center'>Do protect your ears from loud noises by wearing hearing protection, such as earplugs or earmuffs, in noisy environments.
          </div>
          <div className='text-lg text-center'>Do protect your ears from Do maintain a safe distance from loud sound sources, especially when they are at high volumes.
          </div>
          <div className='text-lg text-center'>Do protect your ears from Do Do take listening breaks and give your ears regular rest from exposure to loud noise.
          </div>
          <div className='text-lg text-center'>Do protect your ears from Do Do get regular hearing check-ups to monitor your hearing health and detect any signs of hearing loss early.
          </div>
          
        </div>
      </div>
      <div className='flex flex-col rounded-lg justify-center items-center gap-6 bg-red-200  border-gray-400 w-[90%] lg:w-[35%] h-[90%]'>
        <div className='flex justify-center items-center gap-2 text-2xl font-semibold text-black'>
          <GiCrossMark color='red'></GiCrossMark>
          Dont's for Healty Ears
        </div>
        <div className='flex flex-col w-[90%] justify-center items-center gap-3 text-gray-900'>
          <div className='text-lg text-center '>
           Don't ignore or underestimate the potential harm of loud noises. Even short-term exposure to extremely loud sounds can cause irreversible damage to your hearing.
          </div>
          <div className='text-lg text-center '>
          Don't turn up the volume excessively on personal audio devices. Avoid using them as a way to block out external noise and opt for noise-canceling headphones instead.
          </div>
          <div className='text-lg text-center '>
          Don't expose your ears to excessive noise for extended periods. Take precautions to minimize noise exposure and give your ears time to recover.
          </div>
          <div className='text-lg text-center '>
          Don't neglect proper ear hygiene. Keep your ears clean and dry to reduce the risk of ear infections and associated hearing problems.
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Info
