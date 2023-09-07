/* eslint-disable jsx-a11y/label-has-associated-control */ //TODO
import React, { FC, useState } from 'react';
import { common, applyPage } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from 'components/coreCustom/inputForm';
import { Button, Modal, Radio, Space, Checkbox } from 'antd';
import 'assets/style/Views/applyPage.scss';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { ApplyType, ApplyYup } from 'app/Models/Apply';
import { accountService } from 'app/Services';
import SEO from 'components/seo';
import i18n from 'app/trans/i18n';

type Props = ReturnType<typeof mapStateToProps>;

const Apply: FC<Props> = () => {
  const [t] = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyType>({
    resolver: yupResolver(ApplyYup),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSubmit = async (dataForm: ApplyType) => {
    setLoading(true);
    const data = await accountService.apply(dataForm);
    setLoading(false);
    if (data) return setOpenModal(true);
  };

  return (
    <div className="view inline">
      <SEO title={t(common.apply)} description={`${t(common.apply_sub)} ${t(common.apply_sub2)}`} />
      <div className="apply_page">
        <div className="title">
          {t(common.apply_title)}
          <br />
          {t(common.apply_title2)}
        </div>
        <div className="sub-title"></div>
        <div className="sub-title">{t(common.apply_sub)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 form_apply">
          <Controller
            control={control}
            name="apply_company_name"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_company_name)}
                </label>
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_company_name?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder={t(common.personal_company_name_plh)}
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="apply_project_name"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_project_name)}
                </label>
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_project_name?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder={t(common.project_plh)}
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="apply_type_video"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_type_video)}
                </label>

                <Radio.Group onChange={onChange} value={value} className="input_ant_ct_2">
                  <Space direction="vertical">
                    <Radio value={1}>{t(applyPage.apply_type_video_1)}</Radio>
                    <Radio value={2}>{t(applyPage.apply_type_video_2)}</Radio>
                    <Radio value={3}>{t(applyPage.apply_type_video_3)}</Radio>
                  </Space>
                </Radio.Group>
                {errors?.apply_type_video?.message && (
                  <span className="errorMessage">{errors.apply_type_video.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="apply_project_content"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_project_content)}
                </label>
                <TextArea
                  id={name}
                  bordered={false}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={t(common.additional_information_plh)}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
                {errors?.apply_project_content?.message && (
                  <span className="errorMessage">{errors.apply_project_content.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="apply_email"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_email)}
                </label>
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_email?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder="e.g., cs@terafty.com"
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="apply_phone"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                {i18n.language == 'korean' ? (
                  <label htmlFor={name} className="required">
                    {t(applyPage.apply_phone)}
                  </label>
                ) : (
                  <label htmlFor={name}>{t(applyPage.apply_phone)}</label>
                )}
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_phone?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder="ex.010-1234-1234"
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="apply_budget"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_budget)}
                </label>
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_budget?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder={t(common.estimated_cost_plh)}
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="apply_how_long"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name}>{t(applyPage.apply_how_long)}</label>
                <InputForm
                  id={name}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  placeholder={t(common.production_schedule_plh)}
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="apply_link"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name} className="required">
                  {t(applyPage.apply_link)}
                </label>
                <InputForm
                  id={name}
                  errorMessage={errors?.apply_link?.message}
                  allowClear
                  bordered={false}
                  value={value}
                  name={name}
                  onChange={onChange}
                  className="w-100 input_ant_ct_2"
                />
              </div>
            )}
          />

          {i18n.language == 'korean' ? (
            <Space direction="vertical">
              <div className="imput_form">
                <label htmlFor="apply_expect_benefit" className="required">
                  {t(applyPage.apply_expect_benefit)}
                </label>
                <label htmlFor="apply_expect_benefit" className="ant-checkbox-wrapper">
                  <span></span>
                </label>
                <Controller
                  control={control}
                  name="apply_expect_benefit_1"
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox value={value} name={name} onChange={onChange} key={1}>
                      {t(applyPage.apply_expect_benefit_1)}
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="apply_expect_benefit_2"
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox value={value} name={name} onChange={onChange} key={2}>
                      {t(applyPage.apply_expect_benefit_2)}
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="apply_expect_benefit_3"
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox value={value} name={name} onChange={onChange} key={3}>
                      {t(applyPage.apply_expect_benefit_3)}
                    </Checkbox>
                  )}
                />
                <Controller
                  control={control}
                  name="apply_expect_benefit_4"
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox value={value} name={name} onChange={onChange} key={4}>
                      {t(applyPage.apply_expect_benefit_4)}
                    </Checkbox>
                  )}
                />
              </div>
            </Space>
          ) : null}

          <Controller
            control={control}
            name="apply_extra_information"
            render={({ field: { name, onChange, value } }) => (
              <div className="imput_form">
                <label htmlFor={name}>{t(applyPage.apply_extra_information)}</label>
                <TextArea
                  id={name}
                  bordered={false}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={''}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
                {errors?.apply_extra_information?.message && (
                  <span className="errorMessage">{errors.apply_extra_information.message}</span>
                )}
              </div>
            )}
          />
          <Button
            loading={loading}
            color="primary"
            className="w-100 button_ant_ct button_submit_apply"
            htmlType="submit"
            type="primary"
          >
            {t(common.apply)}
          </Button>
        </form>
      </div>
      <Modal
        className="apply_modal"
        centered
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        width={400}
        footer={
          <Button className="btn_susses w-100" type="text" onClick={() => setOpenModal(false)}>
            {t(common.confirm)}
          </Button>
        }
      >
        <div className="title" style={{ display: 'flex', justifyContent: 'center' }}>
          {t(common.application_complete)}
        </div>
        <div className="sub_title">
          <div>{t(common.application_sub_1)}</div>
          <div>{t(common.application_sub_2)}</div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(Apply);
