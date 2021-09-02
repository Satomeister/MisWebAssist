import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Title from 'antd/lib/typography/Title';

import styles from './Patient.module.css';

import useStore from '../../hooks/useStore';
import { LoadingStatus } from '../../store/types';
import {
  BottomButtons,
  DocumentsList,
  Loader,
  PatientInfo,
} from '../../components';

const Patient: FC = () => {
  const history = useHistory();
  const params = useParams<{ patientID: string }>();
  const { documentsStore } = useStore();

  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      +params.patientID !== documentsStore.patient?.patientID ||
      !documentsStore.documents.length
    ) {
      (async () => {
        await documentsStore.getPatient(params.patientID);
      })();
    }
  }, [params.patientID, documentsStore]);

  const handleCameraInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      history.push({
        pathname: `/patients/${params.patientID}/documents/create`,
        state: { image: file },
      });
    }
  };

  return (
    <>
      {documentsStore.loadingStatus !== LoadingStatus.LOADING &&
      documentsStore.patient ? (
        <div className={styles.container} >
          <PatientInfo />
          <Title level={2} className={styles.title}>
            Документи
          </Title>
          <DocumentsList />
          <input
            ref={cameraInputRef}
            onInput={handleCameraInputChange}
            hidden
            type="file"
            accept="image/*,application/pdf"
            capture="camera"
          />
          <BottomButtons
            buttons={[
              {
                title: 'Фото',
                onClick: () => {
                  if (cameraInputRef.current) {
                    cameraInputRef.current.click();
                  }
                },
              },
            ]}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default observer(Patient);
