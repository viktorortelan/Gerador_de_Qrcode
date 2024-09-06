import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [qrPdfs, setQrPdfs] = useState(1000);
  const qrRefs = useRef([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  //const [ quantidade, setQuantidade] = useState(end)


  useEffect(() => {
    let nums = [];
    for (let index = start; index <= end; index++) {
      nums.push(index);
    }
    setNumbers(nums);
  }, [start, end]);


  const handleGeneratePDFs = async () => {
    const maxPerPage = 30; 
    const qrCodeSize = 40; 
    const margin = 10;  
    const textMargin = 10; 

    const createPDF = (startIndex, endIndex, fileName) => {
      const doc = new jsPDF();
      let x = margin;
      let y = margin;

      for (let i = startIndex; i < endIndex; i++) {
        const qrRef = qrRefs.current[i];
        if (!qrRef) continue;

        const canvas = qrRef.querySelector('canvas');
        const number = numbers[i];
        if (canvas) {
          const imageData = canvas.toDataURL('image/png');

          
          if (x + qrCodeSize + margin > doc.internal.pageSize.width) {
            x = margin;
            y += qrCodeSize + margin + textMargin + 10; 
            if (y + qrCodeSize + margin + textMargin > doc.internal.pageSize.height) {
              doc.addPage();
              x = margin;
              y = margin;
            }
          }

          doc.addImage(imageData, 'PNG', x, y, qrCodeSize, qrCodeSize);

          
          doc.setFontSize(10);
          doc.text(number.toString(), x + qrCodeSize / 2, y + qrCodeSize + textMargin, { align: 'center' });

          x += qrCodeSize + margin;
        }
      }

      doc.save(fileName);
    };

    const batchSize = 100; 
    const numOfBatches = Math.ceil(numbers.length / batchSize);

    for (let i = 0; i < numOfBatches; i++) {
      const startIndex = i * batchSize;
      const endIndex = Math.min(startIndex + batchSize, numbers.length);
      const fileName = `qrcodes_batch_${i + 1}.pdf`;

      await new Promise((resolve) => {
        setTimeout(() => {
          createPDF(startIndex, endIndex, fileName);
          resolve();
        }, 100); 
      });
    }
  };

  return (
    <div className="App">
      <h1>Gerador de QR Codes</h1>
      <div>
        <label>
           Inicio:
           <input type="number" value={start} onChange={e => setStart(e.target.value)}/>
        </label>

        <label>
          fim:
          <input type="number" value={end} onChange={e => setEnd(e.target.value)} />
        </label>

        
      </div>

      <div>
        <label>
          <input type="number" value={qrPdfs} onChange={e => setQrPdfs(numbers(e.target.value))} />
        </label>
      </div>

      <button onClick={handleGeneratePDFs}>Gerar PDFs</button>

      <div>
        {numbers.map((number, index) => (
          <div key={index} ref={el => (qrRefs.current[index] = el)}>
            <QRCodeCanvas value={number.toString()} size={200} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
