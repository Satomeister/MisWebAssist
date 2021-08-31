import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './PatientInfo.module.css';

import useStore from '../../hooks/useStore';

const PatientInfo: FC = () => {
  const { documentsStore } = useStore();
  return (
    <div className={styles.info}>
      <div>
        <b>ID: </b>
        <span>{documentsStore.patient!.patientID}</span>
      </div>
      <div>
        <b>Пацієнт: </b>
        <span>{documentsStore.patient!.fullName}</span>
      </div>
      <div>
        <b>День народження: </b>
        <span>{documentsStore.patient!.birthDate}</span>
      </div>
    </div>
  );
};

export default observer(PatientInfo);
