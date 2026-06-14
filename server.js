const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const sequelize = require('./database/database');
const schema = require('./schema/schema');

const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);

Pelicula.belongsToMany(Actor, { through: Elenco });
Actor.belongsToMany(Pelicula, { through: Elenco });

sequelize.sync({ force: true })
.then(() => {

    console.log('Base de datos creada');

})
.catch((error) => {

    console.log(error);

});

const app = express();

app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
