export type Category = {
  id: string;
  name: string;
  isActive: boolean;
  isDefault: boolean;
  order: number;
};

export type QueryParams = Record<string, string>;
