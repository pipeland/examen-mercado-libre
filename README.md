# examen-mercado-libre
## Contenido
- [Desafio]()
- [Instalacion]()
- [Unit test]()
- [Iniciar Microservicio]()
- [Desarrollo]()

## Desafio
### Nivel 1:
Programa (en cualquier lenguaje de programación) que cumpla con el método pedido por
Magneto.
### Nivel 2:
Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine,
Amazon AWS, etc), crear el servicio “/mutant/” en donde se pueda detectar si un humano es
mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el
siguiente formato:
```
POST → /mutant/
{
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```
En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un
403-Forbidden
### Nivel 3:
Anexar una base de datos, la cual guarde los ADN’s verificados con la API.
Solo 1 registro por ADN.
Exponer un servicio extra `“/stats”` que devuelva un Json con las estadísticas de las
verificaciones de ADN: `{“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}`
Tener en cuenta que la API puede recibir fluctuaciones agresivas de tráfico (Entre 100 y 1
millón de peticiones por segundo).
Test-Automáticos, Code coverage > 80%.

## Instalacion
* Tener instalado `node 12` y `docker`
* Instalar dependencias node
``` swift
npm install
```
## Unit test
### Test
``` swift
npm run test
```
### Coverage
``` swift
npm run coverage
```
## Eslint
Verficar reglas de estructura de código
``` swift
npm run lint
```
### Iniciar Microservicio
``` swift
docker-compose up -d
npm run local
```
## Desarrollo
### Nivel 1:
El programa esta desarrollado en `node (version 12)` exponiendo los servicios con `express` y usando arquitectura `serverless` para soportar la 
carga de peticiones.
### Nivel 2:
El API esta hosteada en `aws` usando `api gateway` y `lambda`, se está usando una base de datos no sql `Mongo`, instalada en `Mongo Atlas` 
#### Local:
Endpoint:
``` swift
http://localhost:3000/xmen/api/v1/mutant POST
```
Body:
``` swift
{
       "dna": [
              "ATGCGA",
              "CCGTGA",
              "TTATAT",
              "AGGAGG",
              "CCTCTA",
              "TCACTG"
       ]
}
```
#### Api Hosteada:
Endpoint:
``` swift
 POST
```
Body:
``` swift
{
       "dna": [
              "ATGCGA",
              "CCGTGA",
              "TTATAT",
              "AGGAGG",
              "CCTCTA",
              "TCACTG"
       ]
}
```
### Nivel 3:
Endpoint:
``` swift
http://localhost:3000/xmen/api/v1/stats GET
```
Response:
``` swift
{
    "count_mutant_dna": 1,
    "count_human_dna": 1,
    "ratio": "1.00"
}
```
#### Api Hosteada:
Endpoint:
``` swift
 GET
```
Response:
``` swift
{
    "count_mutant_dna": 1,
    "count_human_dna": 1,
    "ratio": "1.00"
}
```
#### Coverage:
```
-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |     100 |      100 |     100 |     100 |
 app/error-validator           |     100 |      100 |     100 |     100 |
  error-handler.js             |     100 |      100 |     100 |     100 |
 app/init                      |     100 |      100 |     100 |     100 |
  app.js                       |     100 |      100 |     100 |     100 |
  db.js                        |     100 |      100 |     100 |     100 |
 app/modules/mutant/controller |     100 |      100 |     100 |     100 |
  mutantController.js          |     100 |      100 |     100 |     100 |
 app/modules/mutant/model      |     100 |      100 |     100 |     100 |
  mutant.js                    |     100 |      100 |     100 |     100 |
 app/modules/mutant/routes     |     100 |      100 |     100 |     100 |
  routes.js                    |     100 |      100 |     100 |     100 |
 app/modules/mutant/service    |     100 |      100 |     100 |     100 |
  Dna.js                       |     100 |      100 |     100 |     100 |
  mutantService.js             |     100 |      100 |     100 |     100 |
 app/modules/stats/controler   |     100 |      100 |     100 |     100 |
  statsController.js           |     100 |      100 |     100 |     100 |
 app/modules/stats/routes      |     100 |      100 |     100 |     100 |
  routes.js                    |     100 |      100 |     100 |     100 |
 app/modules/stats/service     |     100 |      100 |     100 |     100 |
  statsService.js              |     100 |      100 |     100 |     100 |
 config                        |     100 |      100 |     100 |     100 |
  config.js                    |     100 |      100 |     100 |     100 |
-------------------------------|---------|----------|---------|---------|-------------------
```
