CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS files;
CREATE TABLE files(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);
CREATE INDEX storage_files_index ON files(id);


DROP TABLE IF EXISTS files_urls;
CREATE TABLE files_urls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_files UUID REFERENCES files(id),
    part INTEGER NOT NULL,
    url VARCHAR(255) NOT NULL
);
CREATE INDEX storage_files_urls_index ON files_urls(id, id_files, part);