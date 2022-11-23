const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
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
};

async function getContactById(contactId) {
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
};

async function removeContact(contactId) {
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
};

async function addContact(name, email, phone) {
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
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};