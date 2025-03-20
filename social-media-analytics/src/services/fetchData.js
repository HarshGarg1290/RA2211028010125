const axios = require("axios");
const cache = require("./caching");

const BASE_URL = "http://20.244.56.144/test";

// Fetch all users
async function fetchUsers() {
	const cacheKey = "users";
	const cachedData = cache.get(cacheKey);
	if (cachedData) return cachedData;

	const response = await axios.get(`${BASE_URL}/users`);
	cache.set(cacheKey, response.data.users);
	return response.data.users;
}

// Fetch all posts at once
async function fetchAllPosts() {
	const cacheKey = "all_posts";
	const cachedData = cache.get(cacheKey);
	if (cachedData) return cachedData;

	const users = await fetchUsers();
	let allPosts = [];

	const postPromises = Object.keys(users).map(async (userId) => {
		const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
		return response.data.posts;
	});

	const userPosts = await Promise.all(postPromises);
	allPosts = userPosts.flat(); // Merge all posts

	cache.set(cacheKey, allPosts);
	return allPosts;
}

// Fetch comments for posts
async function fetchCommentsForPosts(postIds) {
	const commentPromises = postIds.map(async (postId) => {
		const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
		return { postId, comments: response.data.length };
	});

	const commentsData = await Promise.all(commentPromises);
	return Object.fromEntries(
		commentsData.map(({ postId, comments }) => [postId, comments])
	);
}

// Get top 5 users with most posts
async function getTopUsers() {
	const allPosts = await fetchAllPosts();
	const postCount = {};

	allPosts.forEach((post) => {
		postCount[post.userid] = (postCount[post.userid] || 0) + 1;
	});

	const users = await fetchUsers();
	return Object.entries(postCount)
		.map(([userId, count]) => ({
			userId,
			name: users[userId],
			postCount: count,
		}))
		.sort((a, b) => b.postCount - a.postCount)
		.slice(0, 5);
}

// Get most popular post(s)
async function getTopPosts() {
	const allPosts = await fetchAllPosts();
	const postIds = allPosts.map((post) => post.id);

	const commentCounts = await fetchCommentsForPosts(postIds);
	const maxComments = Math.max(...Object.values(commentCounts));

	return allPosts.filter((post) => commentCounts[post.id] === maxComments);
}

// Get latest 5 posts
async function getLatestPosts() {
	const allPosts = await fetchAllPosts();
	return allPosts.sort((a, b) => b.id - a.id).slice(0, 5);
}

module.exports = { getTopUsers, getTopPosts, getLatestPosts };
