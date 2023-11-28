import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


import { FaRegFilePdf } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import riceImg from '../../assets/culturas_img/arroz.jpg';
import maizeImg from '../../assets/culturas_img/milho.jpg';
import chickpeaImg from '../../assets/culturas_img/graodebico.jpg';
import kidneyBeansImg from '../../assets/culturas_img/feijao.jpg';
import pigeonPeasImg from '../../assets/culturas_img/ervilha.jpg';
import mothBeansImg from '../../assets/culturas_img/feijao2.jpg';
import mungBeanImg from '../../assets/culturas_img/feijao3.jpg';
import blackGramImg from '../../assets/culturas_img/feijao4.jpg';
import lentilImg from '../../assets/culturas_img/lentilha.jpg';
import pomegranateImg from '../../assets/culturas_img/roma.jpg';
import bananaImg from '../../assets/culturas_img/banana.jpg';
import mangoImg from '../../assets/culturas_img/manga.jpg';
import grapesImg from '../../assets/culturas_img/uva.jpg';
import watermelonImg from '../../assets/culturas_img/melancia.jpg';
import muskmelonImg from '../../assets/culturas_img/melao.jpg';
import appleImg from '../../assets/culturas_img/maca.jpg';
import orangeImg from '../../assets/culturas_img/laranja.jpg';
import papayaImg from '../../assets/culturas_img/papaya.jpg';
import coconutImg from '../../assets/culturas_img/coco.jpg';
import cottonImg from '../../assets/culturas_img/algodao.jpg';
import juteImg from '../../assets/culturas_img/juta.jpg';
import coffeeImg from '../../assets/culturas_img/cafe.jpg';
import html2pdf from 'html2pdf.js';
import ExportContent from '../PDF/pdf-react';
import ReactDOMServer from 'react-dom/server';




const cultureImages = {
  rice: riceImg,
  maize: maizeImg,
  chickpea: chickpeaImg,
  kidneybeans: kidneyBeansImg,
  pigeonpeas: pigeonPeasImg,
  mothbeans: mothBeansImg,
  mungbean: mungBeanImg,
  blackgram: blackGramImg,
  lentil: lentilImg,
  pomegranate: pomegranateImg,
  banana: bananaImg,
  mango: mangoImg,
  grapes: grapesImg,
  watermelon: watermelonImg,
  muskmelon: muskmelonImg,
  apple: appleImg,
  orange: orangeImg,
  papaya: papayaImg,
  coconut: coconutImg,
  cotton: cottonImg,
  jute: juteImg,
  coffee: coffeeImg,
};





const PredictionCard = ({ pred, onDownloadPDF, onDelete }) => {

  const scores = JSON.parse(pred.scoreJson);
  const maxNumber = (Math.max(...scores) * 100).toFixed(2);

  const dataOriginal = new Date(pred.data);
  const dia = String(dataOriginal.getDate()).padStart(2, '0');
  const mes = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero, então adicionamos 1
  const ano = dataOriginal.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  const handleDownloadPDF = () => {
    const options = {
      margin: 10,
      filename: 'relatório.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };




    const exportContent = ReactDOMServer.renderToString(
      <ExportContent pred={pred} />
    );

    html2pdf()
      .from(exportContent)
      .set(options)
      .outputPdf()
      .save();
  };

  

  return (
    <Card className="mt-6 w-80 " id='Card'>
      <CardHeader className="relative h-56">
        <img
          src={cultureImages[pred.predictedLabel]}
          alt={pred.predictedLabel}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className=' flex flex-col'>
        <Typography variant="h5" className="mb-2">
          {`Id: ${pred.id}`}
        </Typography>
        <Typography className='text-xs flex flex-col'>
          <span>Nome: {pred.nome} </span>
          <span>Autor: {pred.autor}</span>
          <span>Data: {dataFormatada} </span>
          <span>Resultado: {pred.predictedLabel}</span>
          <span>Acurácia: {maxNumber}%</span>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center space-x-2">
        <Button
          onClick={handleDownloadPDF}
          className=" text-xs px-2 py-1 flex items-center"
          size="sm"
        >
          Download
          <FaRegFilePdf className="w-3 h-3 ml-1" />
        </Button>
        <Button
          onClick={() => onDelete(pred.id)}
          variant="text"
          color="red"
          size="sm"
          className="mr-1 flex items-center"
        >
          <span>Excluir</span>
          <AiOutlineDelete className="w-3 h-3 mr-1 " />
        </Button>
      </CardFooter>
    </Card>



  );
};

export default PredictionCard;
