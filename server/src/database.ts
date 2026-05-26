import * as mongodb from 'mongodb';
import { Employee } from './employee';  

export const collections: { employees?: mongodb.Collection<Employee> } = {};


export async function connectToDatabse(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db('mean-employees');
    await applySchemaValidation(db);
    
    const employeeCollection = db.collection<Employee>('employees');
    collections.employees = employeeCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${employeeCollection.collectionName}`);
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'position', 'level'],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: 'string',
                    description: "'name' is required and is a string"
                },
                position: {
                    bsonType: 'string',
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    enum: ['junior', 'mid', 'senior'],
                    description: "'level' is required and must be either 'junior', 'mid', or 'senior'",
                    bsonType: 'string',
                }
            }
        }
    };

    await db.command({
        collMod: 'employees',
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('employees', { validator: jsonSchema });

        } else {
            console.error(error);
        }
    });
}