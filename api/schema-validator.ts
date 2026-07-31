import fs from 'fs/promises'
import path from 'path'
import Ajv from 'ajv'
import { createSchema } from 'genson-js'

const SCHEMA_BASE_PATH = './response-schemas'
const ajv = new Ajv({allErrors: true})

export async function validateSchema(dirName: string, fileName: string, responseBody: object, createSchemaFlag: boolean = false){
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`)

    if(createSchemaFlag){
        try {
            const generatedSchema = createSchema(responseBody)
            await fs.mkdir(path.dirname(schemaPath), {recursive: true})
            await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 4))
        } catch (error) {
            throw new Error(`Failed to create schema file: ${error.message}`)
        }
    }

    const schema = await loadSchema(schemaPath)
    const validate = ajv.compile(schema)

    const valid = validate(responseBody)
if(!valid) console.log(validate.errors)

}

async function loadSchema(schemaPath: string) {
    try {
        const schemaContent = await fs.readFile(schemaPath, 'utf-8')
        return JSON.parse(schemaContent)
    } catch (error) {
        throw new Error(`Failed to read the schema file: ${error.message}`)
    }
}