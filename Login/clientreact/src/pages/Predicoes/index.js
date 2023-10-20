import Header from "../../Components/Header/header";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FiXCircle, FiEdit, FiUserX , FiDownload} from 'react-icons/fi';
import api from "../../services/api";
import logoCadastro from "../../assets/Icone ChatGPT.png";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


export default function Alunos() {
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
      
      const handleDownloadSelectedPDF = (selectedPredicao) => {
        const MyDocument = (
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Texto Aleatório: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </View>
            </Page>
          </Document>
        );
      
        const blob = new Blob([MyDocument], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `predicao_${selectedPredicao.id}.pdf`; // nomeie o arquivo PDF conforme necessário
        link.click();
      };
    



    const [modalIncluir, setModalIncluir] = useState(false)
    const [predicao, setPredicao] = useState([]);

    const navigate = useNavigate();

    const ConsultaAlgoritmo = () => {
      navigate('/consulta-algoritmo');
    };
  
    const ConsultaDataset = () => {
      navigate('/consulta-dataset');
  
    };

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
        <div>
            <Header/>
        <div className="aluno-container">     
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>

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
                        <b>Autor: </b>{predicao.autor} <br /> <br />
                        <b>Nome: </b>{predicao.nome} <br /> <br />
                        <button type="button" onClick={() => handleExcluirPredicao(predicao.id)}>
                            <FiUserX size="25" color="#17202a" />
                        </button>
                        <button type="button" onClick={() => handleDownloadSelectedPDF(predicao)}>
                            <FiDownload size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    </div>
    )
}