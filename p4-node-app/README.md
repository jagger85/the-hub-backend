
#   P4-node-app

This is a backend application for a Financial Portfolio Management Platform. The platform allows users to manage their financial portfolios and track wallets.


## Environment Variables

To run this project, you will need to add the following environment variables

| Name | Description                       |
| :-------- | :-------------------------------- |
| `SERVER_PORT`      | Port on which server will run |
| `ATLAS_PASS`      | The Atlas password  |
| `TOKEN_SECRET`      | JSONWebToken secret |


## Dependencies

- Node
- Express
- Mongoose
- Body-parser
- Cors
- JSONWebtoken
- Morgan
- Helmet
- Bcrypt
## Installation

Install P4-node-app with npm

```bash
  npm install my-project
  cd my-project
```
    
## Project structure
```http
The folder structure of this app is explained bellow
```
| Name | Description                       |
| :-------- | :-------------------------------- |
| `Routes/`      | Contain all express routes |
| `Models`      | Models define schemas that will be used in storing and retrieving data from Application database |
| `Middlewares`      | Express middlewares which process the incoming requests before handling them down to the routes |
| `server.js`      | Entry point to express app |
| `package.json`      | Contains npm dependencies |

## API Reference


#### Get all user

```http
  GET /user/
```
Returns all users on the database

#### Get user

```http
  GET /user/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |

#### Get user portfolios

```http
  GET /user/portfolios/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |


#### Get user portfolio

```http
  GET /user/${username}/${portfolioName}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User username|
| `portfolioName`      | `string` | **Required**. User portfolio to fetch |


#### Get portfolio Wallets

```http
  GET /user/${username}/${portfolioName}/wallets
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User username |
| `portfolioName`      | `string` | **Required**. User portfolio to fetch |

#### Get portfolio Wallet

```http
  GET /user/${username}/${portfolioName}/${walletName}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User username|
| `portfolioName`      | `string` | **Required**. Desired portfolio |
| `walletName`      | `string` | **Required**. Portfolio wallet to fetch |

#### Create user

```http
  POST /register
```
Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username|
| `email`      | `string` | **Required**. User's email |
| `password`      | `string` | **Required**. User's password |

#### Add a user portfolio

```http
  POST /user/portfolios/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `alias`      | `string` | **Required**. Portfolio alias |

#### Add a wallet to a portfolio

```http
  POST /user/portfolios/wallets/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username|

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `alias`      | `string` | **Required**. Desired portfolio alias |
| `walletAlias`      | `string` | **Required**. Desired wallet alias |
| `walletAddress`      | `string` | **Required**. Desired wallet address |

#### Delete user

```http
  DELETE /user/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |


#### Delete a user portfolio

```http
  DELETE /user/portfolios/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `alias`      | `string` | **Required**. Desired portfolio alias |

#### Delete a portfolio wallet

```http
  DELETE /user/portfolios/wallets${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `alias`      | `string` | **Required**. Desired portfolio alias |
| `walletAlias`      | `string` | **Required**. Desired wallet alias |

#### Log user

```http
  Post /login
```
Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |
| `password`      | `string` | **Required**. User's password |

#### Set preferred portfolio

```http
  Post /settings/portfolio/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `preferredPortfolio` | `string` | **Required**. User's preferred portfolio alias |

#### Get preferred portfolio

```http
  Get /settings/portfolio/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

#### Set preferred currency

```http
  Post /settings/currency/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |

Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `preferredCurrency` | `string` | **Required**. User's preferred currency |


#### Get preferred currency

```http
  Gey /settings/currency/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. User's username |


## Authors

- [@Jagger85](https://gitlab.com/Jagger85e)

