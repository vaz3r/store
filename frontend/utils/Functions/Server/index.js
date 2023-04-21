const nookies = require('nookies').default;
const axios = require('axios').default;

import { Endpoints } from "../../";

const getAuthenticatedUser = async (Context) => {
    try {
        const cookies = nookies.get(Context);
        const Token = cookies?._JWTOKEN;

        if (Token != undefined && Token.length > 0) {
            const Response = (await axios({
                url: Endpoints.USER,
                method: 'GET',
                withCredentials: false,
                headers: {
                    'Authorization': `Bearer ${Token}`
                },
                data: null
            }))?.data;

            if (Response != null && Response.Status == 200) {
                return Response;
            }
        }
    } catch (error) {
        console.log(error.message);
    }

    return null;
};

export { getAuthenticatedUser };