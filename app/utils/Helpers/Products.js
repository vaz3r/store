import { Endpoints } from "..";
import { getToken } from "./Authentication";
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProductsStore } from "../Store/Store";

export const Products = {
    Get: async () => {
        try {
            const NetworkState = await Network.getNetworkStateAsync();

            if (NetworkState.isConnected === true && NetworkState.isInternetReachable === true) {
                const Filters = {
                    Category: useProductsStore.getState().Filters?.Category
                };

                const Response = await (await fetch(Filters.Category === null ? Endpoints.PRODUCTS : `${Endpoints.PRODUCTS}/${Filters.Category}`, {
                    method: "GET",
                })).json();

                if (Response?.Status === 200) {
                    await AsyncStorage.setItem('Products', JSON.stringify(Response?.Products));
                    return Response?.Products;
                }
            } else {
                const Products = await AsyncStorage.getItem('Products');

                if (Products !== null) {
                    return JSON.parse(Products);
                }
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    },
    Categories: async () => {
        try {
            const Response = await (await fetch(Endpoints.PRODUCTS_CATEGORIES, {
                method: "GET",
            })).json();

            console.log(Response);
            
            if (Response?.Status === 200) {
                return Response?.Categories;
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    },
};