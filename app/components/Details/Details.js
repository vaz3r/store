import { SafeAreaView, View, StyleSheet, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import { FormatNumber } from "../../utils/Helpers";
import { Wishlist } from "../../utils/Helpers/Wishlist";
import { useAuthenticationStore } from "../../utils/Store/Store";

const Details = ({ navigation, route }) => {
    const Item = route?.params;

    const State = {
        LoggedIn: useAuthenticationStore((Store) => Store.LoggedIn),
    };

    const AddToWishlist = async () => {
        try {
            if (State.LoggedIn) {
                const Result = await Wishlist.Add(Item);

                if (Result) {
                    Alert.alert("Success", "Product has been added to wishlist!");
                } else {
                    Alert.alert("Error", "There has been an error while adding the product to wishlist.");
                }
            } else {
                navigation.navigate("Authentication");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.details}>
            <View style={styles.head}>
                <Image style={styles.image} source={{ uri: Item.image_url }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.meta}>
                    <Text style={styles.brand}>{Item.brand}</Text>
                    <Text>•</Text>
                    <Text style={styles.category}>{Item.category}</Text>
                </View>

                <Text style={styles.name}>{Item.name}</Text>

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas magna at cursus volutpat. Suspendisse ut nibh metus. Nulla est erat, imperdiet quis erat vitae, tincidunt vulputate purus. Quisque pellentesque vitae leo non vulputate. Donec sed luctus enim. Sed non est nec erat dignissim lacinia. Curabitur cursus quam vitae urna sagittis, eu rutrum justo lacinia. Praesent vitae dolor efficitur, imperdiet lorem ac, consequat ligula. Aenean ornare enim quis rhoncus eleifend. Vestibulum ut feugiat sem. Quisque convallis tellus semper urna congue viverra. Nam condimentum lorem id rhoncus congue. Sed feugiat velit ac purus vehicula vehicula.
                </Text>
            </ScrollView>

            <View style={styles.stickyBar}>
                <View style={styles.priceTag}>
                    <Text style={styles.tag}>AED</Text>
                    <Text style={styles.price}>{FormatNumber(Item.price)}</Text>
                </View>

                <Pressable style={styles.wishlistButton} onPress={() => AddToWishlist()}>
                    <Text style={styles.wishlistButtonText}>Add to wishlist</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    details: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
    },
    head: {
        height: '50%',
        maxHeight: '50%',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 10
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    brand: {
        color: '#0f0f0f',
        marginRight: 5,
        fontWeight: 500,
        fontSize: 16
    },
    category: {
        color: '#929292',
        marginLeft: 5,
        fontSize: 16
    },
    name: {
        color: '#000',
        fontSize: 18,
        fontWeight: 600,
        marginTop: 5
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: 'gray',
    },
    stickyBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'whitesmoke',
        backgroundColor: '#fff'
    },
    priceTag: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 500
    },
    price: {
        fontSize: 22,
        fontWeight: 600
    },
    wishlistButton: {
        flexWrap: 'wrap',
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 4,
        alignContent: 'center',
        alignItems: 'center'
    },
    wishlistButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 500
    }
});

export default Details;