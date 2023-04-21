const Version = `v1`;

const Production = true;
const Base = Production ? `https://products-api.inboxglass.com` : `http://192.168.0.149:8080`;

export const Endpoints = {
    USER: `${Base}/api/${Version}/user`,
    PRODUCTS: `${Base}/api/${Version}/products`,
    WISHLIST: `${Base}/api/${Version}/wishlist`,
    PRODUCTS_CATEGORIES: `${Base}/api/${Version}/products/categories`,
};