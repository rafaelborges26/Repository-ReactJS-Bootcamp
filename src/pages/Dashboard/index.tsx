import React, { useState, FormEvent } from 'react'
import Logo from '../../assets/logo.svg'
import { Title, Form, Repositories } from './styles'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import Repository from '../Repository'

interface Repository {
    full_name: string
    description: string
    owner: {
        login: string
        avatar_url: string
    }   
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('')
    const [repositories, setRepositories ] = useState<Repository[]>([])


    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault() //nao recarregar a pagina apos o clique

        const response = await api.get<Repository>(`repos/${newRepo}`)
        console.log(response.data)

        const repository = response.data

        setRepositories([...repositories, repository])
        setNewRepo('')   
    }

  return ( 
       <>
    <img src={Logo} />
    <Title>Explore repositórios no Github.</Title>

    <Form onSubmit={handleAddRepository}>
        <input 
            placeholder="Digite o nome do repositório"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
    {repositories.map((repository) => (
        <a key={repository.full_name} href="teste">
        <img 
            src={repository.owner.avatar_url}
            alt= {repository.owner.login}
        />
        <div>
        <strong>{repository.full_name}</strong>
        <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
    </a>
      
    )

    )}

      </Repositories>
    </>
  
    ) 
}


export default Dashboard