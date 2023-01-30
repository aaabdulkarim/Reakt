import sqlite3, threading
conn = sqlite3.connect("Backend/reaktdata.db", check_same_thread=False)

with open("Backend/schema.sql") as f:
    conn.executescript(f.read())

cursor = conn.cursor()
lock = threading.Lock()

def create_account(username, password):
    try:
        lock.acquire(True)

        cursor.execute(f"INSERT INTO users (username, password) VALUES ( {username}, {password})")
    finally:
        lock.release()

def add_friendship(id1, id2):
    cursor.execute(f"INSERT INTO friends (friend1_id, friend2_id) VALUES ( {id1}, {id2})")


def add_scores(id, score):

    # score zu scores table adden
    cursor.execute(f"INSERT INTO scores (id, score) VALUES({id}, {score})")
    
    # Average score berechnen
    cursor.execute(f"SELECT score FROM scores WHERE id = {id}")
    score_list = [x[0] for x in cursor.fetchall()]

    # Summe der Liste / Länge der Liste ergibt den Durchschnitt 
    avg_score = sum(score_list) / len(score_list)
    cursor.execute(f"UPDATE users SET avgscore = {avg_score} WHERE id = {id}")

def get_friendships(id):
    cursor.execute(f"SELECT friend2_id FROM friends WHERE friend1_id = {id}")
    freunde_erste_gruppe = cursor.fetchall()
    cursor.execute(f"SELECT friend1_id FROM friends WHERE friend2_id = {id}")
    freunde_zweite_gruppe = cursor.fetchall()

    return freunde_erste_gruppe + freunde_zweite_gruppe

def get_scores(id):
    cursor.execute(f"SELECT score FROM scores WHERE id = {id} LIMIT 10")
    data = [int(x[0]) for x in cursor.fetchall()]
    print(data)
    return data

def check_account(username, password):
    cursor.execute(f"SELECT username, password FROM users WHERE username = {username} AND password = {password}")

    et = cursor.fetchall()
    print(et)
    # Wenn die Query ein erfolgreiches Ergebnis liefert ist das Array nicht leer(len != 0) sonst ist len = 0
    return len(et) > 0

def check_name(name):
    """
    Gibt True zurück wenn der Name schon existiert
    """
    cursor.execute(f"SELECT username FROM users WHERE username = {name}")
    return len(cursor.fetchall()) > 0

def get_id(name):
    cursor.execute(f"SELECT id FROM users WHERE username = {name}")
    return cursor.fetchall()

def get_userdata(id):
    cursor.execute(f"SELECT username, highscore, avgscore FROM users WHERE id = {id}")
    return cursor.fetchall()


create_account("'Edlinger'", "'Benjamin'")
create_account("'Andreder'", "'Eda'")
create_account("'Raphi'", "'Jason'")
create_account("'Max'", "'Mizrak'")

add_friendship(2, 3)
add_friendship(2, 1)
add_friendship(2, 4)
add_friendship(3, 1)

add_scores(1, 151)
add_scores(1, 100)
add_scores(1, 10)
add_scores(1, 90)

add_scores(1, 60)
add_scores(1, 70)
add_scores(1, 10)
add_scores(1, 40)

add_scores(1, 20)
add_scores(1, 40)

add_scores(2, 100)
add_scores(2, 200)
add_scores(2, 310)
add_scores(2, 290)


add_scores(2, 300)
add_scores(2, 240)
add_scores(2, 260)
add_scores(2, 190)


add_scores(2, 165)
add_scores(2, 270)
add_scores(2, 360)
add_scores(2, 210)
