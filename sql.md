# Database concepts and implementation

## Starting PostgreSQL with command line  
```psql -U postgres```

** In case of failure **
This is due to peer authentication defined in the configuration
- Find the config file (pg_hba.conf): ```sudo find / -name pg_hba.conf```
- Edit the file ```sudo nano /etc/postgresql/<version>/main/pg_hba.conf```: peer -> md5
- Restart the postgres: ```sudo systemctl restart postgres(ql)```
- Set your password: ```sudo -u postgres psql```
- Alter password: ```ALTER USER postgres PASSWORD 'yourpassword';```

## Create a new user and database
```postgres=# CREATE USER new_user WITH PASSWORD 'secret_password';```

```postgres=# CREATE DATABASE "new_db" WITH OWNER 'new_user';```

Connect to a database with a user
```$psql new_db new_user```


## Create a table
```
CREATE TABLE user (
    id SERIAL,
    username VARCHAR(100) UNIQUE,
    age INTEGER, 
    address VARCHAR(4096),
    PRIMARY KEY(id)
)
```

## Insert into database
```
INSERT INTO "users" (username, age, address) VALUES ('vikas', 39, 'somewhere in the universe');
```

## Insert multiple values
```
INSERT INTO "album" ("title", "year")
   VALUES
     ('album 1', 2022),
     ('album 2', 2000);
  ```

## Update an entry
```
UPDATE "users"
SET "address"='Somewhere in the universe.'
WHERE id=1;
```

## Delete an entry
```
DELETE FROM "users"
WHERE id=1;
```

## Find all the databases in PostgreSQL
```
\l
``` 

## Check a table fileds
``` 
\d "artist"
```

## Show all tables in the database
```
\dt
```

## ERD
```
    +----------+         +-----------+         +------------+
    |  Author  |         | Publisher |         | Translator |
    +----------+         +-----------+         +------------+
      1-M \                    | 1-1                / 0-M
           \ wrote             | published         / translated
            \                  | 1-M              /
             \               +-+-+-+-+           /    
              +------------->|       |<----------+
                        1-M  | Book  | 1-M
                             |       |
                             +-+-+-+-+
                               | 1-1
                               | 
                               | has                        
                               | 0-M
                         +-----------+
                         |  Rating   |
                         +-----------+
```
- A book can have zero to many translators, while a translator must have one or many translations.
- An author has written one or many books and a book could be authored by one or many authors.
- A publisher has published one or many books, but a book must be pusblished by one and only one publisher.
-  A book can have zero or one ratings, while a rating must be for one and only one book.


## Schema (Sqlite synatax)
```
CREATE TABLE IF NOT EXISTS "authors" (
    "id" INTEGER,
    "name" TEXT,
    "country" TEXT,
    "birth" INTEGER,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "publishers" (
    "id" INTEGER,
    "publisher" TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "translators" (
    "id" INTEGER,
    "name" TEXT,
    PRIMARY KEY("id")
);


CREATE TABLE IF NOT EXISTS "books" (
    "id" INTEGER,
    "isbn" TEXT,
    "title" TEXT,
    "publisher_id" INTEGER,
    "format" TEXT,
    "pages" INTEGER,
    "published" TEXT,
    "year" INTEGER,
    PRIMARY KEY("id"),
    FOREIGN KEY("publisher_id") REFERENCES "publishers"("id")
);

CREATE TABLE IF NOT EXISTS "authored" (
    "author_id" INTEGER,
    "book_id" INTEGER,
    FOREIGN KEY("author_id") REFERENCES "authors"("id"),
    FOREIGN KEY("book_id") REFERENCES "books"("id")
);

CREATE TABLE IF NOT EXISTS "translated" (
    "translator_id" INTEGER,
    "book_id" INTEGER,
    FOREIGN KEY("translator_id") REFERENCES "translators"("id"),
    FOREIGN KEY("book_id") REFERENCES "books"("id")
);

CREATE TABLE IF NOT EXISTS "ratings" (
    "book_id" INTEGER,
    "rating" INTEGER,
    FOREIGN KEY("book_id") REFERENCES "books"("id")
);
```

## Queries
### Subquery
To find all the ratings for the book In Memory of Memory
```
SELECT "rating" FROM "ratings"
WHERE "book_id" = (
    SELECT "id" FROM "books"
    WHERE "title" = 'In Memory of Memory'
);
```

### In
To find the names of all books in the database written by Fernanda Melchor
```
SELECT "title" FROM "books"
WHERE "id" IN (
    SELECT "book_id" FROM "authored"
    WHERE "author_id" = (
        SELECT "id" FROM "authors"
        WHERE "name" = 'Fernanda Melchor'
    )
);
```

### Join
To find the booka and their corresponding ratings
```
SELECT "title", "year", "rating" FROM "books"
JOIN "ratings" ON "ratings"."book_id" = "books"."id" LIMIT 100;
```

### Natural Join
If two table share the same joining name. If in the above example, books primary key was "book_id"
```
SELECT "title", "year", "rating" FROM "books"
NATURAL JOIN "ratings" LIMIT 100;
```

## Sets
### Intersect
Find all the authors who are also translators
```
SELECT "name" FROM "authors"
INTERSECT
SELECT "name" FROM "translators";
```
### Union
Find all the authors and translators
```
SELECT "name" FROM "authors"
UNION
SELECT "name" FROM "translators";
```
Add "profession" column in result
```
SELECT "name", "author" AS "profession" FROM "authors"
UNION
SELECT "name", "translator" AS "profession" FROM "translators";
```

### Except
Author and Only an author
```
SELECT "name" FROM "authors"
EXCEPT 
SELECT "name" FROM "translators";
```

 find the books that Sophie Hughes and Margaret Jull Costa have translated together
 ```
 SELECT "title", "id" FROM "books"
 WHERE "id" IN (
    SELECT "book_id" FROM "translated"
    WHERE "translator_id" = (
        SELECT "id" FROM "translators"
        WHERE "name" = 'Sophie Hughes' 
    )
    INTERSECT
    SELECT "book_id" FROM "translated"
    WHERE "translator_id" = (
        SELECT "id" FROM "translators"
        WHERE "name" = 'Margaret Jull Costa' 
    )
 );
 ```

 ## Group
Select the book id's based on their avergae ratings
```
SELECT "book_id", ROUND(AVG("rating"), 2) AS "Average Rating"
FROM "ratings"
GROUP BY "book_id";
```
Select the book names and their average ratings
```
SELECT "title", "Average Rating"
FROM "books"
JOIN (
    SELECT "book_id", ROUND(AVG("rating"), 2) AS "Average Rating"
    FROM "ratings"
    GROUP BY "book_id"
) AS "book_ratings"
ON "book_ratings"."book_id" = "books"."id";
```

### Having
```
SELECT "book_id", ROUND(AVG("rating"), 2) AS "average rating"
FROM "ratings"
GROUP BY "book_id"
HAVING "average rating" > 4.0
ORDER BY "average rating" DESC;
```
With name
```
SELECT "title", "book_id", "Average Rating"
FROM "books"
JOIN (
    SELECT "book_id", ROUND(AVG("rating"), 2) AS "Average Rating"
    FROM "ratings"
    GROUP BY "book_id"
    HAVING "Average Rating" > 4.0
    ORDER BY "Average Rating" DESC
) AS "book_ratings"
ON "book_ratings"."book_id" = "books"."id";
```

### DISTINCT
```
SELECT DISTINCT "first_name", "last_name"
from "users";
```


## Alter schemas
```
people=# CREATE TABLE "fav" (
  "id" SERIAL,
  "oops" TEXT,
  "post_id" INTEGER REFERENCES "post"("id") ON DELETE CASCADE,
  PRIMARY KEY("id")
);
ALTER TABLE "fav" DROP COLUMN "oops";
ALTER TABLE "fav" ADD COLUMN "howmuch" INTEGER;

CREATE TABLE "post" (
  "id" SERIAL,
  "title" VARCHAR(128) UNIQUE NOT NULL,
  "content" VARCHAR(128), -- WILL extend with alter
  "account_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY("id")
);
ALTER TABLE "post" ALTER COLUMN "content" TYPE TEXT;
```
