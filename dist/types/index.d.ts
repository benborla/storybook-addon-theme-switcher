import { ReactElement } from 'react';

interface GlobalState {
    name: string | undefined;
    selected: string | undefined;
}
interface BrandSelectorItem {
    id: string;
    title: string;
    onClick: () => void;
    css: string;
    active: boolean;
    indicator?: string;
    right?: ReactElement;
}
interface Brand {
    name: string;
    label: string;
    css: string;
    useIconOnIndicator?: boolean;
    indicator?: string;
}
interface BrandsParameter {
    default?: string;
    disable?: boolean;
    brands: Brand[];
}
interface BrandsConfig {
    brands: Brand[] | null;
    selectedBrandName: string | null;
    defaultBrandName: string | null;
    disable: boolean;
}

export { Brand, BrandSelectorItem, BrandsConfig, BrandsParameter, GlobalState };
