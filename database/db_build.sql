BEGIN;

DROP TABLE IF EXISTS superheroes cascade;

CREATE TABLE superheroes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  superPower TEXT NOT NULL,
  weight INTEGER,
  canFly BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO superheroes (name, superPower, weight) VALUES ('Wolverine',
  'Regenerate damaged or destroyed areas of his cellular structure',
  300);

COMMIT;
