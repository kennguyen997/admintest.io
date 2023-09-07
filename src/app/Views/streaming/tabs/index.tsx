import React from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type Prop = {
  selected: string;
  setSelected: any;
};

const TabsStreaming = function ({ selected, setSelected }: Prop) {
  const [t] = useTranslation();
  // console.log('selected ne', selected);

  const callback = (key: any) => {
    console.log(key);

    setSelected(key);
  };
  return (
    <div className="tab-in-header">
      <Tabs activeKey={selected} onChange={callback}>
        <TabPane tab={t(common.allCapital)} key="all"></TabPane>
        <TabPane tab={t(common.webDrama)} key="webDrama"></TabPane>
        <TabPane tab={t(common.shortMovies)} key="shortMovies"></TabPane>
        <TabPane tab={t(common.musicVideos)} key="musicVideos"></TabPane>
      </Tabs>
    </div>
  );
};

export default TabsStreaming;
