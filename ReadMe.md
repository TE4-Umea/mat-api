# API för en matapp
API:et ligger uppe på [http://jupiter.umea-ntig.se:3008/](http://jupiter.umea-ntig.se:3008/). 

## JWT Token
När du loggar in skapas det en JWT token av din info som kommer tillbaka till dig i frontenden och som du ska spara i localstorage. Den tokenen ska skickas med i headern som en authorization på alla requests som görs till API:et. När du loggar ut ska du ta bort tokenen från localstorage.

## Exempel

### User - användare
<!--
loggar in i databasen med användare: te4-mat

Login från utsidan:
mysql -u te4-mat -h jupiter.umea-ntig.se -P 3308 -p 

https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-migrations-from-a-local-environment

Login: 

ssh hjalmar@jupiter.umea-ntig.se
lxc shell te4-
su node
cd ~
cd mat-api/

-->

```
POST /api/user/:email
```
Skapar användare eller loggar in användaren. Behöver email från frontend-login, typ `session.user.email`. Ger tillbaka en JWT-token som ska sparas i localstorage och användas genom att skicka den i `header` i calls till API:et. För att skicka med den behövs det headern `authorization` med "Bearer" och JWT-tokenen som värde. Det ser ut ungefär såhär:

```js
fetch("/api/...", {
  ...
  method: "POST" || "GET" || "DELETE" || "PUT", // use the correct one of these, default is GET
  headers: {
    authorization: 'Bearer ' + localStorage.getItem("jwt-token"),
                       // ^ OBS: mellanslag här
  },
  ...
})
```

Och utdatat ser ut så här:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdW5kbWFya2hqYWxtYXJAZ21haWwuY29tIiwiaWF0IjoxNzAyMzcxNDkzfQ.G4cX4P_KmIt8vKcvDM81VTjn26TPETZIIJ_NB2l32ps",
}
```

#### OBS: ALLA ANROP NEDAN MÅSTE HA DENNA HEADER MED!

***

För att logga ut användaren så räcker det att du tar bort JWT-tokenen från localstorage.

```js
localStorage.removeItem("jwt-token");
```

***

```
DELETE /api/user
```

Tar bort användaren från databasen. 

### Dish - allmänna maträtter

```
GET /api/dish || /api/dish?page=1
```
Får ut en sida maträtter (20? st) av alla som finns i databasen. Page börja på 0, så `/api/dish` och `/api/dish?page=0` är samma sak. Page=1 är alltså sida 2. Visar saved om användaren har sparat maträtten, annars är saved en tom array.

Utdata: 
```json
[
  {
    "id": 7,
    "name": "Cheeseburgare",
    "img": "kottbullar_potatismos.jpg",
    "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
    "categoryOnDish": [],
    "saved": [
      {
        "id": 1,
        "userId": 14,
        "dishId": 1
      }
    ]
  },
  {
    "id": 6,
    "name": "Hamburgare",
    "img": null,
    "desc": null,
    "categoryOnDish": [],
    "saved": []
  },
  {
    "id": 3,
    "name": "Korv med potatismos",
    "img": "korv_potatismos.jpg",
    "desc": "Koka potatis och gör mos. Stek korven. Servera.",
    "categoryOnDish": [],
    "saved": []
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
  "name": "Cheeseburgare",
  "img": "cheeseburgare.jpg",
  "desc": null,
  "categoryOnDish": [],
  "saved": [
    {
      "id": 1,
      "userId": 14,
      "dishId": 1
    }
  ]
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
    "name": "Cheeseburgare",
    "img": "cheeseburgare.jpg",
    "desc": null,
    "categoryOnDish": [],
    "saved": [
      {
        "id": 1,
        "userId": 14,
        "dishId": 1
      }
    ]
  },
  {
    "id": 6,
    "name": "Hamburgare",
    "img": null,
    "desc": "stek hamburgare",
    "categoryOnDish": [],
    "saved": [
      {
        "id": 1,
        "userId": 14,
        "dishId": 1
      }
    ]
  }
]
```

***

Du borde kunna använda bilder genom typ denna kod: 

```html
<img src={`http://${sida}/api/img/${img}`} />
```

***

```
POST /api/dish?name=
```
För att lägga till en maträtt. Behöver namn data från query. 

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
    "icon": "img.png",
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
    "icon": "img.png",
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
    "type": "middag",
    "icon": null,
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
Tar `name` och visar de senaste 10 måltiderna som innehåller det namnet. Bör användas för att visa måltider när användaren söker igenom sina uppättna måltider. 

```json
[
  {
    "id": 4,
    "time": "2023-11-14T11:44:54.789Z",
    "type": "lunch",
    "icon": "symbol.png",
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
    "icon": null,
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

Du borde kunna använda ikoner genom typ denna kod: 

```html
<img src={`http://${sida}/api/img/${icon}`} />
```

***

```
POST /api/meal?dishId=${dishId}&type=${type}&time=${time}
```
För att lägga till en måltid. Behöver data från query, specifikt `time`, `type` och den valda maträttens id (`dishId`). `type` ska vara en av `lunch` eller `middag` och `time` ska vara i formatet(?) `Date()`, alltså se ut på detta sätt `new Date("2023-12-06T16:11:52.942Z")`.
<!-- TODO: date? -->

Enklaste sättet att få ut datumet för morgondagen vad jag har hittat är såhär:
```js
new Date(new Date().setDate(new Date().getDate() + 1))
```

***

<!-- UPDATE? -->

```
DELETE /api/meal/:id
```
För att ta bort en måltid. Behöver id från måltiden som ska tas bort.


### Saved - sparade maträtter

```
GET /api/saved || /api/saved?page=1
```

Får ut en sida maträtter (20? st) av alla sparade. Page börja på 0, så `/api/saved` och `/api/saved?page=0` är samma sak. Page=1 är alltså sida 2.

```json
[
  {
    "id": 5,
    "userId": 1,
    "dishId": 1,
    "dish": {
      "id": 1,
      "name": "Köttbullar med potatismos",
      "img": "kottbullar_potatismos.jpg",
      "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
    }
  },
  {
    "id": 4,
    "userId": 1,
    "dishId": 5,
    "dish": {
      "id": 5,
      "name": "Köttbullar och makaroner",
      "img": "kottbullar_potatismos.jpg",
      "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
    }
  },
  {
    "id": 3,
    "userId": 1,
    "dishId": 3,
    "dish": {
      "id": 3,
      "name": "Korv med potatismos",
      "img": null,
      "desc": null,
    }
  }
]
```

***

```
GET /api/saved/search/:name
```
Tar `name` och visar de senaste 10 sparade maträtter som innehåller det namnet. Bör användas för att visa sparade maträtter när användaren söker igenom sina sparade maträtter. 

```json
{
  "id": 5,
  "userId": 1,
  "dishId": 1,
  "dish": {
    "id": 1,
    "name": "Köttbullar med potatismos",
    "img": "kottbullar_potatismos.jpg",
    "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
  }
}
```

***

```
POST /api/saved?dishId=3
```
För att lägga till en sparad maträtt. Behöver data från query, specifikt bara `dishId`.

***

```
DELETE /api/saved/:id
```
För att ta bort en sparad maträtt. Behöver id från maträtten som ska tas bort.


### Category - kategorier [COMING SOON]
<!-- TODO: fyll i exempel bättre? -->

```
GET /api/category
```
Får ut alla kategorier som finns i databasen.

```json
[
  {
    "id": 1,
    "name": "Kött"
  },
  {
    "id": 2,
    "name": "Fisk"
  },
  {
    "id": 3,
    "name": "Vegetariskt"
  },
  {
    "id": 4,
    "name": "Veganskt"
  }
]
```

***

```
GET /api/category/:id
```
Får ut en specifik kategori och dess maträtter.

```json
{
  "id": 1,
  "name": "Kött",
  "categoryOnDish": {
    "dish": {
      "id": 1,
      "name": "Köttbullar med potatismos",
      "img": "kottbullar_potatismos.jpg",
      "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
    },
  }
}
```

### Error - felmeddelanden
Felmeddelanden kommer ut i denna form: 

```json
{
  "errors": [
    {
      "type": "field",  // den här är oftast med
      "msg": "Invalid value", // den här är alltid med
      "path": "jwt-token", // ibland är path och location med, ibland inte
      "location": "headers"
    }
  ]
}
```

## Styleguide
* Commonjs
* 4 mellanslags-indentering
* camelCase i kod
* snake_case i filnamn
* Semicolon efter varje kod-rad
* Enkelfnuttar

Commit meddelanden ska börja med: feat, fix, docs, style, refactor.