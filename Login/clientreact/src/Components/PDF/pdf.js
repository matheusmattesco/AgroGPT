import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function GerarPDF(predicao) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Predicoes',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left, top, right, bottom
        }
    ];

    const details = [];

    const firstDetail = {
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
                [
                    { text: 'ID', style: 'tableHeader', fontSize: 10 },
                    { text: 'N', style: 'tableHeader', fontSize: 10 },
                    { text: 'P', style: 'tableHeader', fontSize: 10 },
                    { text: 'K', style: 'tableHeader', fontSize: 10 },
                    { text: 'Temperature', style: 'tableHeader', fontSize: 10 },
                    { text: 'Humidity', style: 'tableHeader', fontSize: 10 },
                    { text: 'pH', style: 'tableHeader', fontSize: 10 },
                    { text: 'Rainfall', style: 'tableHeader', fontSize: 10 },
                ],
                [
                    { text: predicao.id, fontSize: 10 },
                    { text: predicao.n, fontSize: 10 },
                    { text: predicao.p, fontSize: 10 },
                    { text: predicao.k, fontSize: 10 },
                    { text: predicao.temperature, fontSize: 10 },
                    { text: predicao.humidity, fontSize: 10 },
                    { text: predicao.ph, fontSize: 10 },
                    { text: predicao.rainfall, fontSize: 10 },
                ]
            ]
        },
        layout: 'headerLineOnly'
    };
    details.push(firstDetail);

    const secondDetail = {
        text: [
            { text: 'Label: ', bold: true },
            { text: predicao.label, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(secondDetail);

    const thirdDetail = {
        text: [
            { text: 'Autor: ', bold: true },
            { text: predicao.autor, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(thirdDetail);

    const fourthDetail = {
        text: [
            { text: 'Nome: ', bold: true },
            { text: predicao.nome, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(fourthDetail);

    const fifthDetail = {
        text: [
            { text: 'Data: ', bold: true },
            { text: predicao.data, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(fifthDetail);

    const sixthDetail = {
        text: [
            { text: 'Features JSON: ', bold: true },
            { text: predicao.featuresJson, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(sixthDetail);

    const seventhDetail = {
        text: [
            { text: 'Score JSON: ', bold: true },
            { text: predicao.scoreJson, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(seventhDetail);

    const footerDetail = {
        text: [
            { text: 'Predito Label: ', bold: true },
            { text: predicao.predictedLabel, fontSize: 10 }
        ],
        margin: [0, 0, 0, 10] // left, top, right, bottom
    };
    details.push(footerDetail);

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + "/" + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ]
    };

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: details,
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitions).download();
}

export default GerarPDF;
