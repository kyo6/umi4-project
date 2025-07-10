import { SmileFilled, CrownFilled, TabletFilled, ChromeFilled } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';

const IconMap = {
  smile: <SmileFilled />,
  crown: <CrownFilled />,
  tablet: <TabletFilled />,
  chrome: <ChromeFilled />,
};

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as 'smile'],
    children: routes && loopMenuItem(routes),
  }));

// 菜单动态异步渲染
const menuCheck = (initialState: any) => ({
  params: initialState,
  request: async (params: any, defaultMenuData: any) => {
    return loopMenuItem(defaultMenuData);
  }
})

export default menuCheck;
