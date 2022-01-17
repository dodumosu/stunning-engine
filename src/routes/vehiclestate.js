const { Router } = require('express');
const vehicleStateController = require('../controllers/vehiclestate');

const router = Router();
router.post('/states/new', vehicleStateController.createVehicleState);
router.put('/states/new', vehicleStateController.createVehicleState);
router.get('/states/:stateId', vehicleStateController.getVehicleState);
router.get('/states', vehicleStateController.getVehicleStates);
router.post('/states/:stateId', vehicleStateController.updateVehicleState);
router.put('/states/:stateId', vehicleStateController.updateVehicleState);
router.delete('/states/:stateId', vehicleStateController.deleteVehicleState);

module.exports = router;
