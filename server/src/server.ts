import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {connectToDatabse} from './database';
import {employeeRouter} from './employee.routes';

// Create a new express application instance
dotenv.config(); // Load environment variables from .env file

const {ATLAS_URI} = process.env;
if (!ATLAS_URI) {
    console.error('ATLAS_URI environment variable is not set.');
    process.exit(1);
}

connectToDatabse(ATLAS_URI).then(() => {
    console.log('Database connection established.');
    const app: express.Application = express();
    app.use(cors());
    app.use("/employees", employeeRouter);
    // Define routes here (e.g., app.use('/api/employees', employeeRouter);)

    const PORT = process.env.PORT || 5200;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});

