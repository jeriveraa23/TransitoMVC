DROP TABLE IF EXISTS infracciones CASCADE;
DROP TABLE IF EXISTS vehiculos CASCADE;
DROP TABLE IF EXISTS agentes_transito CASCADE;
DROP TABLE IF EXISTS camaras CASCADE;
DROP TABLE IF EXISTS propietario CASCADE;

CREATE TABLE propietario (
	id_propietario SERIAL PRIMARY KEY,
	tipo_propietario VARCHAR(10) NOT NULL CHECK (tipo_propietario IN ('persona', 'empresa')),
	identificacion VARCHAR(30) NOT NULL UNIQUE,
	nombre VARCHAR(120) NOT NULL,
	direccion VARCHAR(200) NOT NULL
);

CREATE TABLE vehiculos (
	id_vehiculo SERIAL PRIMARY KEY,
	placa VARCHAR(10) NOT NULL UNIQUE,
	marca VARCHAR(60) NOT NULL,
	tipo_vehiculo VARCHAR(20) NOT NULL CHECK (tipo_vehiculo IN ('automovil', 'moto', 'carro_pesado')),
	propietario_id INTEGER NOT NULL,
	CONSTRAINT fk_propietario_id_propietario_vehiculos
		FOREIGN KEY (propietario_id)
		REFERENCES propietario(id_propietario)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);

CREATE TABLE agentes_transito (
	id_agente SERIAL PRIMARY KEY,
	identificacion VARCHAR(30) NOT NULL UNIQUE,
	nombre VARCHAR(120) NOT NULL
);

CREATE TABLE camaras (
	id_camara SERIAL PRIMARY KEY,
	codigo VARCHAR(30) NOT NULL UNIQUE,
	ubicacion VARCHAR(200) NOT NULL
);

CREATE TABLE infracciones (
	id_infraccion SERIAL PRIMARY KEY,
	vehiculo_id INTEGER NOT NULL,
	fecha_infraccion DATE NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	valor NUMERIC(12, 2) NOT NULL CHECK (valor >= 0),
	agente_id INTEGER,
	camara_id INTEGER,
	CONSTRAINT fk_vehiculos_id_vehiculo_infracciones
		FOREIGN KEY (vehiculo_id)
		REFERENCES vehiculos(id_vehiculo)
		ON UPDATE NO ACTION
		ON DELETE CASCADE,
	CONSTRAINT fk_agentes_transito_id_agente_infracciones
		FOREIGN KEY (agente_id)
		REFERENCES agentes_transito(id_agente)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	CONSTRAINT fk_camaras_id_camara_infracciones
		FOREIGN KEY (camara_id)
		REFERENCES camaras(id_camara)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	CONSTRAINT chk_origen_infraccion
		CHECK (
			(agente_id IS NOT NULL AND camara_id IS NULL)
			OR (agente_id IS NULL AND camara_id IS NOT NULL)
		)
);

CREATE INDEX idx_vehiculos_propietario_id ON vehiculos(propietario_id);
CREATE INDEX idx_infracciones_vehiculo_id ON infracciones(vehiculo_id);
CREATE INDEX idx_infracciones_fecha ON infracciones(fecha_infraccion);