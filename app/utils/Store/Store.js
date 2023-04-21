import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

import { GlobalSlice } from '../Store/Slices/Global';
import { AuthenticationSlice } from '../Store/Slices/Authentication';
import { ProductsSlice } from './Slices/Products';
import { WishlistSlice } from './Slices/Wishlist';
import { SignalsSlice } from './Slices/Signals';

export const useGlobalStore = create(devtools((State) => GlobalSlice(State), { name: "Global Store" }));
export const useAuthenticationStore = create(devtools((State) => AuthenticationSlice(State), { name: "Authentication Store" }));
export const useProductsStore = create(devtools((State) => ProductsSlice(State), { name: "Products Store" }));
export const useWishlistStore = create(devtools((State) => WishlistSlice(State), { name: "Wishlist Store" }));
export const useSignalsStore = create(devtools((State) => SignalsSlice(State), { name: "Signals Store" }));