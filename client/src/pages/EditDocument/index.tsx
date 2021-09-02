import { FC, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Button, Result } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { BottomButtons, DatePicker } from '../../components';
import useStore from '../../hooks/useStore';
import { LoadingStatus } from '../../store/types';
import { getDateString } from '../../utils';

const EditDocument: FC = () => {
  const params = useParams<{ patientID: string; documentID: string }>();
  const history = useHistory();

  const { documentsStore } = useStore();

  const [isDateEdit, setIsDateEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(true);
  const [dataPickerValue, setDataPickerValue] = useState<Date | null>(
    (documentsStore.chosen?.date && new Date(documentsStore.chosen.date)) ||
      null
  );
  const [textareaValue, setTextareaValue] = useState(
    documentsStore.chosen?.description || ''
  );

  useEffect(() => {
    if (documentsStore.editDocumentLoadingStatus === LoadingStatus.ERROR) {
      documentsStore.setEditDocumentLoadingStatus(LoadingStatus.NEVER);
    }
  }, []);

  useEffect(() => {
    if (documentsStore.editDocumentLoadingStatus === LoadingStatus.SUCCESS) {
      history.push(`/patients/${params.patientID}/documents`);
      documentsStore.setEditDocumentLoadingStatus(LoadingStatus.NEVER);
    }
  }, [documentsStore.editDocumentLoadingStatus]);

  const handleSave = () => {
    if (!documentsStore.chosen) {
      return false;
    }
    if (
      textareaValue !== documentsStore.chosen.description ||
      (dataPickerValue &&
        getDateString(dataPickerValue) !== documentsStore.chosen.date)
    ) {
      (async () => {
        await documentsStore.editDocument(
          params.patientID,
          params.documentID,
          dataPickerValue
            ? getDateString(dataPickerValue)
            : documentsStore.chosen!.date,
          textareaValue
        );
        setIsDateEdit(false);
      })();
    }
  };

  if (!documentsStore.chosen) {
    return (
      <Redirect
        to={`/patients/${params.patientID}/documents/${params.documentID}`}
      />
    );
  }

  return (
    <div style={{ paddingBottom: 55 }}>
      <div style={{ fontSize: 16 }}>
        <div style={{ marginBottom: 10 }}>
          <Button
            size="small"
            onClick={() => {
              setIsDateEdit(true);
              setIsDescEdit(false);
            }}
          >
            Редагувати
          </Button>
          <b>Дата: </b>
          <span>{dataPickerValue && getDateString(dataPickerValue)} </span>
        </div>
        <div>
          <Button
            size="small"
            onClick={() => {
              setIsDateEdit(false);
              setIsDescEdit(true);
            }}
          >
            Редагувати
          </Button>
          <b>Опис: </b> <span>{textareaValue} </span>
        </div>
        <div style={{ marginTop: 20 }}>
          {isDateEdit && (
            <DatePicker
              onChange={(value) => setDataPickerValue(value)}
              value={dataPickerValue}
              autoFocus
              inputReadOnly
            />
          )}
          <TextArea
            hidden={!isDescEdit}
            autoSize
            autoFocus
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            defaultValue={documentsStore.chosen.description}
          />
        </div>
      </div>

      <BottomButtons
        buttons={[
          {
            title: 'Зберегти',
            onClick: handleSave,
            disabled:
              documentsStore.editDocumentLoadingStatus ===
              LoadingStatus.LOADING,
          },
          {
            title: 'Скасувати',
            disabled:
              documentsStore.editDocumentLoadingStatus ===
              LoadingStatus.LOADING,
            onClick: () => {
              history.push(
                `/patients/${params.patientID}/documents/${params.documentID}`
              );
            },
          },
        ]}
      />

      {documentsStore.editDocumentLoadingStatus === LoadingStatus.ERROR && (
        <Result status="error" subTitle="Не вдалося редагувати документ" />
      )}
    </div>
  );
};

export default observer(EditDocument);
