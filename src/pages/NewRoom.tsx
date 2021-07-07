//import { useContext } from 'react';
//import { AuthContext } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';


import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
      
    })

    history.push(`/rooms/${firebaseRoom.key}`)
    

  }


  return (
    <div id="page-auth">
      <aside>
      <img src={illustrationImg} alt="Ilustraçaõ simbolizando perguntas e resposta" />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as suas dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={Event => setNewRoom(Event.target.value)}
              value={newRoom}
            /> 
            <Button type="submit">
              Criar sala
            </Button>          
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>

    </div>
  )
}