BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS benchmarking_data;

CREATE TABLE benchmarking_data (
  id     VARCHAR,
  date   DATE,
  bin  SMALLINT,
  metric REAL
) WITH (fillfactor=100, autovacuum_enabled=false);

INSERT INTO benchmarking_data (id, date, bin, metric)
  SELECT
      id,
      date,
      bin,
      random() * 100  AS metric
    FROM (
      SELECT uuid_generate_v4() AS id
        FROM generate_series(1, 100) AS epochs(bin)
    ) AS ids(id)
      CROSS JOIN generate_series('20180101'::DATE, '20181231'::DATE, '1 day') AS dates(date)
      CROSS JOIN generate_series(0, 287) AS epochs(bin);


ALTER TABLE benchmarking_data
  ADD CONSTRAINT benchmarking_data_pkey PRIMARY KEY (id, date, bin) WITH (fillfactor=100);

CLUSTER benchmarking_data USING benchmarking_data_pkey;

COMMIT;

VACUUM ANALYZE benchmarking_data;
