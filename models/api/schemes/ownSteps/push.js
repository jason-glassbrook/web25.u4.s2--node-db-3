const db = require ('./db')
const get = require ('../../steps/get')

module.exports =
  async (value) => {
    const [ id ] = await (
      db ('steps')
      .insert (value)
    )

    const record = await get (id)

    return record
  }
