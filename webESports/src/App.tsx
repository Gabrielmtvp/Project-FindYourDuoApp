import { useState, useEffect } from 'react'
import GameBanner from './components/GameBanner'
import logoImg from './assets/logo-galaxy.svg'
import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames ] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center m-16'>
      <img src={logoImg} alt='' className='w-52' />

      <h1 className='text-5xl text-white font-black mt-20' >
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
          {games.map(game => {
            return(
              <GameBanner 
                key={game.id}
                bannerUrk={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} />
            )
          })}       
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
