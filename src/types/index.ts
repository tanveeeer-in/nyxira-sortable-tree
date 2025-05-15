export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  children?: MenuItem[];
}
