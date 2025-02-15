import { Response } from "express";

const ResHandles = {
    Ok(res:Response, data: any) {
        return res.status(200).json({ message: "success", success: true, data: data})
    },
    ErrorBadRequest(res: Response, msg: string) {
        return res.status(400).json({ message: msg, success: false });
    },
    ErrorUnauthorized(res: Response, msg: string) {
        return res.status(401).json({ message: msg, success: false });
    },
    ErrorForbidden(res: Response, msg: string) {
        return res.status(403).json({ message: msg, success: false });
    },
    ErrorNotFound(res: Response, msg: string) {
        return res.status(404).json({ message: msg, success: false });
    },
};


export default ResHandles