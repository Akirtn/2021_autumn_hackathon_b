## 動かし方(Mac)

### 初回設定
```
$ python3 -m venv env
$ source env/bin/activate
$ pip3 install  -r requirements.txt
$ flask db init 
```

db.sqliteファイルが存在しない時

```
# activateしていなければ
$ source env/bin/activate

$ python
>> from backend import db, create_app
>> db.create_all(app=create_app())
```

### サーバ起動
```
$ source env/bin/activate
$ export FLASK_APP=backend
$ export FLASK_DEBUG=1
$ flask run
```
http://localhost:5000/<hoge>にアクセスする