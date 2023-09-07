import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Space } from 'antd';
import 'assets/style/Views/searchPage.scss';
import { common } from 'app/trans';
import { accountService } from 'app/Services';
import { ReactComponent as SearchSVG } from 'assets/icons/search.svg';
import { ReactComponent as CloseSVG } from 'assets/icons/buttonX.svg';
import { ReactComponent as BackSVG } from 'assets/icons/backHeader.svg';
import InputForm from 'components/coreCustom/inputForm';
import { Controller, useForm } from 'react-hook-form';
import { HotSearchType, SearchHeaderType, SearchHeaderYup } from 'app/Models/SearchHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { propertyLang } from 'assets/propertyLang';

const SearchButtonMobile: FC = () => {
  const [t] = useTranslation();
  const navigator = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<SearchHeaderType>({
    resolver: yupResolver(SearchHeaderYup),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { key: '' },
  });
  const [visible, setVisible] = useState(false);
  const [listSearch, setListSearch] = useState<HotSearchType[]>();

  useEffect(() => {
    (async () => {
      const data = await accountService.getListSearch();
      setListSearch(data || []);
    })();
  }, []);

  const onSubmit = async (dataForm: SearchHeaderType) => {
    if (dataForm.key) {
      navigator({ pathname: '/search', search: `?${createSearchParams({ ...dataForm })}` });
    }
  };

  const onchangeSearchItem = (dataSearch: string) => {
    setValue('key', dataSearch);
    handleSubmit(onSubmit)();
  };

  const renderListSearch = () => {
    if (listSearch) {
      return listSearch.map((data) => {
        if (!data.deleted)
          return (
            <Button
              type="ghost"
              key={data._id}
              className="search_item"
              onClick={() => onchangeSearchItem(propertyLang(data, 'name'))}
            >
              {propertyLang(data, 'name')}
            </Button>
          );
      });
    }
  };

  return (
    <>
      <Button
        className="menuRight"
        type="text"
        onClick={() => setVisible(true)}
        icon={<SearchSVG width={24} height={24} />}
      />
      <Drawer
        placement="left"
        size={'default'}
        width={'100vw'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div style={{ height: '100%' }} className="search_page">
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex ai-c">
            <Button
              className="menubtn"
              type="text"
              icon={<BackSVG height={24} width={24} />}
              onClick={() => setVisible(false)}
            ></Button>
            <Controller
              control={control}
              name="key"
              render={({ field: { onChange, name, value } }) => (
                <InputForm
                  value={value}
                  name={name}
                  onChange={onChange}
                  className="w-100 input_search"
                />
              )}
            />
            {isDirty ? (
              <Button
                className="menuRight"
                type="text"
                onClick={() => reset()}
                icon={<CloseSVG width={24} height={24} />}
              />
            ) : (
              <Button
                className="menuRight"
                type="text"
                htmlType="submit"
                icon={<SearchSVG width={24} height={24} />}
              />
            )}
          </form>
          <div className="body_search">
            <div className="title_search">{t(common.popular_search_keyword)}</div>
            <Space size={8} className="list_search" wrap>
              {renderListSearch()}
            </Space>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SearchButtonMobile;
