import fastifyPlugin from '../dbConnection.js'

export async function getHomePage(req,reply){
    reply.send({Welcome:"to Home Page"})
}

export async function getAllProducts (req, reply){
    const fastify = this
    const client = await fastify.pg.connect()
    // console.log(client)
    
    try {
        const { rows } = await client.query(`SELECT * from products`)
        //console.log(rows)
        
        return rows
        
    } catch (err) {
        console.log(err)
    } finally {
        //Release the client immediately after query resolve or throw error
        client.release()
    }
}

export async function getAllClients (req,reply){
    const fastify = this
    const  client = await fastify.pg.connect()

    try {
        const { rows } = await client.query(`SELECT * from clients`)           
        return rows
        // o alta varianta de afisare a datelor clientilor pe linga schema
        // const id_name = rows.map(row => {return {id: row.id, name: row.name}});
        // return id_name
        
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

export async function getClientById (req,reply){
    const fastify = this
    const  client = await fastify.pg.connect()

    try {
        const { rows } = await client.query(`SELECT * from clients WHERE id = ${req.params.id}`)   
        // console.log(rows[0]) 

          
      
        return  rows[0]
     
    
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

export async function addClient (req,reply){
    const fastify = this
    const  client = await fastify.pg.connect()
    const newClient = req.body

    try {
        
        const response = await client.query(`INSERT INTO clients(name,address,phone,email,password) VALUES('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') `)   
        // console.log(response)
        return reply.code(200).send({message: "Client added"})       
    
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}

export async function updateClient (request,reply){
    const fastify = this
    const  client = await fastify.pg.connect()
    const newClient = request.body

    try {
        const oldUserReq = await client.query(`SELECT * FROM clients WHERE id = ${request.params.id} `)
        const oldUser = oldUserReq.rows[0]
        // console.log(oldUser)
        
        const response = await client.query(`UPDATE clients SET(name ,address , phone , email ,password) = ('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') WHERE id  = ${request.params.id}`) 
            console.log('....added')
        return response 
        
    } catch (err) {
        console.log(err)
    } finally{
        client.release()
    }
}


export async function deleteClient (request,reply){
    const fastify = this
    const client = await fastify.pg.connect()

    try {
        const { rows } = await client.query(` DELETE from clients WHERE id = ${request.params.id}`)
        console.log(`client ${request.params.id} deleted!!!!`)   
        return rows
     
    
    } catch (err) {
        console.log(err)
    } finally {
        client.release()
    }
}