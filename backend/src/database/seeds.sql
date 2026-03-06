-- Datos semilla para pruebas de CRUD y reportes.

BEGIN;

TRUNCATE TABLE infracciones, matricula, vehiculos, agentes_transito, camaras, propietario RESTART IDENTITY CASCADE;

INSERT INTO propietario (tipo_propietario, identificacion, nombre, direccion) VALUES
	('persona', '1035001122', 'Juan Esteban Lopez', 'Cra 45 # 60-22, Sabaneta'),
	('persona', '1020304050', 'Maria Fernanda Torres', 'Cll 70 # 42-10, Medellin'),
	('empresa', '900765432-1', 'Transportes del Sur S.A.S', 'Av El Poblado # 12-34, Medellin');

INSERT INTO vehiculos (placa, marca, tipo_vehiculo, propietario_id) VALUES
	('ABC123', 'Chevrolet', 'automovil', 1),
	('MTR456', 'Yamaha', 'moto', 1),
	('JKL789', 'Renault', 'automovil', 2),
	('TRK321', 'Hino', 'carro_pesado', 3);

INSERT INTO matricula (vehiculo_id, fecha_matricula) VALUES
	(1, '2024-01-15'),
	(2, '2024-03-20'),
	(3, '2023-11-09'),
	(4, '2022-08-30');

INSERT INTO agentes_transito (identificacion, nombre) VALUES
	('70112233', 'Carlos Mejia'),
	('70998877', 'Laura Gomez');

INSERT INTO camaras (codigo, ubicacion) VALUES
	('CAM-SAB-001', 'Av Las Vegas con Calle 72 Sur'),
	('CAM-SAB-002', 'Cra 43A con Calle 66 Sur');

-- En cada registro solo uno de agente_id o camara_id debe tener valor.
INSERT INTO infracciones (vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id) VALUES
	(1, '2026-02-10', 'Exceso de velocidad', 650000, 1, NULL),
	(2, '2026-02-12', 'No portar licencia', 320000, 2, NULL),
	(3, '2026-02-15', 'Mal estacionamiento', 180000, NULL, 1),
	(4, '2026-02-18', 'Exceso de carga permitida', 980000, NULL, 2),
	(1, '2026-02-20', 'Cruzar semaforo en rojo', 780000, NULL, 2);

COMMIT;
