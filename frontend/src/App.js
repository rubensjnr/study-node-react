import React, { useState, useEffect } from 'react';
//@ts-ignore
import Header from './components/Header';

import './App.css'
//@ts-ignore
import api from './services/api';


/* 3 Conceitos em React
    Componente
    Popriedade -> Informação passada do componente Pai para o componente Filho
    Estado e Imutabilidade -> 

    useState retorna um array com 2 posições
    1 - Variavel com o seu valor inicial.
    2 - Função para atualizarmos esse valor

    useEffect recebe 2 parametros
    1 - Qual função disparar
    2 - Quando eu disparo
*/

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    },[])

    async function handleAddProject(){
        //setProjects([...projects, `Novo Projeto ${Date.now()}`]);

        const response = await api.post('projects',{
            title: `Novo Projeto ${Date.now()}`,
            owner: "Rubens Jr"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
    <Header title="Projects"/>

        <ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
        <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

export default App;