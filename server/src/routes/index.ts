import express from "express";
import { userModule } from "../modules/user.module";
import { stuffModule } from "../modules/stuff.module";
import { agreementsModule } from "../modules/agreements.module";
import { interestingTableModule } from "../modules/interestingTable.module";

const router = express.Router();

router.use("/user", userModule.router);
router.use("/stuff", stuffModule.router);
router.use("/agreements", agreementsModule.router);
router.use("/interesting-table", interestingTableModule.router);

export default router;
