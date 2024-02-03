CREATE TABLE provinces(
                          province_id numeric primary key ,
                          name varchar NOT NULL ,
                          type varchar
);

CREATE TABLE districts(
                          district_id numeric primary key ,
                          province_id numeric NOT NULL ,
                          name varchar NOT NULL ,
                          type varchar
);
ALTER TABLE districts ADD CONSTRAINT fkey_provinces
    FOREIGN KEY (province_id) REFERENCES provinces(province_id);


CREATE TABLE wards(
                      ward_id numeric primary key ,
                      district_id numeric NOT NULL,
                      name varchar NOT NULL,
                      type varchar
);
ALTER TABLE wards ADD CONSTRAINT fkey_wards
    FOREIGN KEY (district_id) REFERENCES districts(district_id) ;