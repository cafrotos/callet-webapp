import { lazy } from 'react';

interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<any>;
  children?: RouteConfig[];
}

export const generateRoutes = (context: any): RouteConfig[] => {
  const routes: RouteConfig[] = [];

  // Lấy tất cả các file từ context
  const files = context.keys();

  files.forEach((file: string) => {
    // Bỏ qua file index.tsx ở thư mục gốc
    if (file === './index.tsx' || file.includes("404")) return;

    // Chuyển đổi đường dẫn file thành route path
    let path = file
      .replace(/^\.\//, '') // Xóa ./ ở đầu
      .replace(/\/index\.tsx$/, '') // Xóa /index.tsx ở cuối
      .replace(/\.tsx$/, '') // Xóa .tsx ở cuối
      .replace(/\[(\w+)\]/g, ':$1'); // Chuyển [param] thành :param

    // Nếu là file index.tsx, path sẽ là thư mục cha
    if (path === '') path = '/';

    routes.push({
      path,
      element: lazy(() => import(`../pages/${path}`))
    });
  });

  return routes;
};