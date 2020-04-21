SELECT p.post_id, p.title, p.img, p.content, u.username, u.profile_pic FROM posts p
JOIN users u ON p.author_id = u.user_id
WHERE author_id != $1;