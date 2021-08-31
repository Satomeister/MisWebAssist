import { FC, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Image as AntImage, Result } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { BottomButtons, DatePicker } from '../../components';
import useStore from '../../hooks/useStore';
import { getDateString } from '../../utils';
import { LoadingStatus } from '../../store/types';

const CreateDocument: FC = () => {
  const history = useHistory();
  const location = useLocation<{ image: File }>();
  const params = useParams<{ patientID: string }>();

  const { documentsStore } = useStore();

  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (documentsStore.createDocumentLoadingStatus === LoadingStatus.ERROR ) {
      documentsStore.setCreateDocumentLoadingStatus(LoadingStatus.NEVER);
    }
  }, [])

  useEffect(() => {
    if (documentsStore.createDocumentLoadingStatus === LoadingStatus.SUCCESS ) {
      history.push(`/patients/${params.patientID}/documents`);
      documentsStore.setCreateDocumentLoadingStatus(LoadingStatus.NEVER);
    }
  }, [documentsStore.createDocumentLoadingStatus]);

  const handleSave = () => {
    (async () => {
      const date = dateValue ? getDateString(dateValue) : '';
      await documentsStore.createDocument(
        params.patientID,
        location.state.image,
        date,
        desc
      );
    })();
  };

  if (!documentsStore.patient) {
    return <Redirect to={`/patients/${params.patientID}/documents`} />;
  }

  return (
    <div style={{ fontSize: 16, paddingBottom: 55 }}>
      <AntImage
        height={220}
        src={URL.createObjectURL(new Blob([location.state.image]))}
      />
      <div>Дата:</div>
      <DatePicker onChange={(value) => setDateValue(value)} />
      <div>Опис:</div>
      <TextArea
        autoSize
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <BottomButtons
        buttons={[
          {
            title: 'Зберегти',
            onClick: handleSave,
            disabled:
              documentsStore.createDocumentLoadingStatus ===
              LoadingStatus.LOADING,
          },
          {
            title: 'Скасувати',
            onClick: () => {
              history.push(`/patients/${params.patientID}/documents`);
            },
          },
        ]}
      />

      {documentsStore.createDocumentLoadingStatus === LoadingStatus.ERROR && (
        <Result status="error" subTitle="Не вдалося завантажити документ" />
      )}
    </div>
  );
};

export default observer(CreateDocument);
