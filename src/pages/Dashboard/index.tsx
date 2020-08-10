import React from 'react'
import Logo from '../../assets/logo.svg'
import { Title, Form, Repositories } from './styles'
import { FiChevronRight } from 'react-icons/fi'


const Dashboard: React.FC = () => {
  return ( 
       <>
    <img src={Logo} />
    <Title>Explore repositórios no Github.</Title>

    <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
    <a href="teste">
        <img 
            src="https://avatars1.githubusercontent.com/u/47359194?s=460&u=fbb5bd376a8fac2abd604caefe7c120013f812aa&v=4"
            alt= "Rafael"
        />
        <div>
            <strong>academy/web</strong>
            <p>Pagina web de um projeto de academia</p>
        </div>
        <FiChevronRight size={20} />
    </a>
    <a href="teste">
        <img 
            src="https://avatars1.githubusercontent.com/u/47359194?s=460&u=fbb5bd376a8fac2abd604caefe7c120013f812aa&v=4"
            alt= "Rafael"
        />
        <div>
            <strong>academy/web</strong>
            <p>Pagina web de um projeto de academia</p>
        </div>
        <FiChevronRight size={20} />
    </a>

    </Repositories>
    </>
  
    ) 
}


export default Dashboard