import {openDB} from './config/db.js' 
import {CREATE_TABLE_BTC_VALUE, INSERT_BTC_READ, SELECT_AVG_PRICE} from './config/queries.js'
import { coinEmitter } from './emitters/coin_emitter.js'

console.log('Iniciando leituras...')

/**
 * Formatador capaz de formatar um número
 * no padrão de moeda brasileiro.
 */
const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'usd',
})

let totalPrice = 0;
let readingsCount = 0;
const db = await openDB()

db.run(CREATE_TABLE_BTC_VALUE, function (error){
  if(error){
    console.log('Erro ao criar a tabela no banco de dados:', error.message);
  }else{
    console.log('Tabela criada com sucesso no banco de dados! :)');
  }
})
/**
 * Listener que é acionado toda vez que
 * o coin emitter emite o preço atual
 * do Bitcoin.
 */

const calculateAndDisplayAverage = () => {
  if (readingsCount > 0) {
    const averagePrice = totalPrice / readingsCount;
    const formattedAverage = moneyFormatter.format(averagePrice);
    console.log(`Valor médio do Bitcoin desde a primeira leitura: ${formattedAverage}`);
  }
};

coinEmitter.on('btc_read', (price) => {
  const time = new Date().toISOString()
  const formattedPrice = moneyFormatter.format(price)
  console.log(`Preço do Bitcoin em ${time} -> U$ ${formattedPrice}`)


  db.run(INSERT_BTC_READ, [time, price], function (error){
    if(error){
      console.log('Erro ao inserir o preço:', error.message)
    }else{
      console.log('Preço da moeda salvo com sucesso! :)')
      }
})
  totalPrice += price;
  readingsCount++;
  calculateAndDisplayAverage();
  });


  process.on('SIGINT', ()=>{
    db.close((error)=>{
      if(error){
        console.error('Erro ao fechar a conexão com o banco de dados:', error.message)
    } else {
      console.log('Conexão com banco de dados foi fechado');
      process.exit(0)
      }
    })
  })


  /**
   * Abaixo, crie o código necessário para salvar
   * o novo preço lido do Bitcoin na tabela btc_value.
   * Após, crie o código necessário para executar uma
   * consulta na tabela btc_value que retorne o valor
   * médio do Bitcoin desde a primeira leitura.
   */


/**
 * Observação final:
 *
 * Implemente este script de tal forma que,
 * caso ele seja interrompido e posteriormente
 * executado novamente, não haja problemas
 * de conflito de chaves primárias na tabela
 * btc_value.
 */