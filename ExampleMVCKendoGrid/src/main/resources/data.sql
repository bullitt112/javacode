-- ssh root@162.209.51.12
use test;
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

select * from User;

--DROP TABLE IF EXISTS registration;
--CREATE TABLE registration (
--  id int(11) NOT NULL AUTO_INCREMENT,
--  firstName varchar(25) NOT NULL,
--  lastName varchar(25) DEFAULT NULL,
--  emailAddress varchar(60) DEFAULT NULL,
--  password varchar(60) DEFAULT NULL,
--  securityQuestion(120) DEFAULT NULL,
--  securityAnswer(120) DEFAULT NULL,
--  PRIMARY KEY (id)
--) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Tables
--use corylus;
--DROP TABLE IF EXISTS UserInfo;
--CREATE TABLE UserInfo (
--  id int(11) NOT NULL AUTO_INCREMENT,
--  uid varchar(09) NOT NULL,
--  logonId varchar(25) NOT NULL, 
--  firstName varchar(25) DEFAULT NULL,
--  middleName varchar(25) DEFAULT NULL,
--  lastName varchar(25) DEFAULT NULL,
--  displayName varchar(75) DEFAULT NULL,
--  officialEmailAddress varchar(60) DEFAULT NULL,
--  PRIMARY KEY (id)
--) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('111111111','TommyJohnson01','Tommy','Leet','Johnson','Tom Lee Johnson','tj@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('222222222','AaronJohann08','Aaron','Conley','Johann','Aaron Johann','aaron@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('333333333','ByronJohann07','Byron','Leet','Johnson','Tom Lee Johnson','byron@gamil.com');

--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('444444444','ChrisJohann21','Chris','James','Johann','Chris Johann','chris@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('555555555','MaryJohann23','Mary','Elizabeth','Johann','Mary Johann','mary@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('666666666','JimHacker73','Jim','Ed','Hacker','Jim Hacker','hack@gamil.com');
--
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('777777777','RickMayne11','Rick','Main','Mayne','Rick Mayne','main@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('888888888','KevinStutler49','Kevin','James','Stutler','Keving Stutler','ort@gamil.com');
--INSERT INTO UserInfo(uid,logonId,firstName,middleName,lastName,displayName,officialEmailAddress) VALUES('999999999','MikeReinhardt58','Mike','Todd','Reinhardt','Mike Reinhardt','todd@gamil.com');
--
--
--select * from UserInfo;
--
--DROP TABLE IF EXISTS UserInfoAdditional;
--CREATE TABLE UserInfoAdditional (
--  id int(11) NOT NULL AUTO_INCREMENT,
--  uid varchar(09) NOT NULL,
--  birthCity varchar(25) NOT NULL, 
--  state varchar(25) DEFAULT NULL,
--  school varchar(35) DEFAULT NULL,
--  additionalEmail varchar(25) DEFAULT NULL,
--  phone varchar(75) DEFAULT NULL,
--  fathersName varchar(60) DEFAULT NULL,
--  mothersName varchar(60) DEFAULT NULL,
--  PRIMARY KEY (id)
--) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('111111111','Greenup','Ky','Lewis County Schools','tommy@yahoo.com','6064737911','Logan','Verna');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('222222222','Columbus','Oh','Pickerington Local Schools','aaron@yahoo.com','6145551212','Steve','MaryBeth');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('333333333','Columbus','Oh','Pickerington Local Schools','byron@yahoo.com','6145551212','Steve','MaryBeth');
--
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('444444444','Columbus','Oh','Pickerington Local Schools','chris@yahoo.com','6145551212','Steve','MaryBeth');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('555555555','Columbus','Oh','Pickerington Local Schools','mary@yahoo.com','6145551212','Steve','MaryBeth');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('666666666','Ironton','Oh','Ironton St Joe','hack@yahoo.com','6145551212','Don','Mary Margret');
--
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('777777777','Ironton','Oh','Ironton City Schools','rick@yahoo.com','6145551212','Don','Nancy');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('888888888','Ironton','Oh','Ironton City Schools','kevin@yahoo.com','6145551212','Mr Stutler','Ma Stutler');
--INSERT INTO UserInfoAdditional (uid,birthCity,state,school,additionalEmail,phone,fathersName,mothersName) VALUES('999999999','Ironton','Oh','Ironton City Schools','mike@yahoo.com','6145551212','Dave','Susan');
--
--select * from UserInfoAdditional;
