import React, { FC, useState } from 'react';
import 'assets/style/Views/login.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VerificationType, VerificationYup } from 'app/Models';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import { accountService } from 'app/Services';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Space } from 'antd';
import InputForm from 'components/coreCustom/inputForm';
import store from 'app/redux/store';
import { emailVerification } from 'app/redux/Slices/AccountsSlice';
import useTimer from 'components/countdownTimer';
import SEO from 'components/seo';

type Props = ReturnType<typeof mapStateToProps>;

const EmailVerification: FC<Props> = ({ account }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    formState: { isDirty, isValid },
  } = useForm<VerificationType>({
    defaultValues: { userEmail: account?.userEmail },
    resolver: yupResolver(VerificationYup),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { time, startTimer, isTimerRunning } = useTimer(180);
  const onSubmit = async (dataForm: VerificationType) => {
    setLoadingSubmit(true);
    const data = await store.dispatch(emailVerification(dataForm));
    if (!data) setLoadingSubmit(false);
    else return navigate('/inlet-channel', { replace: true });
  };

  const resendOTP = async () => {
    const errorEmail = await trigger(['userEmail']);
    if (!errorEmail) return;
    const userEmail = getValues('userEmail');
    setLoading(true);
    const data = await accountService.resendOTP(userEmail);
    data && startTimer();
    setLoading(false);
  };

  return (
    <div className="view inline">
      <SEO title={t(common.email_authentication)} />
      <div className="font_membership only_font">
        <div className="title">{t(common.email_authentication)}</div>
        <div className="subtit_login">{t(common.please_enter_your_email)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="w-100 list_font">
            <Space direction="vertical">
              <Controller
                control={control}
                name="userEmail"
                render={({ field: { name, onChange, value } }) => (
                  <InputForm
                    value={value}
                    errorMessage={errors?.userEmail?.message}
                    name={name}
                    onChange={onChange}
                    placeholder={t(common.email_input)}
                    className="w-100"
                    type="email"
                    disabled
                  />
                )}
              />
              <div className="font_horizontal">
                <Col span={16}>
                  <Controller
                    control={control}
                    name="codeOTP"
                    render={({ field: { name, onChange, value } }) => (
                      <InputForm
                        value={value}
                        name={name}
                        onChange={onChange}
                        placeholder={t(common.enter_the_verification_code)}
                      />
                    )}
                  />
                </Col>
                <Col span={8}>
                  <Button
                    loading={loading}
                    color="primary"
                    className="w-100 button_ant_ct"
                    type="primary"
                    onClick={() => resendOTP()}
                    disabled={isTimerRunning}
                  >
                    {!isTimerRunning ? t(common.resend_code) : time}
                  </Button>
                </Col>
                {errors?.codeOTP?.message && (
                  <span className="errorMessage">{errors?.codeOTP?.message} </span>
                )}
              </div>
            </Space>
          </div>
          <Button
            loading={loadingSubmit}
            color="primary"
            className="btn-submit-24 w-100 button_ant_ct"
            disabled={!isDirty || !isValid}
            htmlType="submit"
            type="primary"
          >
            {t(common.confirm)}
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(EmailVerification);
