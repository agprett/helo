SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN users u ON p.author_id = u.user_id
WHERE author_id != $1;