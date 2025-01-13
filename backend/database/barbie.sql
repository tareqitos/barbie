-- instructions:
-- connect to psql (obvious)
-- CREATE DATABASE BARBIE; (or whatever name)
-- CHECK THE DATABASE LIST: \l

-- FIRST DROP TABLE WITH FOREIGN KEYS
DROP TABLE IF EXISTS TUSE_SET;
DROP TABLE IF EXISTS TSET_COMP;
DROP TABLE IF EXISTS TUSE_GAM;
DROP TABLE IF EXISTS TCOMPONENTS;
DROP TABLE IF EXISTS TCOMMENTS;
DROP TABLE IF EXISTS TUSERS;

-- SECOND: DROP TABLE WITHOUT FOREIGN KEYS
DROP TABLE IF EXISTS TROLES;
DROP TABLE IF EXISTS TSETUPS;
DROP TABLE IF EXISTS TPICTURES;
DROP TABLE IF EXISTS TGAMES;
DROP TABLE IF EXISTS TTYPES;

-- THIRD: CREATE ALL TABLES

-- TABLE TROLES: USER, ADMIN, SUPERADMIN
CREATE TABLE IF NOT EXISTS TROLES (
    ID_ROL INT GENERATED ALWAYS AS IDENTITY,
    NAME_ROL VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY(ID_ROL)
);

-- TABLE TSETUP: NAME OF THE SETUP'S LIST
CREATE TABLE IF NOT EXISTS TSETUPS (
    ID_SET INT GENERATED ALWAYS AS IDENTITY,
    NAME_SET VARCHAR(50) NOT NULL,
    PRIMARY KEY(ID_SET)
);

-- TABLE TPICTURES: PROFILE PICTURE USER CAN CHOOSE
CREATE TABLE IF NOT EXISTS TPICTURES (
    ID_PIC INT GENERATED ALWAYS AS IDENTITY,
    NAME_PIC VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY(ID_PIC)
);

-- TABLE TGAMES: GAME'S LIST AVAILABLE
CREATE TABLE IF NOT EXISTS TGAMES (
    ID_GAM INT GENERATED ALWAYS AS IDENTITY,
    NAME_GAM VARCHAR(50) UNIQUE NOT NULL,
    PIC_GAM VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID_GAM)
);

-- TABLE TTYPES: TYPE OF THE COMPONENTS: CPU, GPU, HDD, ETC..
CREATE TABLE IF NOT EXISTS TTYPES (
    ID_TYP INT GENERATED ALWAYS AS IDENTITY,
    NAME_TYP VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY(ID_TYP)
);

-- TABLE TUSERS 
CREATE TABLE IF NOT EXISTS TUSERS (
    ID_USE INT GENERATED ALWAYS AS IDENTITY,
    EMAIL_USE VARCHAR(50) UNIQUE NOT NULL,
    USERNAME_USE VARCHAR(50) UNIQUE NOT NULL,
    PASSWD_USE VARCHAR(50) NOT NULL,
    FKPICTURES_USE INT NOT NULL,
    FKROLES_USE INT NOT NULL,
    PRIMARY KEY(ID_USE),
    CONSTRAINT FKPICTURES_USE FOREIGN KEY(FKPICTURES_USE) REFERENCES TPICTURES(ID_PIC) ON DELETE SET NULL,
    CONSTRAINT FKROLES_USE FOREIGN KEY(FKROLES_USE) REFERENCES TROLES(ID_ROL) ON DELETE SET NULL
);

-- TABLE TCOMPONENTS: USER COMPONENT'S LIST
CREATE TABLE IF NOT EXISTS TCOMPONENTS (
    ID_COMP INT GENERATED ALWAYS AS IDENTITY,
    SERIAL_COMP VARCHAR(50) UNIQUE NOT NULL,
    FKTYPES_COMP INT NOT NULL,
    PRIMARY KEY(ID_COMP),
    CONSTRAINT FKTYPES_COMP FOREIGN KEY(FKTYPES_COMP) REFERENCES TTYPES(ID_TYP) ON DELETE SET NULL
);

-- TABLE TCOMMENTS: USER COMMENTS ABOUT A SPECIFIC GAME
CREATE TABLE IF NOT EXISTS TCOMMENTS (
    ID_COMM INT GENERATED ALWAYS AS IDENTITY,
    TEXT_COMM VARCHAR(255) NOT NULL,
    DATE_COMM DATE NOT NULL DEFAULT CURRENT_DATE,
    FKUSERS_COMM INT NOT NULL,
    FKGAMES_COMM INT NOT NULL,
    PRIMARY KEY(ID_COMM),
    CONSTRAINT FKUSERS_COMM FOREIGN KEY(FKUSERS_COMM) REFERENCES TUSERS(ID_USE) ON DELETE SET NULL,
    CONSTRAINT FKGAMES_COMM FOREIGN KEY(FKGAMES_COMM) REFERENCES TGAMES(ID_GAM) ON DELETE SET NULL
);

-- TABLE TUSE_SET: RELATION TABLE BETWEEN TUSERS ANS TSETUPS
CREATE TABLE IF NOT EXISTS TUSE_SET (
    FKUSERS_TUSESET INT NOT NULL,
    FKSETUPS_TUSESET INT NOT NULL,
    PRIMARY KEY(FKUSERS_TUSESET, FKSETUPS_TUSESET),
    CONSTRAINT FKUSERS_TUSESET FOREIGN KEY (FKUSERS_TUSESET) REFERENCES TUSERS(ID_USE) ON DELETE SET NULL,
    CONSTRAINT FKSETUPS_TUSESET FOREIGN KEY (FKSETUPS_TUSESET) REFERENCES TSETUPS(ID_SET) ON DELETE SET NULL
);

-- TABLE TUSE_SET: RELATION TABLE BETWEEN TSETUPS ANS TCOMPONENTS
CREATE TABLE IF NOT EXISTS TSET_COMP (
    FKSETUPS_TSETCOMP INT NOT NULL,
    FKCOMPONENTS_TSETCOMP INT NOT NULL,
    PRIMARY KEY(FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP),
    CONSTRAINT FKSETUPS_TSETCOMP FOREIGN KEY(FKSETUPS_TSETCOMP) REFERENCES TSETUPS(ID_SET) ON DELETE SET NULL,
    CONSTRAINT FKCOMPONENTS_TSETCOMP FOREIGN KEY(FKCOMPONENTS_TSETCOMP) REFERENCES TCOMPONENTS(ID_COMP) ON DELETE SET NULL
);

-- TABLE TUSE_SET: RELATION TABLE BETWEEN TUSERS ANS TGAMES
CREATE TABLE IF NOT EXISTS TUSE_GAM (
    FKUSERS_TUSEGAM INT NOT NULL,
    FKGAMES_TUSEGAM INT NOT NULL,
    NAME_TUSEGAM VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(FKUSERS_TUSEGAM, FKGAMES_TUSEGAM),
    CONSTRAINT FKUSERS_TUSEGAM FOREIGN KEY(FKUSERS_TUSEGAM) REFERENCES TUSERS(ID_USE) ON DELETE SET NULL,
    CONSTRAINT FKGAMES_TUSEGAM FOREIGN KEY(FKGAMES_TUSEGAM) REFERENCES TGAMES(ID_GAM) ON DELETE SET NULL
);

-- COMMIT;

-- FOURTH: MAKE ALL THE INSERT FOR THE DEV ONLY!
INSERT INTO TROLES (NAME_ROL) VALUES('ADMIN');
INSERT INTO TROLES (NAME_ROL) VALUES('USER');
INSERT INTO TSETUPS (NAME_SET) VALUES ('TAREQ_SET');
INSERT INTO TSETUPS (NAME_SET) VALUES ('CHAD_SET');
INSERT INTO TSETUPS (NAME_SET) VALUES ('MOMO_SET');
INSERT INTO TSETUPS (NAME_SET) VALUES ('TAREQ2_SET');
INSERT INTO TPICTURES (NAME_PIC) VALUES ('/PATH/PICTURE_1.jpg');
INSERT INTO TPICTURES (NAME_PIC) VALUES ('/PATH/PICTURE_2.jpg');
INSERT INTO TPICTURES (NAME_PIC) VALUES ('/PATH/PICTURE_3.jpg');
INSERT INTO TPICTURES (NAME_PIC) VALUES ('/PATH/PICTURE_4.jpg');
INSERT INTO TGAMES (NAME_GAM, PIC_GAM) VALUES ('GTA5', '/PATH/PICTURE_GTA5.jpg');
INSERT INTO TGAMES (NAME_GAM, PIC_GAM) VALUES ('COUNTER STRIKE', '/PATH/PICTURE_CS.jpg');
INSERT INTO TTYPES (NAME_TYP) VALUES ('CPU');
INSERT INTO TTYPES (NAME_TYP) VALUES ('GPU');
INSERT INTO TTYPES (NAME_TYP) VALUES ('RAM');
INSERT INTO TUSERS (EMAIL_USE, USERNAME_USE, PASSWD_USE, FKPICTURES_USE, FKROLES_USE)
    VALUES('CHAD@GMAIL.COM', 'CHAD', 'CHAD_PASSWD', 2, 1);
INSERT INTO TUSERS (EMAIL_USE, USERNAME_USE, PASSWD_USE, FKPICTURES_USE, FKROLES_USE)
    VALUES('TAREK@GMAIL.COM', 'TAREK', 'TAREK_PASSWD', 3, 1);
INSERT INTO TUSERS (EMAIL_USE, USERNAME_USE, PASSWD_USE, FKPICTURES_USE, FKROLES_USE)
    VALUES('MOMO@GMAIL.COM', 'MOMO', 'MOMO_PASSWD', 2, 1);
INSERT INTO TUSERS (EMAIL_USE, USERNAME_USE, PASSWD_USE, FKPICTURES_USE, FKROLES_USE)
    VALUES('USER@GMAIL.COM', 'USER', 'USER_PASSWD', 1, 2);
INSERT INTO TCOMPONENTS (SERIAL_COMP, FKTYPES_COMP) VALUES ('i54433S', 1);
INSERT INTO TCOMPONENTS (SERIAL_COMP, FKTYPES_COMP) VALUES ('rx5000', 2);
INSERT INTO TCOMPONENTS (SERIAL_COMP, FKTYPES_COMP) VALUES ('DDR-333', 3);
INSERT INTO TCOMPONENTS (SERIAL_COMP, FKTYPES_COMP) VALUES ('i74770S', 1);
INSERT INTO TCOMMENTS (TEXT_COMM, FKUSERS_COMM, FKGAMES_COMM) VALUES ('THIS GAME ROCKS', 1, 1);
INSERT INTO TCOMMENTS (TEXT_COMM, FKUSERS_COMM, FKGAMES_COMM) VALUES ('THIS GAME SUCKS', 3, 1);
INSERT INTO TCOMMENTS (TEXT_COMM, FKUSERS_COMM, FKGAMES_COMM) VALUES ('BORRING GAME', 2, 2);
INSERT INTO TUSE_SET (FKUSERS_TUSESET, FKSETUPS_TUSESET) VALUES (1, 1);
INSERT INTO TUSE_SET (FKUSERS_TUSESET, FKSETUPS_TUSESET) VALUES (2, 2);
INSERT INTO TUSE_SET (FKUSERS_TUSESET, FKSETUPS_TUSESET) VALUES (3, 2);
INSERT INTO TUSE_SET (FKUSERS_TUSESET, FKSETUPS_TUSESET) VALUES (1, 2);
-- INSERT COMPONENT FOR TAREQ_SET
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (1, 1);
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (1, 2);
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (1, 3);
-- INSERT COMPONENT FOR CHAD_SET
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (2, 4);
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (2, 2);
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (2, 3);
-- INSERT COMPONENT FOR MOMO_SET
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (3, 1);
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (3, 2);
-- INSERT COMPONENT FOR TAREQ2_SET
INSERT INTO TSET_COMP (FKSETUPS_TSETCOMP, FKCOMPONENTS_TSETCOMP) VALUES (4, 1);
INSERT INTO TUSE_GAM (FKUSERS_TUSEGAM, FKGAMES_TUSEGAM, NAME_TUSEGAM) VALUES (1, 1, 'TAREQ_LIST_GAME');
INSERT INTO TUSE_GAM (FKUSERS_TUSEGAM, FKGAMES_TUSEGAM, NAME_TUSEGAM) VALUES (2, 1, 'CHAR_LIST_GAME');
INSERT INTO TUSE_GAM (FKUSERS_TUSEGAM, FKGAMES_TUSEGAM, NAME_TUSEGAM) VALUES (3, 2, 'MOMO_LIST_GAME');
INSERT INTO TUSE_GAM (FKUSERS_TUSEGAM, FKGAMES_TUSEGAM, NAME_TUSEGAM) VALUES (1, 2, 'TAREQ2_LIST_GAME');

-- CHECK INFORMATION
SELECT * FROM TUSERS;