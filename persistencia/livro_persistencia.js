const {Client} = require("pg")

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'biblioteca',
    user: 'postgres',
    password: '123456'
}

async function inserir(livro) {
    const livroConexao = new Client(conexao)
    const sql = "INSERT INTO livros(id, nome, autor, editora, ano) VALUES($1,$2,$3,$4,$5) RETURNING *"
    const values = [livro.id, livro.nome, livro.autor, livro.editora, livro.ano]
    livroConexao.connect()
    try {
        const resultado = await livroConexao.query(sql, values)
        //fechar a conexao
        livroConexao.end()
        //trabalhar com o resultado.
        return resultado.rows[0]
    } catch(err) {
        throw err
    }
}

async function listar() {
    
    try {
        //instanciar Client
        const livro = new Client(conexao)
        const sql = "SELECT * FROM livros order by id"
        //Fazer a conexao
        livro.connect()
        //Realizar a query
        const resultado = await livro.query(sql)
        //fechar a conexao
        livro.end()
        //trabalhar com o resultado.
        return resultado.rows
    } catch(err) {
        throw err
    }
}

async function buscarPorId(id) {
    const livro = new Client(conexao)
    const sql = "SELECT * FROM livros WHERE id=$1"
    const values = [id]
    livro.connect()
    try {
        const resultado = await livro.query(sql, values)
        //fechar a conexao
        livro.end()
        //trabalhar com o resultado.
        return resultado.rows[0]
    }
    catch(err){
        throw err
    }
}

async function atualizar(id, livro) {
    const livroConexao = new Client(conexao)
    const sql = "UPDATE livros SET nome=$1, autor=$2, ano=$3, editora=$4 WHERE id=$5  RETURNING *"
    const values = [livro.nome, livro.autor, livro.ano, livro.editora, id]
    livroConexao.connect()
    try {
        const resultado = await livroConexao.query(sql,values)
        //fechar a conexao
        livroConexao.end()
        //trabalhar com o resultado.
        return resultado.rows[0]
    } catch(err) {
        throw err
    }
}

async function deletar(id) {
    const livro = new Client(conexao)
    const sql = "DELETE FROM livros WHERE id=$1 RETURNING *"
    const values = [id]
    livro.connect()
    try {
        const resultado = await livro.query(sql, values)
        //fechar a conexao
        livro.end()
        //trabalhar com o resultado.
        return resultado.rows[0]
    } catch(err) {
        throw err
    }
}

module.exports = { 
    listar, 
    buscarPorId, 
    inserir, 
    atualizar, 
    deletar
}