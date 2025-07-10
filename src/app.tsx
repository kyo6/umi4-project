import menuCheck from '../config/menu';
import { history } from 'umi';

export const layout = () => {
  return {
    title: 'API管理工具',
    // 配置项参考：https://procomponents.ant.design/components/layout#layout-%E7%9A%84-token
    token: {
      bgLayout: 'rgba(0, 0, 0, 0.04)',
      header: {
        heightLayoutHeader: 40,
        colorBgHeader: 'transparent',
      },
      pageContainer: {
        colorBgPageContainer: '#fff',
      },
    },
    layout: 'mix',
    collapsed: false,
    collapsedButtonRender: false,
    menu: menuCheck,
    menuItemRender: (menuItemProps: any, defaultDom: any) => {
      if (!menuItemProps.path) {
        return defaultDom;
      }
      return (
        <div
          onClick={() => {
            if (!menuItemProps.isUrl) {
              const match = menuItemProps.path.match(/^(.*?):/);
              if (match) {
                history.push(match[1]);
              } else {
                history.push(menuItemProps.path);
              }
            }
          }}
        >
          {defaultDom}
        </div>
      );
    },
  };
};
