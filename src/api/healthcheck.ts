import express from "express";
import ResHandles from "../components/reshandles";

const healthCheck = express.Router();

healthCheck.get("/", (req, res) => {
    return ResHandles.Ok(res, { hp: "100/100 💖", mana: "120/120 🧋" })
});

export default healthCheck;