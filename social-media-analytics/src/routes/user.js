const express = require("express");
const router = express.Router();
const { getTopUsers } = require("../services/fetchData");

router.get("/", async (req, res) => {
	try {
		const topUsers = await getTopUsers();
		res.json(topUsers);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
