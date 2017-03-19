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
  'Regenerate damaged or destroyed areas of his cellular structure', 300);

INSERT INTO superheroes (name, superPower, weight, canFly) VALUES ('Captain Marvel',
  'Shoots concussive energy bursts from her hands', 165, true);

INSERT INTO superheroes (name, superPower, weight, canFly) VALUES ('Iron Man',
  'None', 425, true);

INSERT INTO superheroes (name, superPower, weight) VALUES ('Spider-Man',
  'Superhuman strength, 15 times more agile than a regular human', 167);

INSERT INTO superheroes (name, superPower, weight) VALUES ('She-Hulk',
  'Great strength, endurance and a healing factor', 140);

COMMIT;
