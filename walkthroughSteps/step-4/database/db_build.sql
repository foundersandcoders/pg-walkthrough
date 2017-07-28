BEGIN;

DROP TABLE IF EXISTS superheroes cascade;

CREATE TABLE superheroes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  superPower TEXT NOT NULL,
  weight INTEGER,
  canFly BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO superheroes (name, superPower, weight) VALUES
  ('Wolverine', 'Regeneration', 300),
  ('Captain Marvel', 'Shoots concussive energy bursts from her hands', 165, true),
  ('Iron Man', 'None', 425, true);

COMMIT;
