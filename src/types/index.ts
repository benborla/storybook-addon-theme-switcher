import type { ReactElement } from 'react';

export interface GlobalState {
  name: string | undefined;
  selected: string | undefined;
}

export interface BrandSelectorItem {
  id: string;
  title: string;
  onClick: () => void;
  css: string;
  active: boolean;
  indicator?: string;
  right?: ReactElement
}

export interface Brand {
  name: string;
  label: string;
  css: string;
  useIconOnIndicator?: boolean;
  indicator?: string;
}

export interface BrandsParameter {
  default: string;
  disable?: boolean;
  brands: Brand[];
}

export interface BrandsConfig {
  brands: Brand[] | null;
  selectedBrandName: string | null;
  defaultBrandName: string | null;
  disable: boolean;
}
