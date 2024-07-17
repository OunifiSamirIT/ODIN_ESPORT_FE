import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = () => {
  const generatePdf = async () => {
    const input = document.getElementById('content');

    // Use html2canvas to capture the content
    const canvas = await html2canvas(input);

    // Get the image data from the canvas
    const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add the image to the PDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save('output.pdf');
  };

  return (
    <div>
      <div id="content" className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold">Monssif Jaziri</p>
            <p className="text-gray-500 font-medium">Code de convocation: 10566554</p>
          </div>
          <div className="py-4">
            <h3 className="font-bold">Test de vitesse</h3>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th>Barrière</th>
                  <th>Temps</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10m</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>20m</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>30m</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-4">
            <h3 className="font-bold">Test conduite de balle</h3>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Maîtrise de balle</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Conduite de balle en ZigZag</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Conduite de balle en Slalom</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={generatePdf}>
        Download PDF
      </button>
    </div>
  );
};

export default PDFGenerator;