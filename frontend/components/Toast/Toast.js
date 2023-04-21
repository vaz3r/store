import { Fragment, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useToastStore } from "@/utils/Store/Store";

const Toast = () => {
    const State = {
        Toast: {
            Active: useToastStore((Store) => Store.Active),
            Type: useToastStore((Store) => Store.Type),
            Message: useToastStore((Store) => Store.Message),
            Position: useToastStore((Store) => Store.Position),
        }
    };

    const Update = {
        Toast: useToastStore((Store) => Store.setToast)
    };

    useEffect(() => {
        const Active = State.Toast.Active;

        if (Active === true) {
            const Type = State.Toast.Type;
            const Message = State.Toast.Message;
    
            if (Type == "SUCCESS") {
                toast.success(Message);
            } else if (Type == "ERROR") {
                toast.error(Message);
            }

            Update.Toast({ Active: false });
        }
    }, [State.Toast.Active]);

    return (
        <Fragment>
            <Toaster position={State.Toast?.Position} />
        </Fragment>
    );
};

export default Toast;