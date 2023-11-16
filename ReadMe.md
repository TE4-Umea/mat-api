# API för en matapp

## Styleguide
* Commonjs
* 2 mellanslags-indentering
* camelCase i kod
* snake_case i filnamn
* Semicolon efter varje rad
* Enkelfnuttar

Commit meddelanden ska börja med: feat, fix, docs, style, refactor.

## Exempel

### Dish - allmänna maträtter

```
GET /api/dish
```
Får ut alla maträtter som finns i databasen.

<!-- TODO: pagination? -->

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
  }
]
```

***

```
Get /api/dish/:id
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

```
DELETE /api/dish/:id
```
För att ta bort en maträtt. Behöver id från maträtten som ska tas bort.


### Meal - dina sparade måltider

```
GET /api/meal
```

Får ut alla sparade måltider i ordningen av senast datum.

<!-- TODO: få bara userns måltider  -->
<!-- TODO: pagination? -->

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

```
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

```
DELETE /api/meal/:id
```
För att ta bort en måltid. Behöver id från måltiden som ska tas bort.

### User - användare









```

```