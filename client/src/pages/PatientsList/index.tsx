import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Result, Select, Table } from 'antd';
import Search from 'antd/lib/input/Search';

import useStore from '../../hooks/useStore';
import { LoadingStatus } from '../../store/types';
import { IPatient } from '../../store/patients';

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
    dataIndex: 'phones',
    key: 'phones',
  },
];

const Patients: FC = () => {
  const { patientsStore } = useStore();
  const history = useHistory();

  const isLoading = patientsStore.loadingStatus === LoadingStatus.LOADING;

  const [type, setType] = useState<string>('name');

  const handleSearch = async (value: string) => {
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

  const handleClick = (patient: IPatient) => {
    history.push(`/patients/${patient.patientID}/documents`);
  };

  return (
    <div>
      <Search
        placeholder="Пошук пацієнта"
        onSearch={handleSearch}
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
          status="error"
          subTitle={`${patientsStore.errorMessage}` || 'Виникла помилка'}
        />
      ) : (
        <Table
          style={{ marginTop: 20 }}
          loading={isLoading}
          dataSource={toJS(patientsStore.patients).map((p) => {
            // @ts-ignore
            p.key = p.patientID;
            return p;
          })}
          columns={columns}
          locale={{ emptyText: 'Введіть значення в пошуці' }}
          pagination={false}
          onRow={(record, _) => {
            return {
              onClick: () => handleClick(record),
            };
          }}
        />
      )}
    </div>
  );
};
export default observer(Patients);
