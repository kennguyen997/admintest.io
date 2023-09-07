import React from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type Prop = {
  selected: string;
  setSelected: any;
};

const TabsPage = function ({ selected, setSelected }: Prop) {
  const [t] = useTranslation();
  // console.log('selected ne', selected);

  const callback = (key: any) => {
    console.log(key);

    setSelected(key);
  };
  return (
    <div className="tab-in-header">
      <Tabs activeKey={selected} onChange={callback}>
        <TabPane tab={t(common.like)} key="liked"></TabPane>
        <TabPane tab={t(common.bookmark)} key="bookmark"></TabPane>
        <TabPane tab={t(common.voted)} key="voted"></TabPane>
      </Tabs>
    </div>
  );
};

export default TabsPage;
