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
import blackGramImg from '../../assets/culturas_img/feijao4.webp';
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
  return (
    <Card className="mt-6 w-80 ">
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

          <span>Autor: {pred.autor}</span>
          <span>Nome: {pred.nome} </span>
          <span>Nitrato: {pred.n} </span>
          <span>Fósforo: {pred.p}</span>
          <span>Potásio: {pred.k}</span>
          <span>PH: {pred.ph}</span> 
          <span>Umidade: {pred.humidity}</span>
          <span>Chuva: {pred.rainfall}</span>
          <span>Resultado: {pred.predictedLabel}</span>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center space-x-2">
        <Button
          onClick={() => onDownloadPDF(pred)}
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
