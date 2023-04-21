import express, { Router, Request, Response } from 'express';
import { Query } from '../Database';
import { UserAuthentication, SendResponse, IAuthenticationRequest } from '../utils';

const ExpressRouter: Router = express.Router();

ExpressRouter.get('/', UserAuthentication, async (req: Request, res: Response) => {
    try {
        const AuthenticationRequest = req as IAuthenticationRequest;
        const User = AuthenticationRequest.User;

        let Wishlist: any = (await Query(`
        SELECT
            "Wishlist"."ID",
            "Wishlist"."Created",
            "Wishlist"."ProductID",
            "Product"."Name",
            "Product"."Brand",
            "Product"."Category",
            "Product"."ImageURL",
            "Product"."Price"
        FROM "Wishlist"
            INNER JOIN "Products" AS "Product" ON "Product"."ID" = "Wishlist"."ProductID"
        WHERE "Wishlist"."UserID" = ${User.ID}
        ORDER BY "Created" DESC;`))?.rows;

        if (Wishlist !== undefined && Wishlist.length > 0) {
            Wishlist = Wishlist.map((Item: any) => {
                return {
                    id: Item?.ID,
                    productId: Item?.ProductID,
                    created: Item?.Created,
                    name: Item?.Name,
                    brand: Item?.Brand,
                    category: Item?.Category,
                    image_url: Item?.ImageURL,
                    price: Item?.Price
                }
            });

            return SendResponse(res, 200, { Wishlist });
        }
    } catch (error: any) {
        console.log(error?.message);

        return SendResponse(res, 500, {
            Message: error?.message
        });
    }

    return SendResponse(res, 200, { Wishlist: [] });
});

ExpressRouter.post("/", UserAuthentication, async (req: Request, res: Response) => {
    try {
        const AuthenticationRequest = req as IAuthenticationRequest;
        const User = AuthenticationRequest.User;

        const ProductID: string = req.body.ProductID;
        const UserID: string = User.ID;

        const Timestamp: number = Date.now() / 1000;

        const Response = await Query(`INSERT INTO "Wishlist" ("ProductID", "UserID", "Created") VALUES (${ProductID}, ${UserID}, to_timestamp('${Timestamp}'));`);

        if (Response?.rowCount > 0) {
            return SendResponse(res, 201, {
                Message: "Wishlist has been inserted successfully."
            });
        }

        return SendResponse(res, 404, {
            Message: "Invalid parameters supplied to the request"
        });
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

ExpressRouter.delete("/:wishlistId", UserAuthentication, async (req: Request, res: Response) => {
    try {
        const AuthenticationRequest = req as IAuthenticationRequest;
        const User = AuthenticationRequest.User;

        const WishlistID: string = req.params.wishlistId;
        const UserID: string = User.ID;

        const Response = await Query(`DELETE FROM "Wishlist" WHERE "ID" = ${WishlistID} AND "UserID" = ${UserID};`);

        if (Response?.rowCount > 0) {
            return SendResponse(res, 200, {
                Message: "Wishlist has been deleted successfully."
            });
        }

        return SendResponse(res, 404, {
            Message: "Invalid parameters supplied to the request"
        });
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

export default ExpressRouter;