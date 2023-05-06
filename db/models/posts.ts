const { client } = require('../client');

interface Posts {
    title: string, 
    content: string, 
    usersId: number, 
    isActive: boolean, 
    photo: string
}
const createPost = async ({title, content, usersId, isActive, photo}:Posts) => {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO posts(title, content, "usersId", photo)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [title, content, usersId, photo]);

        return post; 
    } catch (error) {
        console.error(error);
    }
};

//get all active posts
const getAllActivePosts = async () => {
try {
    const { rows: posts } = await client.query(`
    SELECT id
    FROM posts
    WHERE "isActive" = 'true';
    `);

    console.log(posts);
    return posts;
} catch (error) {
    console.error(error);
}
};

//updatePost

//getPostById

//get posts by user

//get post by tag name

module.exports = {
    createPost,
    getAllActivePosts,
}