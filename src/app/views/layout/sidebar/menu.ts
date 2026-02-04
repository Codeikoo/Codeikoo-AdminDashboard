import { MenuItem } from './menu.model';

const BASE = ''; // لو مش بتستخدم /dash خليها '' (فاضي)

export const MENU: MenuItem[] = [

  // =========================
  // MAIN
  // =========================
  { id: 1, label: 'main', isTitle: true },
  { id: 2, label: 'home', icon: 'home', link: `${BASE}/home` },
  { id: 3, label: 'our_details', icon: 'tool', link: `${BASE}/aboutUs` },
   {
    id: 4,
    label: 'hr',
    icon: 'users',
    link: `${BASE}/hr`,
    subItems: [

          {
            label: 'HR.COMPANY.TITLE',
            link: '/academy/job',
            bgcolor: 'primary',
          },

          {
            label: 'HR.COMPANY.TITLE',
            link: '/academy/user',
            bgcolor: 'primary',
          },




    ]
  },

]
