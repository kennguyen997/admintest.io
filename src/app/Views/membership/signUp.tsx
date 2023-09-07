import React, { FC, useState } from 'react';
import 'assets/style/Views/login.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginCredentials, SignUpForm, SignUpYup } from 'app/Models';
import store from 'app/redux/store';
import { signUp } from 'app/redux/Slices/AccountsSlice';
import { useNavigate } from 'react-router-dom';
import InputForm from 'components/coreCustom/inputForm';
import { Button, Checkbox, Space } from 'antd';
import SEO from 'components/seo';
import ScrollDialog from 'components/Dialog';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';

const SignUp: FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<SignUpForm>({
    resolver: yupResolver(SignUpYup),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  console.log(errors);

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (dataForm: LoginCredentials) => {
    const { userEmail, userPassword } = dataForm;
    console.log({ dataForm });
    setLoading(true);
    const data = await store.dispatch(signUp({ userEmail, userPassword }));
    if (data) return navigate('/email-verification');
    setLoading(false);
  };

  const { width } = useWindowDimensions();
  const [agreeTOC, setAgreeTOC] = useState(false);
  const [showTOCPopup, setShowTOCPopup] = useState(false);
  const [agreePP, setAgreePP] = useState(false);
  const [showPPPopup, setShowPPPopup] = useState(false);

  const setAgree = (
    setAgreeFunc: (arg0: boolean) => void,
    setValue: (arg0: boolean) => void,
    value: boolean,
  ) => {
    setAgreeFunc(value);
    setValue(value);
  };

  return (
    <div className="view inline">
      <SEO title={t(common.sign_up)} />
      <div className="font_membership only_font">
        <div className="title">{t(common.sign_up)}</div>
        <div className="subtit_login">{t(common.create_a_new_account)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 list_font">
          <Space direction="vertical">
            <Controller
              control={control}
              name="userEmail"
              render={({ field: { onChange, name } }) => (
                <InputForm
                  name={name}
                  errorMessage={errors?.userEmail?.message}
                  onChange={onChange}
                  type="email"
                  placeholder={t(common.email_input)}
                />
              )}
            />
            <Controller
              control={control}
              name="userPassword"
              render={({ field: { onChange, name } }) => (
                <InputForm
                  name={name}
                  errorMessage={errors?.userPassword?.message}
                  onChange={onChange}
                  type="password"
                  placeholder={t(common.password_input)}
                />
              )}
            />
            <Controller
              control={control}
              name="userPassword_confirmation"
              render={({ field: { onChange, name } }) => (
                <InputForm
                  name={name}
                  errorMessage={errors?.userPassword_confirmation?.message}
                  onChange={onChange}
                  type="password"
                  placeholder={t(common.password_verify)}
                />
              )}
            />
            <Controller
              control={control}
              name="terms_of_use"
              render={({ field: { onChange, name } }) => (
                <>
                  <Checkbox
                    name={name}
                    checked={agreeTOC}
                    onChange={() => {
                      setShowTOCPopup(true);
                    }}
                    className="checkBox_ant_ct"
                  >
                    {t(common.accept_the_terms_of_use)}
                  </Checkbox>
                  <ScrollDialog
                    isMobile={!(width > 768)}
                    open={showTOCPopup}
                    setOpen={setShowTOCPopup}
                    agreeContent={(value: boolean) => setAgree(setAgreeTOC, onChange, value)}
                    type="TOC"
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="privacy_policy"
              render={({ field: { onChange, name } }) => (
                <>
                  <Checkbox
                    name={name}
                    checked={agreePP}
                    onChange={() => {
                      setShowPPPopup(true);
                    }}
                    className="checkBox_ant_ct"
                  >
                    {t(common.privacy_policy)}
                  </Checkbox>
                  <ScrollDialog
                    isMobile={!(width > 768)}
                    open={showPPPopup}
                    setOpen={setShowPPPopup}
                    agreeContent={(value: boolean) => setAgree(setAgreePP, onChange, value)}
                    type="PP"
                  />
                </>
              )}
            />
          </Space>
          <Button
            loading={loading}
            color="primary"
            className="btn-submit-24 w-100 button_ant_ct"
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

export default SignUp;
