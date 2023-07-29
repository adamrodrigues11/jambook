CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL
);

CREATE TABLE song (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    normalized_name text NOT NULL,
    arranger uuid REFERENCES "user"(id) ON DELETE SET NULL,
    chordmark text,
    date_modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (normalized_name, arranger)
);

CREATE TABLE group (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    normalized_name text UNIQUE NOT NULL,
);

CREATE TABLE user_group (
    user_id uuid REFERENCES user(id) ON DELETE CASCADE,
    group_id uuid REFERENCES group(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE setlist (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    normalized_name text NOT NULL,
    date_modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (normalized_name)
);

CREATE TABLE setlist_song (
    setlist_id uuid REFERENCES setlist(id) ON DELETE CASCADE,
    song_id uuid REFERENCES song(id) ON DELETE CASCADE,
    PRIMARY KEY (setlist_id, song_id)
);