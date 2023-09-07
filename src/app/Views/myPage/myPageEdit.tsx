import React, { FC, useEffect, useState } from 'react';
import { common, defaultKeyValue } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeUserYup, genderList, NationList, UpdateUserType } from 'app/Models';
import InputForm from 'components/coreCustom/inputForm';
import { Button, Col, Row, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import DatePickerCustom from 'components/coreCustom/datePickerCustom';
import { accountService } from 'app/Services';
import store from 'app/redux/store';
import 'assets/style/Views/myPageEdit.scss';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import ImageInput from 'components/imageInput';
import { updateUser } from 'app/redux/Slices/AccountsSlice';
import Toastconfig from 'assets/toast';
import SEO from 'components/seo';

type Props = ReturnType<typeof mapStateToProps>;

const MyPageEdit: FC<Props> = ({ account }) => {
  const [t] = useTranslation();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: yupResolver(ChangeUserYup),
    defaultValues: {
      avatar: account?.avatar || '',
      userName: account?.userName || '',
      userDOB: account?.userDOB || undefined,
      userGender: account?.userGender || null,
      nation: account?.nation?._id || null,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [dataNation, setDataNation] = useState<NationList[]>();

  useEffect(() => {
    (async () => {
      const data = await accountService.getAreaCode();
      data && setDataNation(data);
    })();
  }, []);

  useEffect(() => {
    if (errors.userName?.message) {
      Toastconfig.error(errors.userName?.message);
    }
  }, [errors]);

  const renderGender = () => {
    return genderList.map((data) => {
      return (
        <Select.Option
          selected={(data.value === account?.userGender) === null}
          value={data.value}
          key={data.key}
        >
          {t(defaultKeyValue[data.key])}
        </Select.Option>
      );
    });
  };

  const renderNation = () => {
    if (dataNation) {
      return dataNation.map((data) => {
        return (
          <Select.Option value={data._id} key={data._id} classNam="nation_item">
            {data.name}
          </Select.Option>
        );
      });
    }
    return <></>;
  };

  const onSubmit = async (dataForm: UpdateUserType) => {
    setLoading(true);
    const data = await store.dispatch(updateUser(dataForm));
    data && setValue('avatar', data.avatar);
    setLoading(false);
  };

  return (
    <div className="view inline">
      <SEO title={t(common.edit_profile)} />
      <div className="my_page_edit">
        <div className="title">{t(common.edit_profile)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 form_edit">
          <div className="avatar_area">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { name, onChange, value } }) => (
                <ImageInput value={value} name={name} onChange={onChange} account={account} />
              )}
              defaultValue={account?.avatar || ''}
            />
          </div>
          <div className="subTitle">{t(common.basic_information2)}</div>
          <Row className="list_form" gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Controller
                control={control}
                name="userName"
                render={({ field: { name, onChange, value } }) => (
                  <div className="imput_form">
                    <label htmlFor={name}>{t(common.name)}</label>
                    <InputForm
                      id={name}
                      allowClear
                      bordered={false}
                      value={value}
                      name={name}
                      onChange={onChange}
                      placeholder={t(common.name)}
                      className="w-100 input_ant_ct_2"
                    />
                  </div>
                )}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 14 }}>
              <Controller
                control={control}
                name="userDOB"
                render={({ field: { name, onChange, value } }) => (
                  <div className="imput_form">
                    <label htmlFor={name}>{t(common.birth_date)}</label>
                    <DatePickerCustom
                      id={name}
                      allowClear={false}
                      bordered={false}
                      name={name}
                      className="h-100 input_ant_ct_2"
                      placeholder={t(common.birth_date)}
                      onChange={onChange}
                      value={value ? moment(value) : undefined}
                    />
                  </div>
                )}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 10 }}>
              <Controller
                control={control}
                name="userGender"
                render={({ field: { name, value } }) => (
                  <div className="imput_form">
                    <label htmlFor={name}>{t(common.gender)}</label>
                    <Select
                      id={name}
                      bordered={false}
                      value={value}
                      className="select_ant_ct_2 w-100"
                      onChange={(value) => {
                        setValue(name, value, { shouldValidate: true });
                      }}
                      suffixIcon={<div className="icon_down" />}
                      dropdownClassName="dropdown_ant_ct"
                    >
                      {renderGender()}
                    </Select>
                  </div>
                )}
              />
            </Col>
            {/* </Row> */}
            {/* <Row gutter={8}> */}
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Controller
                control={control}
                name="nation"
                render={({ field: { name, value } }) => (
                  <div className="imput_form">
                    <label htmlFor={name}>{t(common.nationality)}</label>
                    <Select
                      id={name}
                      bordered={false}
                      value={value}
                      className="select_ant_ct_2 w-100"
                      onChange={(value) => {
                        setValue(name, value, { shouldValidate: true });
                      }}
                      placeholder={t(common.nationality)}
                      suffixIcon={
                        !dataNation ? (
                          <LoadingOutlined className="iconloading" spin />
                        ) : (
                          <div className="icon_down" />
                        )
                      }
                      dropdownClassName="dropdown_ant_ct"
                      disabled={!dataNation}
                    >
                      {renderNation()}
                    </Select>
                  </div>
                )}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <div className="imput_form">
                <label htmlFor="userEmail">{t(common.email)}</label>
                <InputForm
                  disabled
                  id="userEmail"
                  type={'email'}
                  allowClear
                  bordered={false}
                  value={account?.userEmail}
                  defaultValue={account?.userEmail}
                  placeholder={t(common.email)}
                  className="w-100 input_ant_ct_2 h-100"
                />
              </div>
            </Col>
            <Button
              loading={loading}
              color="primary"
              disabled={!dataNation}
              className="w-100 button_ant_ct button_edit_detail"
              htmlType="submit"
              type="primary"
            >
              {t(common.modifications_completed)}
            </Button>
          </Row>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(MyPageEdit);
