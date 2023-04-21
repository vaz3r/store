import { Response, Request, NextFunction } from 'express';
import { VerifyToken } from '../Authentication/Firebase';
import { Query } from '../Database';

export interface IAuthenticationRequest extends Request {
    User: any;
};

export const SendResponse = (Response: Response, Status: number, Payload: Object) => {
    return Response.status(Status).json({
        Status: Status,
        ...Payload
    });
};

export const UserAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const AuthenticationRequest = req as IAuthenticationRequest;
        const Authorization = AuthenticationRequest?.headers?.authorization;

        if (Authorization !== undefined) {
            const Token = Authorization.split(' ');

            if (Token != undefined && Token.length == 2) {
                console.log({ Token: Token[1].slice(Token[1].length - 32, Token[1].length) });

                const UID = (await VerifyToken(Token[1]))?.uid;

                if (UID != null) {
                    const User = (await Query(`SELECT * FROM "Users" WHERE "UID" = '${UID}'`))?.rows[0];

                    if (User != undefined) {
                        AuthenticationRequest.User = User;

                        return next();
                    }
                }
            }
        }
    } catch (error) {
    }

    return SendResponse(res, 401, {
        Message: "Access to this resource is not authorized."
    });
};