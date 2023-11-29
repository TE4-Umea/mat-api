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
  method: "POST" || "GET" || "DELETE" || "PUT", // use the correct one of these, default is GET
  headers: {
    "jwt-token": localStorage.getItem("jwt-token"),
  },
  ...
})
```

Och utdatat ser ut så här:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzAxMDc0NDU3fQ.EhGsCJQY01751a08aVO_ZilF7EFfTCkIVEUbVilcSLU_test_inte_riktig_token",
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
Får ut en sida maträtter (20? st) av alla som finns i databasen. Page börja på 0, så `/api/dish` och `/api/dish?page=0` är samma sak. Page=1 är alltså sida 2.

Utdata: 
```json
[
  {
    "id": 7,
    "name": "Cheeseburgare",
    "img": "kottbullar_potatismos.jpg",
    "desc": "Koka potatis och gör mos. Stek köttbullarna. Servera.",
    "categoryOnDish": [
      {
        "category": {
          "id": 1,
          "name": "Kött"
        },
        "category": {
          "id": 2,
          "name": "vegetariskt"
        }
      }
    ]
  },
  {
    "id": 6,
    "name": "Hamburgare",
    "img": null,
    "desc": null,
    "categoryOnDish": {
      "category": {
        "id": 2,
        "name": "vegetariskt"
      }
    }
  },
  {
    "id": 3,
    "name": "Korv med potatismos",
    "img": "korv_potatismos.jpg",
    "desc": "Koka potatis och gör mos. Stek korven. Servera.",
    "categoryOnDish": null
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
  "categoryOnDish": {
      "category": {
        "id": 2,
        "name": "vegetariskt"
      }
    }
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
    "categoryOnDish": {
      "category": {
        "id": 2,
        "name": "vegetariskt"
      }
    }
  },
  {
      "id": 6,
      "name": "Hamburgare",
      "img": null,
      "desc": "stek hamburgare",
      "categoryOnDish": {
        "category": {
          "id": 2,
          "name": "vegetariskt"
        }
      }
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
    "type": "breakfast",
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
POST /api/meal
```
För att lägga till en måltid. Behöver data från body, specifikt `time`, `type` och den valda maträttens id (`dishId`). `type` ska vara en av `frukost`, `lunch` eller `middag` och `time` ska vara i formatet(?) `Date()`.
<!-- TODO: date? -->

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
      "categoryOnDish": ?
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
POST /api/saved
```
För att lägga till en sparad maträtt. Behöver data från body, specifikt bara `dishId`.

***

```
DELETE /api/saved/:id
```
För att ta bort en sparad maträtt. Behöver id från maträtten som ska tas bort.


### Category - kategorier
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
      "type": "field",
      "msg": "Invalid value",
      "path": "jwt-token",
      "location": "headers"
    }
  ]
}
```

<!-- TODO: error? -->