## Installation:

```bash
npm install
```

## Launch server:
```bash
npm run start:dev
```

## Links:

###### Login:
Write this command on bash, answer should be json

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"test", "passwd":"test"}'
```



###### API:
[user list DB](http://localhost:3000/api/users)
[game list DB](http://localhost:3000/api/games)
[components list DB](http://localhost:3000/api/components)