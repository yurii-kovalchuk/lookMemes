export type Category = {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  hasUpdate: boolean;
  isDefault: boolean;
};

export type QueryParams = Record<string, string>;
