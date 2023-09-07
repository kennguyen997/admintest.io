import 'assets/style/Views/login.scss';
import React, { FC, useEffect, useState } from 'react';
import { common, defaultKeyValue } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { genderList, NationList, UpdateUserType, UpdateUserYup } from 'app/Models';
import { useNavigate } from 'react-router-dom';
import InputForm from 'components/coreCustom/inputForm';
import { Button, Select, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import DatePickerCustom from 'components/coreCustom/datePickerCustom';
import { accountService } from 'app/Services';
import store from 'app/redux/store';
import { updateUser } from 'app/redux/Slices/AccountsSlice';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import SEO from 'components/seo';

type Props = ReturnType<typeof mapStateToProps>;

const AccessInformation: FC<Props> = ({ account }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<UpdateUserType>({
    resolver: yupResolver(UpdateUserYup),
    mode: 'onChange',
    reValidateMode: 'onChange',
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
  }, [isDirty, isValid]);

  const renderGender = () => {
    return genderList.map((data) => {
      return (
        <Select.Option value={data.value} key={data.key}>
          {t(defaultKeyValue[data.key])}
        </Select.Option>
      );
    });
  };

  const renderNation = () => {
    if (dataNation) {
      return dataNation.map((data) => {
        return (
          <Select.Option value={data._id} key={data._id}>
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
    if (data) return navigate('/home');
    setLoading(false);
  };

  return (
    <div className="view inline">
      <SEO title={t(common.basic_information)} />
      <div className="font_membership only_font">
        <div className="title">{t(common.basic_information)}</div>
        <div className="subtit_login">{t(common.enjoy_a_variety_of_videos)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 list_font">
          <Space direction={'vertical'}>
            <Controller
              control={control}
              name="userName"
              render={({ field: { name, onChange, value } }) => (
                <InputForm
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder={t(common.name)}
                  className="w-100"
                />
              )}
            />
            <Controller
              control={control}
              name="userDOB"
              render={({ field: { name, onChange, value } }) => (
                <DatePickerCustom
                  placeholderBlack
                  name={name}
                  placeholder={t(common.birth_date)}
                  onChange={onChange}
                  value={value ? moment(value) : undefined}
                />
              )}
            />
            <Controller
              control={control}
              name="userGender"
              render={({ field: { name, value } }) => (
                <Select
                  value={value}
                  className="select_ant_ct w-100 placeholder_black"
                  onChange={(value) => {
                    setValue(name, value, { shouldValidate: true });
                  }}
                  placeholder={t(defaultKeyValue.choose_your_gender)}
                  suffixIcon={<div className="icon_down" />}
                  dropdownClassName="dropdown_ant_ct"
                >
                  {renderGender()}
                </Select>
              )}
            />
            <Controller
              control={control}
              name="nation"
              render={({ field: { name, value } }) => (
                <Select
                  value={value}
                  className="select_ant_ct w-100 placeholder_black"
                  onChange={(value) => {
                    setValue(name, value, { shouldValidate: true });
                  }}
                  placeholder={t(common.nationality)}
                  suffixIcon={
                    !dataNation ? (
                      <LoadingOutlined style={{ fontSize: 20 }} spin />
                    ) : (
                      <div className="icon_down" />
                    )
                  }
                  dropdownClassName="dropdown_ant_ct"
                  disabled={!dataNation}
                >
                  {renderNation()}
                </Select>
              )}
            />
          </Space>
          <Space direction={'vertical'}>
            <Button
              loading={loading}
              color="primary"
              className="btn-submit-24 w-100 button_ant_ct"
              disabled={!isDirty || !isValid}
              htmlType="submit"
              type="primary"
            >
              {t(common.registration_complete)}
            </Button>
            <Button className="w-100 button_ant_ct" onClick={() => navigate('/home')}>
              {t(common.to_do_next)}
            </Button>
          </Space>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(AccessInformation);
