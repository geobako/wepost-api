# Pet app Api

## Description

Rest api for pet's mobile app

## Usage

### Download google keys.json for access to google cloud storage

Download and place in the root of project storage-key-dev.json for development and storage-key.json for production

#### Clone repo and run

```
npm install
```

Make a `.env` file according to `.example.env` and add your own variales if you like
Then run :

```
npm run dev
```

## Development tips

-   #### Do not forget to checkout to dev branch and create another branch base on dev before adding a new feature

```diff
- DO NOT MAKE CHANGES OR PUSH TO THE MASTER OR DEV BRANCH DIRECTLY
```

-   #### Always update `swagger.json` after making changes to any routes
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
