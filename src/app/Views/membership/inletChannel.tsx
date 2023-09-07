import React, { FC, useState } from 'react';
import 'assets/style/Views/login.scss';
import { common, defaultKeyValue } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InletChannelYup, UpdateUserType } from 'app/Models';
import store from 'app/redux/store';
import { updateUser } from 'app/redux/Slices/AccountsSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Space } from 'antd';
import SEO from 'components/seo';

const options = [
  { name: 'facebook', value: 'facebook' },
  { name: 'instargram', value: 'instargram' },
  { name: 'google', value: 'google' },
  { name: 'otherInletChannel', value: 'other' },
];

const InletChannel: FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<UpdateUserType>({
    resolver: yupResolver(InletChannelYup),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (dataForm: UpdateUserType) => {
    setLoading(true);
    const data = await store.dispatch(updateUser(dataForm, true));
    if (data) return navigate('/access-information');
    setLoading(false);
  };

  const checkvalue = (chekboxValue: string, value?: string[]) => {
    if (value && value[0] && chekboxValue === value[0]) return true;
    return false;
  };

  const renderOption = (onChange: (...event: any[]) => void, value?: string[]) => {
    return options.map((data) => {
      return (
        <Checkbox
          key={data.value}
          value={data.value}
          onChange={(e: any) => onChange([e.target.value])}
          checked={checkvalue(data.value, value)}
          className="checkBox_ant_ct"
        >
          {t(defaultKeyValue[data.name])}
        </Checkbox>
      );
    });
  };

  return (
    <div className="view inline">
      <SEO title={t(common.survey)} />
      <div className="font_membership only_font">
        <div className="title">{t(common.survey)}</div>
        <div className="subtit_login">
          {t(common.surveySub1)}
          <br />
          {t(common.surveySub2)}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 list_font">
          <Controller
            control={control}
            name="survey"
            render={({ field: { onChange, value } }) => (
              <Space direction={'vertical'}>{renderOption(onChange, value)}</Space>
            )}
          />

          <Button
            loading={loading}
            color="primary"
            className="mt-32 w-100 button_ant_ct"
            disabled={!isDirty || !isValid}
            htmlType="submit"
            type="primary"
          >
            {t(common.next)}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InletChannel;
