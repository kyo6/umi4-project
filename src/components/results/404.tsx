import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

import styles from './styles.less';

const NoFoundPage: React.FC = () => (
  <Result
    className={styles.bg}
    status="error"
    title="错误"
    subTitle="抱歉，您访问的页面不存在。"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
    icon={<div className={`${styles.econtainer} ${styles.e404}`} />}
  />
);

export default NoFoundPage;
