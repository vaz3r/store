import { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Product from "./Product";
import { Products } from "../../utils/Helpers/Products";
import { useAuthenticationStore, useProductsStore, useSignalsStore } from "../../utils/Store/Store";
import Filters from "../Filters";

const Screen = ({ navigation }) => {
    const [Refreshing, setRefreshing] = useState(false);

    const State = {
        Products: useProductsStore((Store) => Store.Products),
        LoggedIn: useAuthenticationStore((Store) => Store.LoggedIn),
        Signals: {
            Refresh: useSignalsStore((Store) => Store.Refresh)
        },
        Filters: {
            Category: useProductsStore((Store) => Store.Filters.Category)
        }
    };

    const Update = {
        Products: useProductsStore((Store) => Store.setProducts)
    };

    const getProducts = async () => {
        setRefreshing(true);

        try {
            const Items = await Products.Get();
            Update.Products(Items);
        } catch (error) {
            console.log(error);
        }

        setRefreshing(false);
    };

    useEffect(() => {
        getProducts();
    }, [State.LoggedIn, State.Signals.Refresh, State.Filters.Category]);

    return (
        <Fragment>
            <View style={styles.container}>
                <Filters />
                <FlatList onRefresh={() => getProducts()} refreshing={Refreshing} numColumns={2} data={State.Products} renderItem={({ item }) => <Product Item={item} />} keyExtractor={item => item.id} />
            </View>
        </Fragment>
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