# API för en matapp

## Styleguide
* Commonjs
* 4 mellanslags-indentering
* camelCase i kod
* snake_case i filnamn
* Semicolon efter varje kod-rad
* Enkelfnuttar

Commit meddelanden ska börja med: feat, fix, docs, style, refactor.

## JWT Token
När du loggar in skapas det en JWT token av din info som kommer tillbaka till dig i frontenden och som du ska spara i localstorage. Den tokenen ska skickas med i headern på alla requests som görs till API:et. När du loggar ut ska du ta bort tokenen från localstorage.

## Exempel

### User - användare

```
POST /api/user/:email
```
Skapar användare eller loggar in användaren. Behöver email från frontend-login, typ `session.user.email`. Ger tillbaka en JWT-token som ska sparas i localstorage och användas genom att skicka den som `header` i calls till API:et. För att skicka med den behövs det headern `jwt-token` med JWT-tokenen som värde. Det ser ut ungefär såhär:

```js
fetch("/api/...", {
  ...
  method: "POST" || "GET" || "DELETE" || "PUT", // use the correct one of these
  headers: {
    "jwt-token": localStorage.getItem("jwt-token"),
  },
  ...
})
```

#### OBS: ALLA ANROP NEDAN MÅSTE HA DENNA HEADER MED!

***

```
DELETE /api/user
```

Tar bort användaren från databasen. 

### Dish - allmänna maträtter
<!-- 
Varje fetch/post meals ska ha headern 'jwt-token' med innehållet JWT och få ut måltider för den användarens id.
Inte relevant för dishes för det mesta?

Works ish?
fetch("/api/user", {
      method: "POST",
      headers: {
        "jwt-token": token,
      },
      body: JSON.stringify({ username, password }),
    })
-->

```
GET /api/dish || /api/dish?page=1
```
Får ut en sida maträtter (20? st) av alla som finns i databasen. Page börja på 0, så `/api/dish` och `/api/dish?page=0` är samma sak. Page=1 är alltså sida 2.

Utdata: 
```json
[
  {
    "id": 7,
    "name": "Cheeseburgare"
  },
  {
    "id": 6,
    "name": "Hamburgare"
  },
  {
    "id": 3,
    "name": "Korv med potatismos"
  },
  ...
]
```

***

```
GET /api/dish/:id
```
För att få ut en specifik maträtt.

```json
{
  "id": 7,
  "name": "Cheeseburgare"
}
```

***

```
GET /api/dish/search/:name
```
Tar 'name' och visar upp till 10 maträtter som innehåller det namnet. Bör användas för att visa maträtter när användaren ska lägga till ny måltid.

Utdata för '/api/dish/search/burgare'
```json
[
  {
    "id": 7,
    "name": "Cheeseburgare"
  },
  {
      "id": 6,
      "name": "Hamburgare"
  }
]
```

***

```
POST /api/dish
```
För att lägga till en maträtt. Behöver data från body, specifikt bara namnet. 

***

<!-- TODO: Jag vet inte om jag vill att användare ska kunna to bort dishes hur som helst
```
DELETE /api/dish/:id
```
För att ta bort en maträtt. Behöver id från maträtten som ska tas bort.
-->

### Meal - dina sparade måltider

```
GET /api/meal || /api/meal?page=1
```

Får ut en sida maträtter (20? st) av alla sparade, i ordningen av senast datum. Page börja på 0, så `/api/meal` och `/api/meal?page=0` är samma sak. Page=1 är alltså sida 2. `time` bör användas för att visa bara datumet för måltiden, vilket tid det är är inte viktigt.

<!-- TODO: få bara användarens måltider  -->

```json
[
  {
    "id": 5,
    "time": "2023-11-14T11:56:24.198Z",
    "type": "lunch",
    "userId": 2,
    "dishId": 1,
    "dish": {
      "id": 1,
      "name": "Köttbullar med potatismos"
    }
  },
  {
    "id": 4,
    "time": "2023-11-14T11:44:54.789Z",
    "type": "lunch",
    "userId": 1,
    "dishId": 5,
    "dish": {
      "id": 5,
      "name": "Köttbullar och makaroner"
    }
  },
  {
    "id": 3,
    "time": "2023-11-14T11:44:22.356Z",
    "type": "breakfast",
    "userId": 1,
    "dishId": 3,
    "dish": {
      "id": 3,
      "name": "Korv med potatismos"
    }
  }
]
```

***

```
GET /api/meal/search/:name
```
Tar 'name' och visar de senaste 10 måltiderna som innehåller det namnet. Bör användas för att visa måltider när användaren söker igenom sina uppättna måltider. 

```json
[
  {
    "id": 4,
    "time": "2023-11-14T11:44:54.789Z",
    "type": "lunch",
    "userId": 1,
    "dishId": 5,
    "dish": {
      "id": 5,
      "name": "Köttbullar och makaroner"
    }
  },
  {
    "id": 1,
    "time": "2023-11-14T11:43:00.092Z",
    "type": "middag",
    "userId": 1,
    "dishId": 1,
    "dish": {
      "id": 1,
      "name": "Köttbullar med potatismos"
    }
  }
]
```

*** 

```
POST /api/meal
```
För att lägga till en måltid. Behöver data från body, specifikt tid, typ och den valda maträttens id.

***

<!-- UPDATE? -->

```
DELETE /api/meal/:id
```
För att ta bort en måltid. Behöver id från måltiden som ska tas bort.

