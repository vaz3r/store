import { Endpoints } from "..";
import { getToken } from "./Authentication";
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocalWishlist = async () => {
    try {
        const Wishlist = await AsyncStorage.getItem('LocalWishlist');

        if (Wishlist !== null) {
            return JSON.parse(Wishlist);
        }
    } catch (error) {
        console.log(error);
    }

    return [];
};

export const Wishlist = {
    Get: async () => {
        try {
            const NetworkState = await Network.getNetworkStateAsync();

            if (NetworkState.isConnected === true && NetworkState.isInternetReachable === true) {
                const Token = getToken();

                if (Token !== null) {
                    const Response = await (await fetch(Endpoints.WISHLIST, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${Token}`
                        }
                    })).json();

                    if (Response?.Status === 200) {
                        await AsyncStorage.setItem('Wishlist', JSON.stringify(Response?.Wishlist));
                        return Response?.Wishlist;
                    }
                }
            } else {
                let Wishlist = await AsyncStorage.getItem('Wishlist');
                const LocalWishlist = await getLocalWishlist();

                if (Wishlist !== null) {
                    Wishlist = JSON.parse(Wishlist);

                    return Wishlist.concat(LocalWishlist);
                }
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    },
    Add: async (Product) => {
        try {
            const NetworkState = await Network.getNetworkStateAsync();

            if (NetworkState.isConnected === true && NetworkState.isInternetReachable === true) {
                const Token = getToken();

                if (Token !== null) {
                    const Response = await (await fetch(Endpoints.WISHLIST, {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${Token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ProductID: Product.id
                        })
                    })).json();

                    if (Response?.Status === 201) {
                        return true;
                    }
                }
            } else {
                const LocalWishlist = await getLocalWishlist();
                LocalWishlist.push(Product);

                await AsyncStorage.setItem('LocalWishlist', JSON.stringify(LocalWishlist));
                return true;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    },
    Delete: async (WishlistID) => {
        try {
            const Token = getToken();

            if (Token !== null) {
                const Response = await (await fetch(`${Endpoints.WISHLIST}/${WishlistID}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${Token}`,
                    }
                })).json();

                if (Response?.Status === 200) {
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    }
};