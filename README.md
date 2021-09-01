# We post Api

## Description

Api for we post


#### Clone repo and run

```
yarn
```

Leave `.env` as it is or change with your own values. Database access is public in mongo atlas cloud
Then run :

```
yarn dev
```
## Docs
To see the api docs , after running the server go to [http://localhost:5001/docs](http://localhost:5001/docs) 


## Development tips

-   #### Always use the custom error handler to handle errors. For Example:

```Javascript
 throw new CustomError(404, 'hello');
```

or in a catch block:

```Javascript
catch (err) {
        next(err);
    }
```
