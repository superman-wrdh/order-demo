## docker启动mongodb
    docker-compose.yml
```yaml
version: '3.1'
services:
  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: myuser
      MONGO_INITDB_ROOT_PASSWORD: mypass
    ports:
      - "27017:27017"
    volumes:
      - my_mongo_data:/data/db

volumes:
  my_mongo_data:

```

## 创建数据库
```shell

use demo
db.createUser({
  user: 'demoUser',
  pwd: 'demoPass',
  roles: [{ role: 'readWrite', db: 'demo' }]
})
```

## 连接数据库
```
    mongodb://demoUser:demoPass@localhost:27017/demo
```

