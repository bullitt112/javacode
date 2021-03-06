#ssh root@162.209.51.12
use alan;
DROP TABLE IF EXISTS PeakCustomerInfo; 
create table PeakCustomerInfo (
id Integer AUTO_INCREMENT,
owner varchar(50),
state varchar(02),
address varChar(60),
county varChar(50),
contactName varChar(60),
electricSupplier varChar(80),
electricyRate varChar(10),
electricityContractExpiration varChar(20),
naturalGasSupplier varChar(80),
naturalGasRate varChar(10), 
naturalGasContractExpiration varChar(10),
primary key (id));

-- Data
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('TS Tech USA','OH','8400 E Broad St','Franklin','Bob Brindle','AEP Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('IBM Corporation','NY','100 E Main St','Lawrence','Todd Reinhardt','IBM Energy','0.052','7/31/18', 'IBM Energy', '3.25', '10/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('UCLA','CA','Charles E Young Drive','Franklin','Charles Young','UCLA Energy','0.090','9/31/18', 'UCLA Energy', '3.25', '10/30/18');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Apple Corporation','CA','Apple Way St','Diego','Steve Jobs','Apple Energy','0.052','7/31/18', 'Apple Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Boeing Corporation','KY','8400 Main St','Greenup','Rita Johnson','Boeing Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Tesla','CA','1 E Happy St','Angels','Elon Musk','Tesla Energy','0.052','7/31/18', 'Tesla Energy', '3.25', '4/30/16');

INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Hacker, Inc.','OH','8400 E Broad St','Franklin','Bob Brindle','AEP Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('NFL','NY','100 E Main St','Lawrence','Todd Reinhardt','IBM Energy','0.052','7/31/18', 'IBM Energy', '3.25', '10/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('USC','CA','Charles E Young Drive','Franklin','Charles Young','UCLA Energy','0.090','9/31/18', 'UCLA Energy', '3.25', '10/30/18');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Honeywell','CA','Apple Way St','Diego','Steve Jobs','Apple Energy','0.052','7/31/18', 'Apple Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Samsung Corporation','KY','8400 Main St','Greenup','Rita Johnson','Boeing Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('The GAP','CA','1 E Happy St','Angels','Elon Musk','Tesla Energy','0.052','7/31/18', 'Tesla Energy', '3.25', '4/30/16');

INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('LA Dodgers','OH','8400 E Broad St','Franklin','Bob Brindle','AEP Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Clippers','NY','100 E Main St','Lawrence','Todd Reinhardt','IBM Energy','0.052','7/31/18', 'IBM Energy', '3.25', '10/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('NHL Hockey','CA','Charles E Young Drive','Franklin','Charles Young','UCLA Energy','0.090','9/31/18', 'UCLA Energy', '3.25', '10/30/18');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Limited','CA','Apple Way St','Diego','Steve Jobs','Apple Energy','0.052','7/31/18', 'Apple Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Cincinnati Manufacturing','KY','8400 Main St','Greenup','Rita Johnson','Boeing Energy','0.052','7/31/18', 'IGS Energy', '3.25', '4/30/16');
INSERT INTO PeakCustomerInfo (owner,state,address,county,contactName,electricSupplier,electricyRate,electricityContractExpiration,naturalGasSupplier,naturalGasRate, naturalGasContractExpiration) VALUES ('Limited Too','CA','1 E Happy St','Angels','Elon Musk','Tesla Energy','0.052','7/31/18', 'Tesla Energy', '3.25', '4/30/16');