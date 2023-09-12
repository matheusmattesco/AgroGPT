import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import api from "../../services/api";

export default function NovoAluno() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(0);

    const {alunoId} = useParams();

    const history = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    useEffect(()=>{
      if(alunoId === '0')
       return;
      else
        loadAluno();
    }, alunoId)

    async function loadAluno() {
      try {
        const response = await api.get(`api/alunos/${alunoId}`, authorization); // Passa authorization como configuração
        setId(response.data.id);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
      } catch (error) {
        alert('Erro ao recuperar o aluno ' + error);
        history('/alunos');
      }
    }

    async function saveOrUpdate(event) {
      event.preventDefault();

      const data = {
        nome,
        email,
        idade
      }

      try {
        if(alunoId==='0')
          {
            await api.post('api/alunos', data, authorization);
          }
        else
          {
            data.id = id;
            await api.put(`api/alunos/${id}`, data, authorization);
          }
      } catch (error) {
        alert('Erro ao gravar aluno' + error)
      }
      history('/alunos');
    } 

  return (
    <div className="novo-aluno-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={105} color="#17202a" />
          <h1>{alunoId === '0'? 'Incluir novo Aluno:' : 'Atualizar Aluno'}</h1>
          <Link className="back-link" to="/alunos">
            <FiCornerDownLeft size={25} color="#17292a" /> Retornar
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input placeholder="Nome" 
          value={nome} onChange={e=> setNome(e.target.value)}/>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
          <input placeholder="Idade" value={idade} onChange={e=> setIdade(e.target.value)}/>
          <button className="button" type="submit">
            {alunoId === '0'? 'Incluir' : 'Atualizar'}
          </button>
        </form>
      </div>
    </div>
  );
}
