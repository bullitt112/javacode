-- Tables
use alan;
DROP TABLE IF EXISTS Dog;
CREATE TABLE Dog (
  id int(11) NOT NULL AUTO_INCREMENT,
  breed varchar(25) NOT NULL,
  color varchar(25) NOT NULL, 
  gender varchar(25) DEFAULT NULL,
  age int DEFAULT NULL,  
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO Dog(breed,color,gender,age) VALUES('Collie','White','Male',2);
INSERT INTO Dog(breed,color,gender,age) VALUES('German Shepard','Black','Female',10);
INSERT INTO Dog(breed,color,gender,age) VALUES('Poodle','Green','Male',4);
