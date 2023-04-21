import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { GlobalSlice } from '../Store/Slices/Global';
import { FormSlice } from './Slices/Form';
import { ProductsSlice } from './Slices/Products';
import { ToastSlice } from './Slices/Toast';
import { UserSlice } from './Slices/User';

export const useGlobalStore = create(devtools((State) => GlobalSlice(State), { name: "Global Store" }));
export const useUserStore = create(devtools((State) => UserSlice(State), { name: "User Store" }));
export const useFormStore = create(devtools((State) => FormSlice(State), { name: "Form Store" }));
export const useProductsStore = create(devtools((State) => ProductsSlice(State), { name: "Products Store" }));
export const useToastStore = create(devtools((State) => ToastSlice(State), { name: "Toast Store" }));