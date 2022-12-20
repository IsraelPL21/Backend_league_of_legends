const { Router } = require("express");
const { getLegends, addLegends } = require("../controllers/Legends");
const { addLegends, getLegends, getLegendsByID, deleteLegendsByID, updateLegendsByLegends } = require("../controllers/Legends");
const router = Router();

//http://localhost:4000/api/v1/messages
//http://localhost:4000/api/v2/Legends

/// GET ///
router.get("/Legends", getLegends);
router.get("/Legends/ID/:ID", LegendsByID)
/// DELETE ///
router.delete("/deleteLegends/ID/:ID", deleteLegendsByID)
/// PATCH ///
router.put("/updateLegends", updateLegendsByLegends)
/// POST ///
router.post("/addLegends", addLegends);
module.exports = router;
