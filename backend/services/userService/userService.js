const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

async function databaseConnect() {
    await client.connect();
    const database = client.db('MeuPorquinho');
    return database.collection('UserData');
}

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const collection = await databaseConnect();
            const user = await collection.findOne({ username: { $eq: username } });
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                delete user.password;
                return res.status(200).json({ user: user, message: 'Login efetuado com sucesso' });
            } else {
                return res.status(401).json({ message: 'Usuário ou senha inválidos' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao efetuar login' });
        } finally {
            await client.close();
        }
    },

    async register(req, res) {
        try {
            const { username, firstName, lastName, password, } = req.body;

            const collection = await databaseConnect();
            const userExists = await collection.findOne({ username });

            if (userExists) {
                return res.status(409).json({ message: 'Usuário já cadastrado' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await collection.insertOne({ username, firstName, lastName, password: hashedPassword });

                const user = await collection.findOne({ username, password: hashedPassword });
                delete user.password;
                return res.status(201).json({ user: user, message: 'Usuário cadastrado com sucesso' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } finally {
            await client.close();
        }
    },

    async getUsers(req, res) {
        try {
            const collection = await databaseConnect();
            const users = await collection.find().toArray();

            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuários' });
        } finally {
            await client.close();
        }
    },

    async deleteUser(req, res) {
        try {
            const { username } = req.params;

            const collection = await databaseConnect();
            await collection.deleteOne({ username });

            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar usuário' });
        } finally {
            await client.close();
        }
    }
}
