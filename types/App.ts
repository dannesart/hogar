export type App = {
  name: string;
  id: string;
  icon: string;
  components?: { name: string; props: any[] }[];
  permissions: {
    read: boolean;
    write: boolean;
  };
};
