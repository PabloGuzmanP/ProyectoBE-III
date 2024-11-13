import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación API modulo de Users",
            version: "1.0.0",
            description: "API para poder obtener usuarios, actualizarlos y borrarlos."
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);