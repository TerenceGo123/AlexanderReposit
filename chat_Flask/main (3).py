from flask import Flask, Response , request, render_template 
from flask_cors import CORS
import json
import uuid
from uuid import uuid4
import time

app = Flask(__name__,static_url_path='/static')

CORS(app)

# /method?argumen1=value1&argumen2=value2

msg = []
dicted = {}
token_s = {}

@app.route("/")
def main():
    return render_template('index.html')




@app.route('/auth')
def auth():
    username = request.args.get('name')
    token = uuid.uuid4()
    if username in dicted:
        return Response('Такое имя уже есть, попробуте другое', status=404)
    if username == "":
        return Response('Имя введи я сказал', status=404)
    else:
        dicted[username] = str(token) 
        return Response('Регистрация прошла успешно', status=200)




@app.route("/logout")
def logout():
    token = request.args.get('token')
    for key, value in dicted.items():
        if value == token:
            del dicted[key]
            return Response('Вы вышли из аккаунта', status=200)
    return Response('Ошибка', status=404)


@app.route("/msg")
def msg():
    return str(msg)

@app.route("/listU")
def list():
    return dicted

@app.route("/send")
def send():
    timestamp = time.time()
    text = request.args.get('text')
    token = request.args.get('token')
    for key, value in dicted.items():  #key = username
        if text == None:
            return Response('Ошибка', status=404)
        elif key == None:
            return Response('Ошибка', status=404)
        elif value == token:
            msg.append({'name': key, 'text': text, 'timestamp': timestamp})
            return Response('Сообщение отправленно', status=200)

        

@app.route("/getall")
def getall():
    if request.args.get('token') not in dicted.values():
        return Response('Токен не найден', status= 403, mimetype='text/plain')
    return Response(json.dumps(msg), status=200)



if __name__ == "__main__":
    print('RABOTAET')
    app.run(debug=True)



app.route("/")
def main():
    return render_template('index')



