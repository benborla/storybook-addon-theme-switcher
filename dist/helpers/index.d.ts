import { Brand } from '../types/index.js';
import 'react';

declare const getBrandByName: (currentSelectedValue: string, brands?: Brand[], defaultName?: string) => Brand | null;
declare const attachThemeStyle: (selector: string, css: string, storyId: string) => void;

export { attachThemeStyle, getBrandByName };
