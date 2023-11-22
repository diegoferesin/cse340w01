CREATE TABLE public.classification(
	classification_id INT GENERATED BY DEFAULT AS IDENTITY, 
	classification_name CHARACTER VARYING NOT NULL,
	CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);