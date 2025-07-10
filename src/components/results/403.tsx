import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

import styles from './styles.less';

const UnAccessiblePage: React.FC = () => (
  <Result
    className={styles.bg}
    status="error"
    title="错误"
    subTitle="抱歉，您无权访问该页面。"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
    icon={<div className={`${styles.econtainer} ${styles.e403}`} />}
  />
);

export default UnAccessiblePage;
