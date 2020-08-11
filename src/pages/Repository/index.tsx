import React from 'react'
import { useRouteMatch } from 'react-router-dom'

interface RepositoryParams {
    repository: string
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>() //obter os parametros da url

    return <h1>Repository1: {params.repository}</h1>
}

export default Repository