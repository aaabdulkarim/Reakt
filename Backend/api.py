from flask import Flask
from flask_cors import CORS

import sql_reader
app = Flask(__name__)

cors = CORS(app)

# Add/get friends
@app.route("/friends/<int:id>", methods=["GET"])
def getfriendship(id):
    return str(sql_reader.get_friendships(id))

@app.route("/friends/<int:id>:<int:id2>", methods=["POST"])
def setfriendship(id, id2):
    sql_reader.add_friendship(id, id2)

# Add/get scores
@app.route("/scores/<int:id>", methods=["GET"])
def getscore(id):
    return str(sql_reader.get_scores(id))

@app.route("/scores/<int:id>", methods=["POST"])
def setscore(id):
    sql_reader.add_scores(id)

# create user/check if user exist
@app.route("/users/<string:username>:<string:password>", methods=["GET"])
def checkaccount(username, password):
    return str(sql_reader.check_account(username, password))

@app.route("/users/<string:username>:<string:password>", methods=["POST"])
def createaccount(username, password):
    sql_reader.create_account(username, password)


if __name__ == "__main__":
    app.run(port=5001, debug=False)