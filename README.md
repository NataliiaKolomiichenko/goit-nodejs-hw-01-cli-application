# goit-nodejs-hw-01-cli-application

# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

![Get all contacts list](./images/contactsList.PNG)

# Получаем контакт по id

node index.js --action get --id 5

![Get contact by id](./images/getContactById.PNG)

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

![Adding a new contact](./images/addContact.PNG)

# Удаляем контакт

node index.js --action remove --id=3

![Deleting a contact by id](./images/removeContact.PNG)
