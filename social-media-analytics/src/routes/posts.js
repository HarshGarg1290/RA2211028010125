const express = require("express");
const router = express.Router();
const { getTopPosts, getLatestPosts } = require("../services/fetchData");

router.get("/", async (req, res) => {
	try {
		const type = req.query.type;
		if (!type || !["popular", "latest"].includes(type)) {
			return res.status(400).json({ error: "Invalid type parameter" });
		}

		const posts =
			type === "popular" ? await getTopPosts() : await getLatestPosts();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
