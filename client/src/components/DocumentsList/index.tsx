import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { List } from 'antd';

import styles from './DocumentsList.module.css'

import useStore from '../../hooks/useStore';
import { IDocument } from '../../store/documents';
import { isPdfFile } from '../../utils';

const DocumentsList: FC = () => {
  const { documentsStore } = useStore();
  const history = useHistory();

  const handleClick = (document: IDocument) => {
    if (!documentsStore.patient) {
      return false;
    }
    documentsStore.setChosenDocument(document);
    history.push(
      `/patients/${documentsStore.patient.patientID}/documents/${document.uuid}`
    );
  };
  return (
    <List
      pagination={false}
      itemLayout="vertical"
      dataSource={documentsStore.documents}
      renderItem={(item) => (
        <List.Item
          onClick={() => handleClick(item)}
          key={item.uuid}
          className={styles.item}
          extra={
            isPdfFile(item.url) ? (
              <div className={styles.pdfFile}>PDF File</div>
            ) : (
              <img height={140} alt={item.description} src={item.url} />
            )
          }
        >
          <List.Item.Meta
            title={'Дата: ' + item.date}
            description={'Опис: ' + item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default observer(DocumentsList);
