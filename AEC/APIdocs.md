# Web app and python API connection docs

*`Web_URL -> PyAPI_URL`*

**Web:**

```javascript
{
    body: {
        '...': '...' //query
    },
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}
```

**Python:**

```javascript
{
    body: {
        '...': '...' //answer
    },
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}
```

## Registration 
### Stage 1
 `/registation` -> `/reg/1`

```javascript
query = [
    surname,
    name,
    patronymic, //fathername
    email,
    password
]

answer = [
    
]
```

### Stage 2
 `/registation/company` -> `/reg/2`

```javascript
query = [
    
]

answer = [
    
]
```

### Stage 3
 `/registation/aec` -> `/reg/3`

```javascript
query = [
    
]

answer = [
    
]
```

## Login