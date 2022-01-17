class VehicleStateHelper {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  createTable() {
    return this.pool.query(`
      CREATE TABLE IF NOT EXISTS vehicle_state (
        id SERIAL PRIMARY KEY NOT NULL,
        vehicle_id VARCHAR(32) NOT NULL,
        engine_temperature FLOAT NOT NULL,
        speed FLOAT NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        fuel_usage_rate FLOAT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT timezone('utc'::text, now()),
        updated TIMESTAMP DEFAULT timezone('utc'::text, now())
      );
    `);
  }

  dropTable() {
    return this.pool.query('DROP TABLE IF EXISTS vehicle_state;');
  }

  async createVehicleState(stateSpec) {
    if (
      !(
        stateSpec.vehicleId &&
        stateSpec.engineTemperature &&
        stateSpec.speed &&
        stateSpec.latitude &&
        stateSpec.longitude &&
        stateSpec.fuelUsageRate
      )
    )
      return null;

    const params = [
      stateSpec.vehicleId,
      stateSpec.engineTemperature,
      stateSpec.speed,
      stateSpec.latitude,
      stateSpec.longitude,
      stateSpec.fuelUsageRate,
    ];

    const result = await this.pool.query(
      `
      INSERT INTO vehicle_state (vehicle_id, engine_temperature, speed, latitude, longitude, fuel_usage_rate)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `,
      params
    );

    return result.rows[0].id;
  }

  async getVehicleState(stateId) {
    const result = await this.pool.query('SELECT * FROM vehicle_state WHERE id = $1', [stateId]);
    if (result.rowCount > 0)
      return {
        vehicleId: result.rows[0].id,
        engineTemperature: result.rows[0].engine_temperature,
        speed: result.rows[0].speed,
        latitude: result.rows[0].latitude,
        longitude: result.rows[0].longitude,
        fuelUsageRate: result.rows[0].fuel_usage_rate,
      };

    return null;
  }

  async getVehicleStates() {
    const result = await this.pool.query('SELECT * FROM vehicle_state ORDER BY created');
    if (result.rowCount > 0)
      return result.rows.map((record) => ({
        id: record.id,
        vehicleId: record.vehicle_id,
        engineTemperature: record.engine_temperature,
        speed: record.speed,
        latitude: record.latitude,
        longitude: record.longitude,
        fuelUsageRate: record.fuel_usage_rate,
      }));

    return null;
  }

  async updateVehicleState(stateId, stateSpec) {
    const currentState = await this.getVehicleState(stateId);

    const newStateSpec = Object.assign({}, currentState, stateSpec);

    const params = [
      stateId,
      newStateSpec.vehicleId,
      newStateSpec.engineTemperature,
      newStateSpec.speed,
      newStateSpec.latitude,
      newStateSpec.longitude,
      newStateSpec.fuelUsageRate,
    ];

    const result = await this.pool.query(
      `
      UPDATE vehicle_state SET
        vehicle_id = $2,
        engine_temperature = $3,
        speed = $4,
        latitude = $5,
        longitude = $6,
        fuel_usage_rate = $7,
        updated = timezone('utc'::text, now())
      WHERE id = $1
      RETURNING id;
    `,
      params
    );

    if (result.rowCount > 0) return result.rows[0].id;

    return null;
  }

  async deleteVehicleState(stateId) {
    const result = await this.pool.query('DELETE FROM vehicle_state WHERE id = $1 RETURNING id', [
      stateId,
    ]);
    if (result.rowCount > 0) return result.rows[0].id;

    return null;
  }

  async getVehicleStateCount() {
    const result = await this.pool.query('SELECT COUNT(id) AS cnt FROM vehicle_state;');

    return Number.parseInt(result.rows[0].cnt, 10);
  }
}

module.exports = VehicleStateHelper;
