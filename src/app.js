const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');

require('./config');
const pool = require('./database/connection');
const VehicleHelper = require('./database/vehiclestate');
const stateRoutes = require('./routes/vehiclestate');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', [stateRoutes]);
app.on('mount', () => {
  const vehicleHelper = new VehicleHelper(pool);
  vehicleHelper.createTable();
});

module.exports = app;
