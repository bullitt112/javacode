-- Tables
USE alan;
DROP TABLE IF EXISTS User; 
create table User (id Integer AUTO_INCREMENT,firstName varchar(25),lastName varchar(25),
emailAddress varChar(60),confirmEmailAddress varChar(60),
password varChar(10),confirmPassword varChar(10),securityQuestion varChar(100),securityAnswer varChar(50),
securityUUID varChar(80),registrationStatus varChar(10), registrationConfirmed varChar(10),primary key (id));
-- Data
INSERT INTO User (firstName,lastName,emailAddress,confirmEmailAddress,password,confirmPassword,securityQuestion,securityAnswer, securityUUID, registrationStatus, registrationConfirmed) VALUES('Tommy','Johnson','tj@gamil.com','tj@gamil.com','Johnson','Johnson','What city were you born in?','Honolulu', '1234567890123456789', 'pending', 'confirmed');
INSERT INTO User (firstName,lastName,emailAddress,confirmEmailAddress,password,confirmPassword,securityQuestion,securityAnswer, securityUUID, registrationStatus, registrationConfirmed) VALUES('Mahesh','Regenemsy','mr@gamil.com','mr@gamil.com','Mahesh','Mahesh','What school did you attend for sixth grade','Lawrence Street', '1234567890123456789', 'pending', 'confirmed');
INSERT INTO User (firstName,lastName,emailAddress,confirmEmailAddress,password,confirmPassword,securityQuestion,securityAnswer, securityUUID, registrationStatus, registrationConfirmed) VALUES('Bob','Moore','bm@yahoo.com','bm@yahoo.com','Moore','Moore','Where were you when you had your first kiss?','Front Porch', '1234567890123456789', 'pending', 'confirmed');
INSERT INTO User (firstName,lastName,emailAddress,confirmEmailAddress,password,confirmPassword,securityQuestion,securityAnswer, securityUUID, registrationStatus, registrationConfirmed) VALUES('Jim','Hacker','jh@yahoo.com','jh@yahoo.com','Hacker','Hacker','Who was your childhood hero?','Jim Hacker', '1234567890123456789', 'pending', 'confirmed');