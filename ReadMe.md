# API för en matapp



## Exempel

### Dish - allmänna maträtter

```
GET /api/dish
```

Utdata: 
```
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

```
{
  "id": 7,
  "name": "Cheeseburgare"
}
```

```
GET /api/dish/search/:name
```
Tar 'name' och visar alla maträtter som innehåller det namnet

Utdata för burgare
```
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
För att lägga till en maträtt

```
{
  "name": "Cheeseburgare"
}
```





```

```