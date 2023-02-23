# thursdevs-20230223 [piano-city]

This is a sample app demonstrating methods on how to test frontend and backend projects.

## Setup

> **Note:** The instructions assume we have set the project variables to their defaults:
> 
> ```
> piano-city-service base URL: http://localhost:8080
> ```

In `piano-city-service`, create a directory called `.database`, then create a `piano.$NODE_ENV.json` file with the
following contents (substitute `$NODE_ENV` with your current `NODE_ENV` value, e.g. `development`):

```json5
[
  {
    "id": "1",
    "model": "Model B",
    "brand": "Steinway & Sons",
    "price": "1000000.00",
    "year": "1956",
    "imageUrl": "http://localhost:8080/static/image.jpg"
  }

 // You may add as many items as you want using this format.
]
```

The `imageUrl` values are retrieved from the `static` directory on the package root. The files here are accessible
through the `/static` context path

Install dependencies for both packages. Run the test scripts to see if everything is working.

## Challenge

There is a file called [`REQUIREMENTS.md`](./REQUIREMENTS.md) which lists user stories currently done for the project. Would you be able to
finish the project satisfying all of those requirements?

Clone this repository and get to work! :)
