import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/starter', title: 'Dashboard', icon: 'fa fa-dashboard', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/users/list', title: 'Users', icon: 'fa fa-users', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/users/list', title: 'List users', icon: 'fa fa-users', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/users/create', title: 'Create new', icon: 'fa fa fa-user-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },
  {
    path: '/shops', title: 'Shops', icon: 'fa fa-shopping-cart', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/shops', title: 'Shops', icon: 'fa fa-shopping-cart', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/shops/create', title: 'Shop Create', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/companies', title: 'Companies', icon: 'fa fa-building', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/companies', title: 'Companies', icon: 'fa fa-building', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/companies/create', title: 'Company Create', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
      // { path: '/companies/categories', title: 'Order categories', icon: 'fa fa-cubes', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      // { path: '/companies/categories/create', title: 'Create new category', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },
  {
    path: '/drivers', title: 'Drivers', icon: 'fa fa-truck', class: 'has-arrow', label: '', labelClass: '', extralink: false,
    submenu: [
      { path: '/drivers', title: 'Drivers', icon: 'fa fa-truck', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/drivers/create', title: 'Driver Create', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/products', title: 'Products', icon: 'fa fa-database', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/products', title: 'Products', icon: 'fa fa-database', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/create', title: 'Product Create', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/categories', title: 'Products categories', icon: 'fa fa-cubes', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/categories/create', title: 'Create new category', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/options', title: 'Products options', icon: 'fa fa-cubes', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/options/create', title: 'Create new option', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },
  {
    path: '/orders/list', title: 'Orders', icon: 'fa fa-bars', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/orders/list', title: 'Orders', icon: 'fa fa-usd', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/refunds', title: 'Refunds', icon: 'fa fa-undo', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/banners', title: 'Banners', icon: 'fa fa-image', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/banners', title: 'Banners', icon: 'fa fa-image', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/banners/create', title: 'New banner', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/posts', title: 'Posts', icon: 'fa fa-pagelines', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/posts', title: 'Listing', icon: 'fa fa-pagelines', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
      // { path: '/posts/create', title: 'New post', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/newsletter/contacts', title: 'Newsletter', icon: 'fa fa-envelope', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/newsletter/contacts', title: 'Contacts', icon: 'fa fa-users', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/newsletter/sendmail', title: 'Sendmail', icon: 'fa fa-envelope', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/complaints', title: 'Complaints', icon: 'fa fa-comment', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/complaints', title: 'Listing', icon: 'fa fa-comment', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/request-payout/seller', title: 'Requests Payout', icon: 'fa fa-dollar', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/request-payout/seller', title: 'Seller Request', icon: 'fa fa-shopping-cart', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/request-payout/delivery', title: 'Delivery Request', icon: 'fa fa-building', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/report/seller/sales', title: 'Report', icon: 'fa fa-flag', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      {
        path: '/report/seller/sales', title: 'Seller', icon: 'fa fa-shopping-cart', class: '', label: '', labelClass: '', extralink: false, submenu: [
          { path: '/report/seller/sales', title: 'Sales', icon: 'fa fa-tag', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/report/seller/payout', title: 'Payout', icon: 'fa fa-dollar', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
      },
      {
        path: '/report/delivery/sales', title: 'Delivery Company', icon: 'fa fa-building', class: '', label: '', labelClass: '', extralink: false, submenu: [
          { path: '/report/delivery/sales', title: 'Deliveries', icon: 'fa fa-truck', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/report/delivery/payout', title: 'Payout', icon: 'fa fa-dollar', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
      }
    ]
  },
  {
    path: '/configs', title: 'Config', icon: 'fa fa-cogs', class: '', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/configs', title: 'Config', icon: 'fa fa-cogs', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '/i18n/languages', title: 'I18n', icon: 'fa fa-flag', class: '', label: '', labelClass: '', extralink: false, submenu: [
          { path: '/i18n/languages', title: 'Languages', icon: 'fa fa-flag', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/i18n/text', title: 'Text', icon: 'fa fa-font', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
      }
    ]
  },
  {
    path: '/packages', title: 'Packages', icon: 'fa fa-product-hunt', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/packages', title: 'Packages', icon: 'fa fa-product-hunt', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/packages/create', title: 'Package Create', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/packages/history', title: 'Package Payment History', icon: 'fa fa-dollar', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  }
];
