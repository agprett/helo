UPDATE posts
SET title = $1, img = $2, content = $3
WHERE post_id = $4;