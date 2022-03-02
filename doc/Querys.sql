
CREATE TABLE users (
    _id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE KEY,
    password VARCHAR(100),
    thumbnail MEDIUMBLOB,
    bio VARCHAR(300)
);

TRUNCATE TABLE users;

CREATE TABLE chats (
	_id VARCHAR(50) PRIMARY KEY,
    status VARCHAR(50),
	user_to VARCHAR(50),
	user_from VARCHAR(50),
    FOREIGN KEY (user_to) REFERENCES users(_id),
    FOREIGN KEY (user_from) REFERENCES users(_id)
);

DROP TABLE chats;

CREATE TABLE messages (
	_id VARCHAR(50) PRIMARY KEY,
	chat_id VARCHAR(50),
	content TEXT,
	data_create DATETIME,
	status VARCHAR(50),
	user_from_id  VARCHAR(50) REFERENCES users(_id),
	user_to_id VARCHAR(50) REFERENCES users(_id),
    FOREIGN KEY (chat_id) REFERENCES chats(_id),
	FOREIGN KEY (user_from_id) REFERENCES users(_id),
	FOREIGN KEY (user_to_id) REFERENCES users(_id)
);

SELECT * FROM users;