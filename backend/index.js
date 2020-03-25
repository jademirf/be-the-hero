const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Jademir de Moura'
    })
});

app.listen(3333);

