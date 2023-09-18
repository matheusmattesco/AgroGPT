

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FiXCircle, FiEdit, FiUserX , FiDownload} from 'react-icons/fi';
import api from "../../services/api";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logoCadastro from "../../assets/Icone ChatGPT.png";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function Alunos() {
    const [modalIncluir, setModalIncluir] = useState(false);
    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [predicao, setPredicao] = useState([]);

    //////////////////////////////////////////////////////////////////////////////////

    const [temperature, setTemperature] = useState(20);
    const [humidity, setHumidity] = useState(80);
    const [nValue, setNValue] = useState(90);
    const [pValue, setPValue] = useState(42);
    const [kValue, setKValue] = useState(43);
    const [phValue, setPhValue] = useState(6);
    const [rainfallValue, setRainfallValue] = useState(200);
    const [predictedLabel, setPredictedLabel] = useState('');
    const [result2, setResult2] = useState('');
    const [maxNumber, setMaxNumber] = useState(0);
    const abriFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
      }

    const handlePredict = async () => {
        const inputData = {
            Temperature: temperature,
            Humidity: humidity,
            N: nValue,
            P: pValue,
            K: kValue,
            Ph: phValue,
            Rainfall: rainfallValue,
            Label: "teste"
        };

        try {
            const apiUrl = 'https://localhost:7181';
            const response = await fetch(apiUrl + '/api/MachineLearning/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Certifique-se de que a origem esteja correta
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(inputData)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }

            const prediction = await response.json();
            const scores = prediction.score;
            const maxNumber = Math.max(...scores) * 100;


            // Mapeando os rótulos
            const labels = [
                "coco", "milho", "grão de bico", "feijão", "feijão bóer",
                "feijão mensal", "feijão mungo", "blackgram", "lentilha", "romã",
                "banana", "manga", "uvas", "melancia", "melão",
                "maçã", "laranja", "mamão", "arroz", "algodão",
                "juta", "café"
            ];

            // Mapeando os rótulos para nomes mais amigáveis
            const labeledScores = scores.map((value, index) => ({
                nome: labels[index],
                score: value
            }));

            const maxScoreIndex = scores.indexOf(Math.max(...scores));
            const newPredictedLabel = prediction.predictedLabel;
            setPredictedLabel(newPredictedLabel);
           // setResult2(JSON.stringify(labeledScores, null, 2));
            setMaxNumber(maxNumber.toFixed(2));
        } catch (error) {
            console.error("Erro na solicitação:", error);
        }
    };

    const handleExcluirPredicao = async (id) => {
        try {
            const apiUrl = 'https://localhost:7181';
            const response = await fetch(apiUrl + `/api/MachineLearning/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Origin': 'http://localhost:3000'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete. Status: ${response.status}`);
            }
    
            // Atualize a lista de previsões após a exclusão
            const updatedPredicoes = predicao.filter(pred => pred.id !== id);
            setPredicao(updatedPredicoes);
        } catch (error) {
            console.error("Erro na solicitação:", error);
        }
    };

    ////////////////////////////////////////////////////////////////////////////

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useNavigate(); // Defina history como uma constante

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('api/MachineLearning', authorization).then(
            response => {
                setPredicao(response.data);
            }
        );
    }, []); // Passa um array vazio como segundo argumento para executar apenas uma vez

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = undefined; // Defina o cabeçalho como undefined para removê-lo
            history('/');
        } catch (error) {
            alert('Não foi possível fazer o logout' + error);
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" onClick={() => abriFecharModalIncluir()}>Nova Predição</Link>
                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Id" />
                <button type="button" className="button">
                    Filtrar Predição por ID
                </button>
            </form>
            <h1>Histórico de Predições</h1>

            <ul>
                {predicao.map(predicao => (
                    <li key={predicao.id}>
                        <b>Id: {predicao.id}</b> <br /> <br />
                        <b>Nitrato: </b>{predicao.n} <br /> <br />
                        <b>Fósforo: {predicao.p}</b> <br /> <br />
                        <b>Potásio: {predicao.k}</b> <br /> <br />
                        <b>PH {predicao.ph}</b> <br /><br />
                        <b>Chuva: {predicao.rainfall}</b> <br /> <br />
                        <b>Umidade: {predicao.humidity}</b> <br /> <br />
                        <b>Resultado: </b>{predicao.predictedLabel} <br /> <br />
                        <button type="button" onClick={() => handleExcluirPredicao(predicao.id)}>
                            <FiUserX size="25" color="#17202a" />
                        </button>
                        <button type="button">
                            <FiDownload size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>

            <Modal isOpen={modalIncluir}>
        <ModalHeader>Adicionar Predicao</ModalHeader>
        <ModalBody>
        <div className="form-group">
            <h1>Insira os dados do solo:</h1>

            <div className='form-control'>
                <label htmlFor="nValue">Nitrogênio:</label>
                <input
                    type="number"
                    id="nValue"
                    step="0.1"
                    placeholder="N"
                    value={nValue}
                    onChange={(e) => setNValue(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="pValue">Fosforo:</label>
                <input
                    type="number"
                    id="pValue"
                    step="0.1"
                    placeholder="P"
                    value={pValue}
                    onChange={(e) => setPValue(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="kValue">Potássio:</label>
                <input
                    type="number"
                    id="kValue"
                    step="0.1"
                    placeholder="K"
                    value={kValue}
                    onChange={(e) => setKValue(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="temperature">Temperature:</label>
                <input
                    type="number"
                    id="temperature"
                    step="0.1"
                    placeholder="Temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="humidity">Umidade:</label>
                <input
                    type="number"
                    id="humidity"
                    step="0.1"
                    placeholder="Humidity"
                    value={humidity}
                    onChange={(e) => setHumidity(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="phValue">Ph:</label>
                <input
                    type="number"
                    id="phValue"
                    step="0.1"
                    placeholder="Ph"
                    value={phValue}
                    onChange={(e) => setPhValue(parseFloat(e.target.value))}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="rainfallValue">Quantidade de Chuva:</label>
                <input
                    type="number"
                    id="rainfallValue"
                    step="0.1"
                    placeholder="Rainfall"
                    value={rainfallValue}
                    onChange={(e) => setRainfallValue(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </ModalBody>

        <ModalFooter>
        <button id="predictBtn" onClick={handlePredict}> Realizar Predição </button>
          <button className='btn btn-danger' onClick={() => abriFecharModalIncluir()}>Fechar</button>
          <div id="result" className="result-container">
                    A Melhor cultura para o seu solo é {predictedLabel} e com a porcentagem de sucesso de {maxNumber}%
                </div>
                <div id="result2" className="result-container2">
                    {result2}
                </div>
        </ModalFooter>
      </Modal>

        </div>
    )
    //<button className='btn btn-primary' onClick={() => pedidoPost()}>Incluir</button>
}