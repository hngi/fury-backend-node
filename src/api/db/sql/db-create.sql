-- SQL DDL statements go here

-- This is an internal table for migration
CREATE TABLE IF NOT EXISTS public.DB_VERSION (
    VERSION numeric NOT NULL,
    ID smallint NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.DB_VERSION_ID_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.DB_VERSION ALTER COLUMN ID SET DEFAULT nextval('public.DB_VERSION_ID_seq'::regclass);

ALTER TABLE ONLY public.DB_VERSION
    DROP CONSTRAINT IF EXISTS DB_VERSION_pkey;

ALTER TABLE ONLY public.DB_VERSION
    ADD CONSTRAINT DB_VERSION_pkey PRIMARY KEY (ID);

CREATE TABLE IF NOT EXISTS departments (
     id bigserial NOT NULL PRIMARY KEY,
     name character varying,
     manager_id BIGINT,
     user_id BIGINT
);

CREATE TABLE employees IF NOT EXISTS (
       id bigserial NOT NULL PRIMARY KEY,
       first_name character varying,
       last_name character varying,
       phone_no character varying,
       email character varying,
       hire_date DATE,
       department_id BIGINT REFERENCES departments(id),
       address character varying,
       user_id BIGINT
);

CREATE TABLE migrations IF NOT EXISTS (
    id serial NOT NULL PRIMARY KEY,
    migration_filename character varying,
    db_version smallint
    date_created TIMESTAMP
)
