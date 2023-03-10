CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(50) NOT NULL,
	"age" text NOT NULL,
	"gender" varchar(50) NOT NULL,
	"readyForTransfer" BOOLEAN NOT NULL,
	"notes" varchar(500)
);

INSERT INTO "koalas" ("name", "age", "gender", "readyForTransfer", "notes")
VALUES ('Jeff', '15', 'Male', True, 'Aggressive and fat'),
	   ('Mark', '12', 'Male', False, 'Goofy');