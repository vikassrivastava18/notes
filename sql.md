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



