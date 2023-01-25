import sqlite3
conn = sqlite3.connect("Backend/reaktdata.db")

with open("Backend/schema.sql") as f:
    conn.executescript(f.read())

cursor = conn.cursor()

def create_account(username, password):
    cursor.execute(f"INSERT INTO users (username, password) VALUES ( {username}, {password})")


def add_friendship(id1, id2):
    cursor.execute(f"INSERT INTO friends (friend1_id, friend2_id) VALUES ( {id1}, {id2})")


def add_scores(id, score):

    # score zu scores table adden
    cursor.execute(f"INSERT INTO scores (id, score) VALUES({id}, {score})")

    cursor.execute(f"SELECT highscore FROM users WHERE id = {id}")
    highscore = cursor.fetchall()[0][0]
    

    if(highscore == None or score < highscore):
        cursor.execute(f"UPDATE users SET highscore = {score} WHERE id = {id}")
        
    # Average score berechnen
    cursor.execute(f"SELECT score FROM scores WHERE id = {id}")
    score_list = [x[0] for x in cursor.fetchall()]
    print(score_list)

    # Summe der Liste / Länge der Liste ergibt den Durchschnitt 
    avg_score = sum(score_list) / len(score_list)
    cursor.execute(f"UPDATE users SET avgscore = {avg_score} WHERE id = {id}")
    


# Test
execution = "SELECT * FROM users"
cursor.execute(execution)

conn.close()

