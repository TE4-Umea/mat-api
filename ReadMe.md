# API för en matapp

## Styleguide
* Commonjs
* 2 space indentation
* camelCase
* Semicolon
* Single quotes

Commit messages to start with: feat, fix, docs, style, refactor.

## Exempel

### Dish - allmänna maträtter

```
GET /api/dish
```
Får ut alla maträtter som finns i databasen

pagination?

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

```
Get /api/dish/:id
```
För att få ut en specifik maträtt

```json
{
  "id": 7,
  "name": "Cheeseburgare"
}
```

```
GET /api/dish/search/:name
```
Tar 'name' och visar alla maträtter som innehåller det namnet

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

```
POST /api/dish
```
För att lägga till en maträtt. Behöver data från body, specifikt bara namnet. 


```
DELETE /api/dish/:id
```
För att ta bort en maträtt. Behöver id från maträtten som ska tas bort.


### Meal - dina sparade måltider




```

```