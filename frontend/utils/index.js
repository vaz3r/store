const Version = `v1`;

const Production = true;
const Base = Production ? `https://products-api.inboxglass.com` : `http://192.168.0.149:8082`;

export const Endpoints = {
    USER: `${Base}/api/${Version}/user`,
    PRODUCTS: `${Base}/api/${Version}/products`,
    PRODUCTS_CATEGORIES: `${Base}/api/${Version}/products/categories`,
};

export const UserRank = {
    Admin: 1,
    User: 0
};