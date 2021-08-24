import { FC, useState } from 'react';
import { Result, Select, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import useStore from '../../hooks/useStore';
import { LoadingStatus } from '../../store/store';
import { IPatient } from '../../store/patients';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const columns = [
  {
    title: 'ID Пацієнта',
    dataIndex: 'patientID',
    key: 'patientID',
  },
  {
    title: "Ім'я",
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Номер телефону',
    dataIndex: 'phone',
    key: 'phone',
  },
];

const Patients: FC = () => {
  const { patientsStore } = useStore();
  const history = useHistory();

  const isLoading = patientsStore.loadingStatus === LoadingStatus.LOADING;

  const [type, setType] = useState<string>('name');

  const onSearch = async (value: string) => {
    if (!value.trim()) {
      return false;
    }

    switch (type) {
      case 'name':
        await patientsStore.getByName(value);
        break;
      case 'phone':
        await patientsStore.getByPhone(value);
        break;
      case 'id':
        await patientsStore.getById(value);
        break;
    }
  };

  const onPatientClick = (patient: IPatient) => {
    return () => {
      history.push(`patients/${patient.uuid}`);
    };
  };

  return (
    <div>
      <Search
        placeholder="Пошук пацієнта"
        onSearch={onSearch}
        type={type === 'name' ? 'text' : 'number'}
        loading={isLoading}
        disabled={isLoading}
        addonBefore={
          <Select
            style={{ width: 120, fontSize: 12 }}
            onChange={(value: string) => setType(value)}
            defaultValue="name"
            className="select-after"
          >
            <Option style={{ fontSize: 12 }} value="name">
              Ім'я
            </Option>
            <Option style={{ fontSize: 12 }} value="phone">
              Номер телефону
            </Option>
            <Option style={{ fontSize: 12 }} value="id">
              ID
            </Option>
          </Select>
        }
      />
      {patientsStore.loadingStatus === LoadingStatus.ERROR ? (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      ) : (
        <Table
          style={{ marginTop: 20 }}
          loading={isLoading}
          dataSource={toJS(patientsStore.patients).map((p) => {
            // @ts-ignore
            p.key = p.uuid;
            return p;
          })}
          columns={columns}
          locale={{ emptyText: 'Введіть значення в пошуці' }}
          pagination={false}
          onRow={(record, _) => {
            return {
              onClick: onPatientClick(record),
            };
          }}
        />
      )}
    </div>
  );
};
export default observer(Patients);
