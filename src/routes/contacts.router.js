const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const avatarUpload = require('../middlewares/avatar-upload.middleware');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/contacts', router);

    /**
     * @swagger
     * /api/v1/contacts:
     *  get:
     *      summary: Get contacts by filter
     *      description: Get contacts by filter
     *      parameters:
     *        - in: query
     *          name: favorite
     *          schema:
     *            type: boolean
     *          description: Filter by favortite status
     *        - in: query
     *          name: name
     *          schema:
     *            type: string
     *          description: Filter by contact name
     *        - $ref: '#/components/parameters/limitParam'
     *        - $ref: '#/components/parameters/pageParam'
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: A list of contacts
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  status:
     *                    type: string
     *                    description: The response status
     *                    enum: [success]
     *                  data:
     *                    type: object
     *                    properties:
     *                      contacts:
     *                        type: array
     *                        items:
     *                          $ref: '#/components/schemas/Contact'
     *                      metadata:
     *                        $ref: '#/components/schemas/PaginationMetadata'
     *        400:
     *          description: Invalid input provided by the client
     *          $ref: '#/components/responses/400BadRequest'
     *        404:
     *          description: The requested resource was not found
     *          $ref: '#/components/responses/404NotFound'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.get('/', contactsController.getContactsByFilter);
    
    /**
     * @swagger
     * /api/v1/contacts:
     *  post:
     *      summary: Create a new contact
     *      description: Create a new contact
     *      requestBody:
     *          require: true
     *          content:
     *            multipart/form-data:
     *              schema:
     *                $ref: '#/components/schemas/Contact'
     *      tags:
     *        - contacts
     *      responses:
     *        201:
     *          description: A new contact
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  status:
     *                    type: string
     *                    description: The response status
     *                    enum: [success]
     *                  data:
     *                    type: object
     *                    properties:
     *                      contacts:
     *                        $ref: '#/components/schemas/Contact' 
     *        400:
     *          description: Invalid input provided by the client
     *          $ref: '#/components/responses/400BadRequest'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.post('/', avatarUpload, contactsController.createContact);

    /**
     * @swagger
     *  /api/v1/contacts:
     *    delete:
     *      summary: Delete all contacts
     *      description: Delete all contacts
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: All contacts deleted
     *          $ref: '#/components/responses/200NoData'
     *        404:
     *          description: The requested resource was not found
     *          $ref: '#/components/responses/404NotFound'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.delete('/', contactsController.deleteAllContacts);
    router.all('/', methodNotAllowed);
    
    /**
     * @swagger
     *  /api/v1/contacts/{id}:
     *    get:
     *      summary: Get contact by ID
     *      description: Get contact by ID
     *      parameters:
     *        - $ref: '#/components/parameters/contactIdParam'
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: A contact
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  status:
     *                    type: string
     *                    description: The response status
     *                    enum: [success]
     *                  data:
     *                    type: object
     *                    properties:
     *                      contact:
     *                        $ref: '#/components/schemas/Contact'
     *        400:
     *          description: Invalid input provided by the client
     *          $ref: '#/components/responses/400BadRequest'
     *        404:
     *          description: The requested resource was not found
     *          $ref: '#/components/responses/404NotFound'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.get('/:id', contactsController.getContact);

    /**
     * @swagger
     *  /api/v1/contacts/{id}:
     *     put:
     *      summary: Update contact by ID
     *      description: Update contact by ID
     *      parameters:
     *        - $ref: '#/components/parameters/contactIdParam'
     *      requestBody:
     *        required: true
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: '#/components/schemas/Contact'
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: An updated contact
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  status:
     *                    type: string
     *                    description: The response status
     *                    enum: [success]
     *                  data:
     *                    type: object
     *                    properties:
     *                      contact:
     *                        $ref: '#/components/schemas/Contact'
     *        400:
     *          description: Invalid input provided by the client
     *          $ref: '#/components/responses/400BadRequest'
     *        404:
     *          description: The requested resource was not found
     *          $ref: '#/components/responses/404NotFound'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.put('/:id', avatarUpload, contactsController.updateContact);
    
    /**
     * @swagger
     *  /api/v1/contacts/{id}:
     *    delete:
     *      summary: Delete contact by ID
     *      description: Delete contact by ID
     *      parameters:
     *        - $ref: '#/components/parameters/contactIdParam'
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: Contact deleted
     *          $ref: '#/components/responses/200NoData'
     *        404:
     *          description: The requested resource was not found
     *          $ref: '#/components/responses/404NotFound'
     *        500:
     *          description: Internal server error
     *          $ref: '#/components/responses/500InternalServerError'
     */
    router.delete('/:id', contactsController.deleteContact);
    router.all('/:id', methodNotAllowed);
};