import { DropboxOutlined, SettingFilled } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import classNames from 'classnames';

import Style from './index.less';
const LeftMenu = () => {
  const menu = [
    {
      icon: <DropboxOutlined />,
      tittle: '接口管理',
      href: '/home',
    },
    {
      icon: <SettingFilled />,
      tittle: '项目配置',
      href: '/setting',
    },
  ];
  return (
    <div className={Style['api-left-menu']}>
      <Space direction="vertical" size={14} style={{ width: '100%' }}>
        {menu.map(({ href, icon, tittle }) => (
          <Typography.Link
            key={href}
            href={href}
            className={classNames(Style['api-left-menu-btn'], {
              [Style['api-left-menu-btn-active']]: location.pathname === href,
            })}
          >
            <div className={Style['api-left-menu-icon']}>{icon}</div>
            <div className={Style['api-left-menu-tittle']}>{tittle}</div>
          </Typography.Link>
        ))}
      </Space>
    </div>
  );
};

export default LeftMenu;
