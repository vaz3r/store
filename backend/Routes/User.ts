import express, { Router, Request, Response } from 'express';
import { Query } from '../Database';
import { UserAuthentication, SendResponse, IAuthenticationRequest } from '../utils';

const ExpressRouter: Router = express.Router();

ExpressRouter.get('/', UserAuthentication, async (req: Request, res: Response) => {
    try {
        const AuthenticationRequest = req as IAuthenticationRequest;
        const User = AuthenticationRequest.User;

        return SendResponse(res, 200, User);
    } catch (error: any) {
        console.log(error?.message);

        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

ExpressRouter.post("/", async (req: Request, res: Response) => {
    try {
        const UID = req.body.UID;
        const FullName = req.body.FullName;
        const Email = req.body.Email;
        const Photo = req.body.Photo;
        const Provider = req.body.Provider;

        const Timestamp: number = Date.now() / 1000;

        if (UID != undefined && Email != undefined) {
            const _Query = `INSERT INTO "Users" ("UID", "Email", "Provider", "FullName", "Photo", "Created", "LastActivity") VALUES ('${UID}', '${Email}', '${Provider}', '${FullName}', '${Photo}', to_timestamp('${Timestamp}'), to_timestamp('${Timestamp}')) ON CONFLICT("UID") DO UPDATE SET "LastActivity" = EXCLUDED."LastActivity"`;
            const Response = await Query(_Query);

            if (Response != undefined && Response.rowCount == 1) {
                return SendResponse(res, 200, {
                    Message: "Profile has been created successfully."
                });
            } else {
                return SendResponse(res, 500, {
                    Message: "There was an issue creating a profile."
                });
            }
        } else {
            return SendResponse(res, 404, {
                Message: "No parameters were specified in the request."
            });
        }
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

export default ExpressRouter;