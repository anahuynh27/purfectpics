const { client } = require('../client');

interface Posts {
    id: number,
    title: string, 
    content: string, 
    userID: number, 
    isActive: boolean, 
    photo: string
}
const createPost = async ({title, content, userID, photo}: Posts) => {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO posts(title, content, "userID", photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [title, content, userID, photo]);

        return post; 
    } catch (error) {
        console.error(error);
    };
};

//get all active posts
const getAllActivePosts = async () => {
    try {
        const { rows: posts } = await client.query(`
        SELECT * FROM posts
        WHERE "isactive" = 'true';
        `);

        return posts;
    } catch (error) {
        console.error(error);
    };
};

// get all posts
const getAllPosts = async () => {
    try {
        const { rows: posts } = await client.query(`
        SELECT * FROM posts
        `);

        return posts;
    } catch (error) {
        console.error(error);
    };
};

//updatePost
const updatePost = async ({id}:Posts, ...fields: []) => {
    try {
        const setString = Object.keys(fields)
        .map((key, index) => `"${key}=$${index + 1}`)
        .join(", ");
        
        const { rows: [posts] } = await client.query(`
        UPDATE posts
        SET ${setString}
        WHERE id=${id}
        RETURNING *
        `, Object.values(fields));

        return posts;
    } catch (error) {
        console.error(error);
    };
};

//getPostById
const getPostById = async ({ id }: Posts) => {
    try {
        const { rows: [post] } = await client.query(`
        SELECT * FROM posts
        WHERE id = $1
        `, [id]);

        return post;
    } catch (error) {
        console.error(error);
    };
};

//get posts by user
const getPostByUserID = async ({ userID }: Posts) => {
    try {
        const { rows: post } = await client.query(`
        SELECT * FROM posts
        WHERE "userID" = $1
        `, [userID])

        return post
    } catch (error) {
        console.error(error);
    };
};

//get post by tag name

module.exports = {
    createPost,
    updatePost,
    getAllActivePosts,
    getAllPosts,
    getPostById,
    getPostByUserID,
}