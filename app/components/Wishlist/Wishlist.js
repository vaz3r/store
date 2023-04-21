import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Wishlist } from "../../utils/Helpers/Wishlist";
import { useAuthenticationStore, useSignalsStore, useWishlistStore } from "../../utils/Store/Store";
import WishlistItem from "./WishlistItem";

const Screen = ({ navigation }) => {
    const [Refreshing, setRefreshing] = useState(false);

    const State = {
        Wishlist: useWishlistStore((Store) => Store.Wishlist),
        LoggedIn: useAuthenticationStore((Store) => Store.LoggedIn),
        Signals: {
            Refresh: useSignalsStore((Store) => Store.Refresh)
        }
    };

    const Update = {
        Wishlist: useWishlistStore((Store) => Store.setWishlist)
    };

    const getWishlist = async () => {
        setRefreshing(true);

        try {
            if (State.LoggedIn) {
                const Items = await Wishlist.Get();
                Update.Wishlist(Items);
            }
        } catch (error) {
            console.log(error);
        }

        setRefreshing(false);
    };

    useEffect(() => {
        getWishlist();
    }, [State.LoggedIn]);

    useEffect(() => {
        if (State.Signals.Refresh !== null) {
            getWishlist();
        }
    }, [State.Signals.Refresh]);

    return (
        <View style={styles.container}>
            <FlatList onRefresh={() => getWishlist()} refreshing={Refreshing} numColumns={1} data={State.Wishlist} renderItem={({ item }) => <WishlistItem Item={item} />} keyExtractor={item => item.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Screen;