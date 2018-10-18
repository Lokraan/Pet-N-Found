# Pet n Found

App to connect pet owners to their lost pets.

## Requirements
- **NodeJS**
- Windows users will need the options for c# and c++ installed with their visual studio instance because our project uses bcrypt](https://github.com/kelektiv/node.bcrypt.js) to store our passwords. If you don't want to do this you can use linux.

## Build and Run
1) Clone the repository: `git clone https://github.com/Lokraan/Pet-N-Found.git`

2) Go to the Pet-N-Found directory: `cd Pet-N-Found`

3) Download dependencies: `npm i`

4) (Optional) edit the default and testing configs in `config/`

5) Create the database: `npm run migrate`

6) Run the app: `node app.js`
