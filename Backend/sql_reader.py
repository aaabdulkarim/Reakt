import sqlite3
conn = sqlite3.connect("Backend/reaktdata.db", check_same_thread=False)

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

    # Summe der Liste / Länge der Liste ergibt den Durchschnitt 
    avg_score = sum(score_list) / len(score_list)
    cursor.execute(f"UPDATE users SET avgscore = {avg_score} WHERE id = {id}")

def get_friendships(id):
    cursor.execute(f"SELECT friend2_id FROM friends WHERE friend1_id = {id}")
    return cursor.fetchall()[0]

def get_scores(id):
    cursor.execute(f"SELECT score FROM scores WHERE id = {id} LIMIT 10")
    return cursor.fetchall()

def check_account(username, password):
    cursor.execute(f"SELECT username, password FROM users WHERE username = {username} AND password = {password}")

    # Wenn die Query ein erfolgreiches Ergebnis liefert ist das Array nicht leer(len != 0) sonst ist len = 0
    return len(cursor.fetchall()) >= 0

create_account("'Edlinger'", "'Iwas'")
create_account("'Andreder'", "'Hallo'")
create_account("'Raphi'", "'Genius'")
create_account("'Max'", "'ROmA'")


add_scores(1, 100)
add_scores(1, 200)
add_scores(1, 10)
add_scores(1, 90)


add_scores(1, 100)
add_scores(1, 200)
add_scores(1, 10)
add_scores(1, 90)


add_scores(1, 100)
add_scores(1, 200)
add_scores(1, 10)
add_scores(1, 90)


add_scores(1, 100)
add_scores(1, 200)
add_scores(1, 10)
add_scores(1, 90)

