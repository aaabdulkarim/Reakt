from flask import Flask
import sql_reader

app = Flask(__name__)

@app.route("/users/<string:user>")
def index(user):
    sql_reader.create_account("")
    return "Welcome " + user

@app.route("/friends/<int:id>")
def name(id):
    return "Your ID is" + str(id)


if __name__ == "__main__":
    app.run(port=5001, debug=False)