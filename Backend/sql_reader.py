import sqlite3
conn = sqlite3.connect("Backend/reaktdata.db")

with open("Backend/schema.sql") as f:
    conn.executescript(f.read())

cursor = conn.cursor()

def create_account(username, password):
    cursor.execute(f"INSERT INTO users (username, password, avgscore, highscore) VALUES ( {username}, {password}, 0, 0)")


def add_friendship(id1, id2):
    cursor.execute(f"INSERT INTO friends (friend1_id, friend2_id) VALUES ( {id1}, {id2})")


def add_scores(id, score):
    cursor.execute(f"SELECT highscore FROM users WHERE id = {id}")
    highscore = cursor.fetchall()[0][0]
    
    if(score < highscore):
        cursor.execute(f"INSERT INTO users (highscore) VALUES ({highscore})")

    # Average score berechnen
    score_list = cursor.execute(f"SELECT score FROM scores WHERE id = {id}")
    for i in score_list:
        print(i)


    cursor.execute(f"INSERT INTO scores (id, score) VALUES ({id}, {score})")
    

create_account("'Edlinger'", "'Genie'")
create_account("'Raphi'", "'Teufel'")

add_friendship(1, 2)
add_scores(1, -10)

# Test
execution = "SELECT * FROM users WHERE id = " + str(1)
cursor.execute(execution)
print(cursor.fetchall())

conn.close()

