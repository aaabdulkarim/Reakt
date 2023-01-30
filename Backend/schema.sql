-- User table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL
);


-- Scores table
CREATE TABLE IF NOT EXISTS scores(
  
    id int,
    score int NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id)
);

-- Friends table
CREATE TABLE IF NOT EXISTS friends (
    friend1_id int NOT NULL,
    friend2_id int NOT NULL
);


