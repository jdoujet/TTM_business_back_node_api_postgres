CREATE TABLE utilisateur(
	id_user SERIAL PRIMARY KEY, 
	nom VARCHAR(255) NOT NULL,
	prenom VARCHAR(255) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE TABLE supermarche(
	id_supermarche SERIAL PRIMARY KEY,
	nom VARCHAR(255) NOT NULL,
	adresse VARCHAR(255),
	ville VARCHAR(255)
);

CREATE TABLE link_utilisateur_supermarche(
	id_link SERIAL PRIMARY KEY,
	id_supermarche INT NOT NULL, 
	id_user INT NOT NULL
);

ALTER TABLE link_utilisateur_supermarche
ADD CONSTRAINT constraint_key_user
FOREIGN KEY (id_user) 
REFERENCES utilisateur(id_user);

ALTER TABLE link_utilisateur_supermarche
ADD CONSTRAINT constraint_key_supermarche
FOREIGN KEY (id_supermarche)
REFERENCES supermarche(id_supermarche);

ALTER TABLE link_utilisateur_supermarche 
ADD CONSTRAINT unique_utilisateur_supermarche 
UNIQUE (id_supermarche, id_user);

CREATE TABLE plan(
	id SERIAL PRIMARY KEY,	
	id_plan INT NOT NULL,
	etage INT NOT NULL,
	nom VARCHAR(255) NOT NULL,
	longueur NUMERIC NOT NULL,
	largeur NUMERIC NOT NULL
);


CREATE TABLE link_supermarche_plan(
	id_link SERIAL PRIMARY KEY,
	id_supermarche INT NOT NULL, 
	id_plan INT NOT NULL
);

ALTER TABLE link_supermarche_plan
ADD CONSTRAINT constraint_key_supermarche
FOREIGN KEY (id_supermarche)
REFERENCES supermarche(id_supermarche);

ALTER TABLE link_supermarche_plan
ADD CONSTRAINT constraint_key_plan
FOREIGN KEY (id_plan) 
REFERENCES plan(id);

ALTER TABLE link_supermarche_plan 
ADD CONSTRAINT unique_supermarche_plan 
UNIQUE (id_supermarche, id_plan);

--DOUBLE PRECISION

CREATE TABLE entree(
	id_entree SERIAL PRIMARY KEY,
	longueur NUMERIC NOT NULL,
	largeur NUMERIC NOT NULL,
	coordonnees VARCHAR(255) NOT NULL
);

CREATE TABLE link_plan_entree(
	id_link SERIAL PRIMARY KEY,
	id_plan INT NOT NULL, 
	id_entree INT NOT NULL 
);


ALTER TABLE link_plan_entree
ADD CONSTRAINT constraint_key_plan
FOREIGN KEY (id_plan)
REFERENCES plan(id);

ALTER TABLE link_plan_entree
ADD CONSTRAINT constraint_key_entree
FOREIGN KEY (id_entree) 
REFERENCES entree(id_entree);

ALTER TABLE link_plan_entree 
ADD CONSTRAINT unique_plan_entree
UNIQUE (id_plan, id_entree);

CREATE TABLE beacon(
	id_beacon SERIAL PRIMARY KEY,
	uuid VARCHAR(255) NOT NULL,
	coordonnees VARCHAR(255) NOT NULL,
	batterie INT NOT NULL
);

CREATE TABLE link_plan_beacon(
	id SERIAL PRIMARY KEY,
	id_plan INT NOT NULL,	
	id_beacon INT NOT NULL
);


ALTER TABLE link_plan_beacon
ADD CONSTRAINT constraint_key_plan
FOREIGN KEY (id_plan) 
REFERENCES plan(id);

ALTER TABLE link_plan_beacon
ADD CONSTRAINT constraint_key_beacon
FOREIGN KEY (id_beacon) 
REFERENCES beacon(id_beacon);

ALTER TABLE link_plan_beacon 
ADD CONSTRAINT unique_plan_beacon
UNIQUE (id_plan, id_beacon);

CREATE TABLE rayon(
	id_rayon SERIAL PRIMARY KEY,
	nom_rayon VARCHAR(255) NOT NULL,
	type_rayon VARCHAR(255) NOT NULL,
	longueur NUMERIC NOT NULL,
	largeur NUMERIC NOT NULL,
	image_rayon VARCHAR(255),
	id_article_phare INT NULL
);

CREATE TABLE link_plan_rayon(
	id SERIAL PRIMARY KEY,
	id_plan INT NOT NULL,	
	id_rayon INT NOT NULL
);

ALTER TABLE link_plan_rayon
ADD CONSTRAINT constraint_key_plan
FOREIGN KEY (id_plan) 
REFERENCES plan(id);

ALTER TABLE link_plan_rayon
ADD CONSTRAINT constraint_key_rayon
FOREIGN KEY (id_rayon) 
REFERENCES rayon(id_rayon);

ALTER TABLE link_plan_rayon 
ADD CONSTRAINT unique_plan_rayon
UNIQUE (id_plan, id_rayon);

CREATE TABLE article(
	id_article SERIAL PRIMARY KEY,
	nom_article VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	labels VARCHAR(255) NOT NULL,
	numero_etagere INT NOT NULL,
	coordonnees VARCHAR(255) NOT NULL
);


ALTER TABLE rayon
ADD CONSTRAINT constraint_key_article_phare
FOREIGN KEY (id_article_phare) 
REFERENCES article(id_article);


CREATE TABLE link_rayon_article(
	id SERIAL PRIMARY KEY,
	id_rayon INT NOT NULL,	
	id_article INT NOT NULL
);


ALTER TABLE link_rayon_article
ADD CONSTRAINT constraint_key_rayon
FOREIGN KEY (id_rayon)
REFERENCES rayon(id_rayon);

ALTER TABLE link_rayon_article
ADD CONSTRAINT constraint_key_article
FOREIGN KEY (id_article) 
REFERENCES article(id_article);

ALTER TABLE link_rayon_article 
ADD CONSTRAINT unique_rayon_article
UNIQUE (id_rayon, id_article);

INSERT INTO utilisateur
(nom, prenom, password)
VALUES ('Dum', 'John', '123456'), ('Cho', 'Dina', 'b124'), ('Lieu', 'Nathan', '4575');

INSERT INTO supermarche
(nom, adresse, ville)
VALUES ('Carrefour', '29 rue des lilas 91100', 'Evry'),('Auchan', '2 boulevard des rochers 75003', 'Paris'),('Monoprix', '25 rue du four 75006', 'Paris');

INSERT INTO link_utilisateur_supermarche
(id_supermarche, id_user)
VALUES (1,1), (2,2), (3,3);

INSERT INTO plan
(id_plan, etage, nom, longueur, largeur)
VALUES (1, 0, 'rdc', 800, 1000), (1, 1, 'etage', 700, 800), (2, 0, 'rdc', 1000, 1500);

INSERT INTO link_supermarche_plan
(id_supermarche, id_plan)
VALUES (1, 1), (2, 2), (3, 3);

INSERT INTO entree
(longueur, largeur, coordonnees)
VALUES (20, 10, '200;780'), (20, 10, '0;100'), (20, 10, '800;0');

INSERT INTO link_plan_entree
(id_plan, id_entree)
VALUES (1,1), (2,2), (3,3);

INSERT INTO beacon
(uuid, coordonnees, batterie)
VALUES ('f7826da6-4fa2-4e98-8024-bc5b71e0893e','100;200','100'), ('f7826da6-4fa2-4e98-8024-bc5b71e0893f','200;300','80'), ('f7826da6-4fa2-4e98-8024-bc5b71e0893g','100;500','90');

INSERT INTO link_plan_beacon
(id_plan, id_beacon)
VALUES (1,1), (2,2), (3,3);

INSERT INTO rayon
(nom_rayon, type_rayon, longueur, largeur , image_rayon, id_article_phare, coordonnees)
VALUES ('fruits', 'fruits et legumes', 200, 80, 'fruits.jpg', null, '100;200'), ('lait', 'produits laitiers', 200, 80, 'laitiers.jpg', null, '300;400'), ('viandes', 'boucherie libre-service', 200, 80, 'viandes.jpg', null, '250;500'),
('lait', 'produits laitiers', 100, 80, 'laitiers.jpg', null, '400;500'), ('legumes', 'fruits et legumes', 200, 90, 'legumes.jpg', null, '300;200');

INSERT INTO link_plan_rayon
(id_plan, id_rayon)
VALUES (1,1), (1,2), (1,3), (2,4), (3,5);

INSERT INTO article
(nom_article, description, labels, numero_etagere, coordonnees)
VALUES ('banane', 'origine France', 'bio', 1, '110;210'), ('pomme', 'origine France', 'sans conservateur, sans pesticide', 1, '130;210'), 
('orange', 'origine Espagne', 'sans conservateur', 1, '120;210'), ('abricot', 'origine France', 'sans conservateur, sans pesticide', 1, '320;210'),
('carotte', 'origine France', 'bio, sans conservateur', 1, '180;210'),
('poireau', 'origine France', 'naturel', 2, '400;210'), ('courge', 'origine France', 'bio', 1, '360;210'), ('steak de boeuf', 'origine France', 'sans antibiotique', 3, '280;510'),
('escalope de dinde', 'origine Bordeaux, France', 'sans antibiotique, bio', 4, '320;510'), ('escalope de veau', 'origine Bretagne, France', 'en plein air, bio', 3, '360;510'), 
('lait demi ecreme vache', 'origine France', 'bio', 2, '360;410'), ('lait amande', 'origine France', 'vegan, bio', 2, '450;510');


INSERT INTO link_rayon_article
(id_rayon, id_article)
VALUES (1,1),(1,2),(1,3),(5,4),(1,5),(5,6),(5,7),(3,8),(3,9),(3,10),(2,11),(4,12);

SELECT r.* 
FROM rayon r
INNER JOIN link_plan_rayon lpr ON r.id_rayon = lpr.id_rayon
INNER JOIN link_supermarche_plan lsp ON lpr.id_plan = lsp.id_plan
INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = 1;

'''SELECT p.*, r.*, b.*
FROM plan p
LEFT JOIN link_plan_rayon lpr ON p.id_plan = lpr.id_plan
LEFT JOIN rayon r ON lpr.id_rayon = r.id_rayon
LEFT JOIN link_plan_beacon lpb ON p.id_plan = lpb.id_plan
LEFT JOIN beacon b ON lpb.id_beacon = b.id_beacon
LEFT JOIN link_supermarche_plan lsp ON p.id_plan = lsp.id_plan
INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = 1
WHERE p.id_plan=1 AND p.etage=0;
'''
SELECT DISTINCT p.*
FROM plan p
LEFT JOIN link_supermarche_plan lsp ON p.id_plan = lsp.id_plan
INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = 1
WHERE p.id_plan=1 AND p.etage=0;

SELECT DISTINCT r.*
FROM plan p 
LEFT JOIN link_plan_rayon lpr ON p.id_plan = lpr.id_plan
LEFT JOIN rayon r ON lpr.id_rayon = r.id_rayon
LEFT JOIN link_supermarche_plan lsp ON p.id_plan = lsp.id_plan
INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = 1
WHERE p.id_plan=1 AND p.etage=0;

SELECT DISTINCT b.*
FROM plan p
LEFT JOIN link_plan_beacon lpb ON p.id_plan = lpb.id_plan
LEFT JOIN beacon b ON lpb.id_beacon = b.id_beacon
LEFT JOIN link_supermarche_plan lsp ON p.id_plan = lsp.id_plan
INNER JOIN link_utilisateur_supermarche lus ON lsp.id_supermarche = lus.id_supermarche AND lus.id_user = 1
WHERE p.id_plan=1 AND p.etage=0;