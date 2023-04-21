import { Endpoints } from "@/utils";
import nookies from 'nookies';

export const getToken = () => {
    try {
        const cookies = nookies.get();
        const Token = cookies?._JWTOKEN;

        if (Token != undefined && Token.length > 0) {
            return Token;
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const Products = {
    Add: async (Name, Brand, Category, Price, ImageURL) => {
        try {
            const Token = getToken();

            if (Token !== null) {
                const Response = await (await fetch(Endpoints.PRODUCTS, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${Token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: Name,
                        Brand: Brand,
                        Category: Category,
                        Price: Price,
                        ImageURL: ImageURL
                    })
                })).json();

                if (Response?.Status === 201) {
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    },
    Edit: async (ProductID, Name, Brand, Category, Price, ImageURL) => {
        try {
            const Token = getToken();

            if (Token !== null) {
                const Response = await (await fetch(`${Endpoints.PRODUCTS}/${ProductID}`, {
                    method: "PATCH",
                    headers: {
                        'Authorization': `Bearer ${Token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: Name,
                        Brand: Brand,
                        Category: Category,
                        Price: Price,
                        ImageURL: ImageURL
                    })
                })).json();

                if (Response?.Status === 200) {
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    },
    Delete: async (ProductID) => {
        try {
            const Token = getToken();

            if (Token !== null) {
                const Response = await (await fetch(`${Endpoints.PRODUCTS}/${ProductID}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${Token}`
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
    },
    Get: async () => {
        try {
            const Token = getToken();

            if (Token !== null) {
                const Response = await (await fetch(Endpoints.PRODUCTS, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${Token}`
                    }
                })).json();

                if (Response?.Status === 200) {
                    return Response?.Products;
                }
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    }
};