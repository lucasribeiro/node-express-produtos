import express, { Request, Response } from 'express';

// Importa o módulo do Express Framework
//const express = express();

// Inicializa um objeto de aplicação Express
const app = express();

app.use(express.json());

const produtos = [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]


// Cria um manipulador da rota padrão
app.get('/', async (request: Request, response: Response) => {
   response.send('Hello Word - teste');
});

// Cria um manipulador da rota padrão
app.get('/produtos/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    const produto = produtos.find(p => p.id === id);

    response.status(200).json(produto);

 });


app.get('/produtos', async (request: Request, response: Response) => {
    response.status(200).json(produtos);

 });

app.post('/produtos', (request, response) => {
    console.log(request.body);
    const {descricao, valor, marca } = request.body;

    const id = Math.max(...produtos.map(p => p.id)) + 1;
    console.log(id);
    produtos.push({id, descricao, valor, marca});
    response.status(200).send(`Produto ${descricao} gravado na lista`);
 });

 app.put('/produtos/:id', (request, response) => {
    
    const id: number = parseInt(request.params.id, 10);

    const index = produtos.findIndex(p => p.id === id);

    const {descricao, valor, marca } = request.body;

    produtos[index].descricao = descricao;
    produtos[index].marca = marca;
    produtos[index].valor = valor;
    
    response.status(201).json(produtos[index]);
 });

 app.delete('/produtos/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    const index = produtos.findIndex(p => p.id === id);

    produtos.splice(index, 1);

    response.status(202).json(`Produto removido na lista`);

 });


// Inicializa o servidor HTTP na porta 3000
app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});


