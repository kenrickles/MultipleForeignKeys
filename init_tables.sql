CREATEDB museum 

CREATE TABLE artist (id SERIAL PRIMARY KEY, 
name TEXT);


CREATE TABLE collections (id SERIAL PRIMARY KEY, 
name TEXT);

CREATE TABLE paintings (id SERIAL PRIMARY KEY, 
name TEXT, 
artist_id INTEGER, 
collection_id INTEGER);

INSERT INTO artist (name) VALUES('Hans Hofmann');
INSERT INTO artist (name) VALUES('Anne Ryan');
INSERT INTO artist (name) VALUES('Georg Pauli');
INSERT INTO artist (name) VALUES('Alice Bailly');


INSERT INTO paintings (name, artist_id, collection_id) VALUES('Ecstasy',1, 1);
INSERT INTO paintings (name, artist_id, collection_id) VALUES('Number 547',2, 1);
INSERT INTO paintings (name, artist_id, collection_id) VALUES('Number 650',2, 1);
INSERT INTO paintings (name, artist_id, collection_id) VALUES('Number 660',2, 1);
INSERT INTO paintings (name, artist_id, collection_id) VALUES('Spetsknypplerskan',3, 2);
INSERT INTO paintings (name, artist_id, collection_id) VALUES('Archers',4, 2);

INSERT INTO collections (name) VALUES('New York School');
INSERT INTO collections (name) VALUES('Cubism');

// Artist Table:  id and name of artist 
// Paintings Table: name of painting, id of painting, artist_id and collection id
// Collection table: name of collection, collection id 


SELECT collections.name, collections.id, paintings.artist_id, paintings.collection_id
FROM collections
INNER JOIN paintings
ON collections.id = paintings.collection_id
WHERE collections.name = '${process.argv[3]}'

SELECT collections.name, collections.id, paintings.artist_id, paintings.collection_id
  FROM collections
  INNER JOIN paintings
  ON collections.id = paintings.collection_id
  WHERE collections.name = "New York School";

INSERT INTO paintings (name, artist_id, collection_id) VALUES ($1, $2, $3)