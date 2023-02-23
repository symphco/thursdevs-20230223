# thursdevs-20230223 [piano-city]

This is a sample app demonstrating methods on how to test frontend and backend projects.

## Setup

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

    // This should be a URL to an existing file. Upon running `piano-city-service`, we will have to create a folder
    // called `static` in the project root. There we can add image files which can be referenced under the `/static`
    // context path.
    "imageUrl": "http://localhost:8080/static/image.jpg"
  }

 // You may add as many items as you want using this format.
]
```

Install dependencies for both packages. Run the test scripts to see if everything is working.

## Challenge

There is a file called [`REQUIREMENTS.md`](./REQUIREMENTS.md) which lists user stories currently done for the project. Would you be able to
finish the project satisfying all of those requirements?

Clone this repository and get to work! :)
