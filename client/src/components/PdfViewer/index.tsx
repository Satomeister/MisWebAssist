import { FC, useRef, useState } from 'react';

import styles from './PdfViewer.module.css';
import { usePdf } from '@mikecousins/react-pdf';

interface PdfViewerProps {
  isFull: boolean;
  setIsFull: () => void;
  onClose: () => void;
  file: string
}

const PdfViewer: FC<PdfViewerProps> = ({isFull,setIsFull,onClose,file}) => {
  const canvasRef = useRef(null);

  const [page, setPage] = useState(1);

  const { pdfDocument } = usePdf({
    file: file,
    page,
    canvasRef,
  });

  return (
    <div className={isFull ? styles.pdfFullModal : undefined}>
      <div className={isFull ? styles.container : styles.pdfWrap}>
        <canvas onClick={() => {!isFull && setIsFull()}} ref={canvasRef} className={styles.pdfFile} />
      </div>
      {
        isFull && (
          <>
          <div className={styles.close} onClick={onClose}>
            <button>
              {'\u2715'}
            </button>
          </div>
          {pdfDocument && pdfDocument.numPages && (
            <div className={styles.buttons}>

              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Попередня
              </button>
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Наступна
              </button>
            </div>
          )}

          </>
        )
      }</div>
  );
};

export default PdfViewer;
