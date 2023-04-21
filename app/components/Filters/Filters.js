import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuthenticationStore, useGlobalStore, useProductsStore } from "../../utils/Store/Store";
import { useEffect, useState } from "react";
import { Products } from "../../utils/Helpers/Products";

const Filters = () => {
    const navigation = useNavigation();
    const [Categories, setCategories] = useState([]);

    const State = {
        ActiveScreen: useGlobalStore((Store) => Store.ActiveScreen),
        LoggedIn: useAuthenticationStore((Store) => Store.LoggedIn),
        Filters: {
            Category: useProductsStore((Store) => Store.Filters.Category)
        }
    };

    const Update = {
        Filters: useProductsStore((Store) => Store.setFilters)
    };

    useEffect(() => {
        Products.Categories().then(Categories => setCategories(Categories));
    }, []);

    if (Categories == undefined || Categories.length <= 0) { return null; }

    return (
        <View style={styles.filters}>
            <ScrollView style={styles.scrollView} horizontal>
                <Pressable style={[styles.filter, State.Filters.Category === null ? styles.activeFilter : null]} onPress={() => Update.Filters({ Category: null })}>
                    <Text>View All</Text>
                </Pressable>

                {
                    Categories.map((Category, Key) => {
                        return (
                            <Pressable key={Key} style={[styles.filter, State.Filters.Category === Category.name ? styles.activeFilter : null]} onPress={() => Update.Filters({ Category: Category.name })}>
                                <Text>{Category.name}</Text>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    filters: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scrollView: {
        flexDirection: 'row',
        width: '100%',
    },
    filter: {
        height: 40,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 35,
        borderColor: '#d4d4d4',
        marginRight: 10
    },
    activeFilter: {
        borderColor: '#848484'
    }
});

export default Filters;