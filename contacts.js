const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });
        const contacts = await JSON.parse(contactsData);
        return Promise.all(
            contacts.map(({id, name, email, phone}) => {
                return {
                    Id: id,
                    Name: name,
                    Email: email,
                    Phone: phone,
                }
            })
        );
    } catch (error) {
        console.log(error)
    }
};

async function getContactById(contactId) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });
        const contacts = await JSON.parse(contactsData)
        const index = contacts.findIndex(contact => contact.id === contactId.toString());
        const {id, name, email, phone} = contacts[index];
        return {
            Id: id,
            Name: name,
            Email: email,
            Phone: phone,
        }
    } catch (error) {
        console.log(error)
    }
};

async function removeContact(contactId) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });

        const parsedContactsData = JSON.parse(contactsData)
        
        const index = parsedContactsData.findIndex(contact => contact.id === contactId);
        parsedContactsData.splice(index, 1);

        const newContactsData = JSON.stringify(parsedContactsData)

        await fs.writeFile(contactsPath, newContactsData, 'utf8', (error) => {
            if (error) console.log(error);
        });

        const newContacts = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });

        const contacts = await JSON.parse(newContacts);
        return Promise.all(
            contacts.map(({id, name, email, phone}) => {
                return {
                    Id: id,
                    Name: name,
                    Email: email,
                    Phone: phone,
                }
            })
        );
    } catch (error) {
        console.log(error)
    }
};

async function addContact(name, email, phone) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });
        
        const parsedContactsData = JSON.parse(contactsData)
        const newId = parsedContactsData.length+1
        parsedContactsData.push({id: newId.toString(), name, email, phone });
        const newContactsData = JSON.stringify(parsedContactsData)

        await fs.writeFile(contactsPath, newContactsData, 'utf8', (error) => {
            if (error) console.log(error);
        });

        const newContacts = await fs.readFile(contactsPath, 'utf8', (error, data) => {
            if (error) console.log(error);
            return data;
        });

        const contacts = await JSON.parse(newContacts);
        return Promise.all(
            contacts.map(({id, name, email, phone}) => {
                return {
                    Id: id,
                    Name: name,
                    Email: email,
                    Phone: phone,
                }
            })
        );
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};