import { useState } from 'react'
import './App.css'
import { players } from './store/players'
import { useNavigate } from 'react-router-dom'

function App() {

    const navigate = useNavigate();

    return (
        <>
            <div className='w-[80%] m-auto'>
                <div className='flex flex-col items-center text-center w-[50%] mx-auto my-[100px]'>
                    <p className='bold-text text-xl mb-[100px]'>NBANALYSIS</p>
                    <p className='text-3xl font-semibold mb-7 bold-text'>Unveiling and forecasting the Dominance of today&apos;s five basketball icons</p>
                    <p className='text-gray-400 w-[80%] m-auto'>
                        Explore the legacy of basketball greatness. Choose a player and embark on a journey through their awe-inspiring achievements, 
                        real-time performance, and intriguing future predictions. Let the game unfold!
                    </p>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {
                        players.map(({ key, image, team, name }) => (
                            <div key={key} onClick={() => navigate(`/${key}`)} className='rounded-xl overflow-hidden cursor-pointer hover:scale-[0.95]'>
                                <div className='w-[100%] h-[300px]'>
                                    <img src={image} className='w-full h-full object-cover' />
                                </div>
                                <div className='p-4 bg-black'>
                                    <p className='bold-text text-lg text-white'>{name}</p>
                                    <p className='text-slate-300 text-sm'>{team}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default App
