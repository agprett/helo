SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN users u ON p.author_id = u.user_id
WHERE user_id != $1 AND title LIKE '%' || $2 || '%';