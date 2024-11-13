import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/adoptions");

describe("Test de integracion de Adoption", function() {
    this.timeout(5000);
    let testUserId = "6709a50f3e2f8fc8f24bbda5";
    let testPetId = "6709a60850d566380e94b8f5";
    let testAdoptionId;

    it("[GET] /api/adoptions - Debe de devolver un array de adopciones", async () => {
        const { status, body } = await request.get("/");

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[POST] /api/adoptions/:uid/:pid - Debe crear una nueva adopcion", async () => {
        const { status, body } = await request.post(`/${testUserId}/${testPetId}`);
        expect(status).to.be.equal(200);
        expect(body).to.have.property("status", "success");
        expect(body).to.have.property("message", "Pet adopted");

        const { body: getAllBody } = await request.get("/"); 
        testAdoptionId = getAllBody.payload.find(adoption => adoption.owner === testUserId && adoption.pet === testPetId)._id; 
    });

    /* 
    Despues de ejecutar las pruebas siempre toca borrar la peticion POST que se creo, esto se hace
     por medio de las siguientes URL's en POSTMAN con el metodo DELETE:
     * http://localhost:8080/api/adoptions/remove-all
     * http://localhost:8080/api/pets/reset/6709a60850d566380e94b8f5
     * http://localhost:8080/api/users/remove/6709a50f3e2f8fc8f24bbda5/6709a60850d566380e94b8f5 
    */

    it("[GET] /api/adoptions/:aid - Debe obtener la adopción creada", async () => { 
        const { status, body } = await request.get(`/${testAdoptionId}`); 

        expect(status).to.be.equal(200); 
        expect(body.payload).to.have.property("_id", testAdoptionId); 
        expect(body.payload).to.have.property("owner", testUserId); 
        expect(body.payload).to.have.property("pet", testPetId); 
    });
});
