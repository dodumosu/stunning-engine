const pool = require('../database/connection');
const VehicleHelper = require('../database/vehiclestate');

const RESULTSTATE = {
  OK: 'success',
  ERROR: 'error',
};

const createVehicleState = async (request, response) => {
  const vehicleHelper = new VehicleHelper(pool);
  const vehicleStateId = await vehicleHelper.createVehicleState(request.body);

  response.status(200).json({
    status: RESULTSTATE.OK,
    data: {
      id: vehicleStateId,
    },
  });
};

const getVehicleState = async (request, response) => {
  const vehicleHelper = new VehicleHelper(pool);
  const state = await vehicleHelper.getVehicleState(request.params.stateId);

  if (state)
    response.status(200).json({
      status: RESULTSTATE.OK,
      data: state,
    });
  else
    response.status(404).json({
      status: RESULTSTATE.ERROR,
      message: 'Not found',
    });
};

const getVehicleStates = async (request, response) => {
  const vehicleHelper = new VehicleHelper(pool);
  const states = await vehicleHelper.getVehicleStates();

  response.status(200).json({
    status: RESULTSTATE.OK,
    data: states,
  });
};

const updateVehicleState = async (request, response) => {
  const vehicleHelper = new VehicleHelper(pool);
  const stateId = await vehicleHelper.updateVehicleState(request.params.stateId, request.body);

  if (stateId)
    response.status(200).json({
      status: RESULTSTATE.OK,
      data: { id: stateId },
    });
  else
    response.status(404).json({
      status: RESULTSTATE.ERROR,
      message: 'Not found',
    });
};

const deleteVehicleState = async (request, response) => {
  const vehicleHelper = new VehicleHelper(pool);
  const stateId = await vehicleHelper.deleteVehicleState(request.params.stateId);

  if (stateId)
    response.status(200).json({
      status: RESULTSTATE.OK,
      data: { id: stateId },
    });
  else
    response.status(404).json({
      status: RESULTSTATE.ERROR,
      message: 'Not found',
    });
};

module.exports = {
  createVehicleState,
  getVehicleState,
  getVehicleStates,
  updateVehicleState,
  deleteVehicleState,
};
