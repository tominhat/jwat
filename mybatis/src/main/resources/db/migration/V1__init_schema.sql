-- usr definition
-- DROP TABLE usr;
CREATE TABLE usr (
                     usr_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                     usr_nm VARCHAR(50) NOT NULL,
                     usr_email VARCHAR(50) UNIQUE,
                     usr_status VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
                     del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);
