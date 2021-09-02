import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from './DeleteDocumentModal.module.css';

import useStore from '../../hooks/useStore';
import { LoadingStatus } from '../../store/types';

interface DeleteDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteDocumentModal: FC<DeleteDocumentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const history = useHistory();
  const params = useParams<{ patientID: string; documentID: string }>();

  const { documentsStore } = useStore();

  const handleDelete = () => {
    (async () => {
      await documentsStore.deleteDocument(params.patientID, params.documentID);
    })();
  };

  useEffect(() => {
    if (documentsStore.deleteDocumentLoadingStatus === LoadingStatus.SUCCESS) {
      history.push(`/patients/${params.patientID}/documents`);
      documentsStore.setDeleteDocumentLoadingStatus(LoadingStatus.NEVER);
    }
  }, [documentsStore.deleteDocumentLoadingStatus, history, params.patientID]);

  return (
    <>
      {isOpen && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <Title level={4}>Видалити документ?</Title>
            <div className={styles.modalButtons}>
              <Button
                onClick={handleDelete}
                disabled={
                  documentsStore.deleteDocumentLoadingStatus ===
                  LoadingStatus.LOADING
                }
              >
                Видалити
              </Button>
              <Button onClick={onClose}>Скасувати</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(DeleteDocumentModal);
