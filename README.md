# WHISPERER

GraphQL API powering the Whisperer application where you can share your thoughts anonymously.

-----------------------------------

> It's powered by:
>
>**apollo-server** is the core library for Apollo Server itself, which helps you define the shape of your data and how to fetch it.
>
> **graphql** is the library used to build a GraphQL schema and execute queries against it.

-----------------------------------

The schema for the whisperer-API can be found [here](https://github.com/BolajiOlajide/whisperer-api/blob/master/schema/index.js). There are a number of queries and mutations contained in that file and that is what makes us up the Whisperer-API. There is work ongoing to add subscriptions to the API.

## Queries

The following are the queries available on the whisperer API.

* Fetch all users - this is used to fetch all users registered on the Whisperer-API.
This endpoint will only be visible to a hard-coded admin. You also require a JWT to access this resource.

Example:

```graphql
query {
  users {
    id
    name
    surname
    email
    username
  }
}
```

* Profile: To view the profile of the currently logged in user.

```graphql
query {
  profile {
    id
    name
    email
    username
    whispers {
      id
      text
    }
  }
}
```

* Whispers: Fetch whispers on the platform. I'm working on adding pagination to this resource.

```graphql
query {
  whispers {
    id
    text
    whisperer {
      id
      username
    }
  }
}
```

## Mutation

The following are the queries available on the whisperer API.

* CreateUser: equivalent of the `/signup` endpoint on a traditional REST API.

```graphql
mutation {
  createUser(
    payload: {
      name: "Bolaji"
      email: "bolaji@proton.me"
      password: "password123"
      confirmPassword: "password123"
    }
  ) {
    token
    user {
      id
      username
      email
      name
    }
  }
}
```

* Signin: equivalent of the `/signin` endpoint on a traditional REST API.

```graphql
mutation {
  signin(
    payload: {
      email: "bolaji@proton.me"
      password: "password123"
    }
  ) {
    token
    user {
      id
      username
      email
      name
    }
  }
}
```

* CreateWhisper: this is used for creating whispers

```graphql
mutation {
  createWhsiper(
    payload: {
      text: "I am bored"
    }
  ) {
    id
    text
    whisperer {
      id
      username
    }
  }
}
```
Hello World
