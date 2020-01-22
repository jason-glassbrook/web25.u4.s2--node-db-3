const db = require ('./db')
const get = require ('./get')

module.exports =
  async (id) => {
    const record = await get (id)

    await (
      db ('steps')
      .where ({ id })
      .delete ()
    )

    return record
  }
