import { View, StyleSheet, Text, Image, Pressable, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CreateSignal, FormatNumber } from "../../utils/Helpers";
import { Wishlist } from "../../utils/Helpers/Wishlist";
import { useSignalsStore } from "../../utils/Store/Store";

const WishlistItem = ({ Item }) => {
    const navigation = useNavigation();

    const Update = {
        Signals: {
            Refresh: useSignalsStore((Store) => Store.setRefresh)
        }
    };

    const RemoveFromWishlist = async () => {
        try {
            const Result = await Wishlist.Delete(Item.id);

            if (Result) {
                Alert.alert("Success", "Product has been removed from wishlist!");
                Update.Signals.Refresh(CreateSignal());
            } else {
                Alert.alert("Error", "There has been an error while removing the product from wishlist.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Pressable style={styles.wishListItem} onPress={() => navigation.navigate("Details", Item)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="cover" source={{ uri: Item.image_url }}></Image>

                <Pressable style={styles.favoriteButton} onPress={() => RemoveFromWishlist()}>
                    <AntDesign name="heart" size={24} color="red" />
                </Pressable>
            </View>

            <View style={styles.meta}>
                <View style={styles.info}>
                    <Text style={styles.brand}>{Item.brand}</Text>
                    <Text style={styles.category}>{Item.category}</Text>
                </View>

                <Text numberOfLines={2} style={styles.name}>{Item.name}</Text>

                <View style={styles.priceTag}>
                    <Text style={styles.tag}>AED</Text>
                    <Text style={styles.price}>{FormatNumber(Item.price)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wishListItem: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative'
    },
    image: {
        width: '100%',
        height: 194
    },
    meta: {
        flex: 1
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40
    },
    brand: {
        color: '#181818',
        fontWeight: 500
    },
    category: {
        color: 'gray'
    },
    name: {
        color: '#696969',
        lineHeight: 16,
        textTransform: 'uppercase'
    },
    priceTag: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-end',
        marginTop: 5
    },
    price: {
        fontSize: 14,
        fontWeight: 500,
    },
    tag: {
        fontSize: 12,
        marginRight: 3,
        color: 'gray'
    },
    favoriteButton: {
        position: 'absolute',
        right: 8,
        top: 8
    }
});

export default WishlistItem;