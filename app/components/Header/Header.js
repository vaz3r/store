import { View, StyleSheet, Text, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthenticationStore, useGlobalStore } from "../../utils/Store/Store";
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import AuthInstance from "../../utils/Authentication/Instance";

const Header = () => {
    const navigation = useNavigation();

    const State = {
        ActiveScreen: useGlobalStore((Store) => Store.ActiveScreen),
        LoggedIn: useAuthenticationStore((Store) => Store.LoggedIn)
    };

    const Logout = () => {
        AuthInstance.Functions.SignOut();
    };

    const Wishlist = () => {
        if (State.LoggedIn) {
            navigation.navigate("Wishlist");
        } else {
            navigation.navigate("Authentication");
        }
    };

    return (
        <View style={styles.header}>
            {
                State.ActiveScreen === "Authentication" ? (
                    <Pressable onPress={() => navigation.navigate("Products")}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
                ) : (
                    State.ActiveScreen !== "Products" ? (
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </Pressable>
                    ) : (
                        <Pressable onPress={() => navigation.navigate("Authentication")}>
                            {
                                State.LoggedIn ? (
                                    <Pressable onPress={() => Logout()}>
                                        <SimpleLineIcons name="logout" size={22} color="black" />
                                    </Pressable>
                                ) : (
                                    <AntDesign name="login" size={24} color="black" />
                                )
                            }
                        </Pressable>
                    )
                )
            }

            {
                State.ActiveScreen === "Products" && (
                    <Text style={styles.headerText}>Products</Text>
                )
            }

            {
                State.ActiveScreen === "Wishlist" && (
                    <Text style={styles.headerText}>Wishlist</Text>
                )
            }

            {
                (State.ActiveScreen !== "Authentication") && (
                    <Pressable onPress={() => Wishlist()}>
                        {
                            (State.ActiveScreen !== "Wishlist") && (
                                <Feather name="shopping-bag" size={24} color="black" />
                            )
                        }
                    </Pressable>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#00000008',
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 600
    }
});

export default Header;