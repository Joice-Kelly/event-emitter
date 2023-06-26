export const CREATE_TABLE_BTC_VALUE = `
  create table if not exists btc_value (
    id integer primary key,
    read_time text not null,
    price real not null
  )
`

/**
 * Escreva esta consulta
 */
export const INSERT_BTC_READ = `
    INSERT INTO btc_value (read_time, price)
    VALUES (?, ?)
`

/**
 * Escreva esta consulta
 */
export const SELECT_AVG_PRICE = `
    SELECT AVG(price) AS average_price
    FROM btc_value
`