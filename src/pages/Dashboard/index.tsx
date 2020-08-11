import React, { useState, useEffect ,FormEvent } from 'react'
import Logo from '../../assets/logo.svg'
import { Title, Form, Repositories, Error } from './styles'
import { Link } from 'react-router-dom'
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
    const [repositories, setRepositories ] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if(storagedRepositories) { //se ja tiver valor, setamos ele no state
            return JSON.parse(storagedRepositories) //o parse é para desconverter para array novamente 
        } else {
            return []
        }
    })

    const [inputError, setInputError] = useState('')

useEffect(() => {
    localStorage.setItem(
        '@GithubExplorer:repositories', 
        JSON.stringify(repositories) //strinfy converte de array para string
    )
},[repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        
        event.preventDefault() //nao recarregar a pagina apos o clique

        if(!newRepo) {
            return setInputError('Digite o autor/nome do repositório')
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)

            const repository = response.data

            setRepositories([...repositories, repository])
            setNewRepo('')
        }catch(err) {
            setInputError('Erro na busca do repositório')
        }   
    }

  return ( 
       <>
    <img src={Logo} />
    <Title>Explore repositórios no Github.</Title>
    
    <Form hasError={ !! inputError} onSubmit={handleAddRepository}>
        <input 
            placeholder="Digite o nome do repositório"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
    </Form>
    {inputError &&  <Error> {inputError} </Error> }
   

    <Repositories>
    {repositories.map((repository) => (
        <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
        <img 
            src={repository.owner.avatar_url}
            alt= {repository.owner.login}
        />
        <div>
        <strong>{repository.full_name}</strong>
        <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
    </Link>
      
    )

    )}

      </Repositories>
    </>
  
    ) 
}


export default Dashboard