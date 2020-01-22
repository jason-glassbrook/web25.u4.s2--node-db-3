const db = require ('./db')
const get = require ('./get')

module.exports =
  async (id, value) => {
    await (
      db ('steps')
      .where ({ id })
      .update (value)
    )

    const record = await get (id)

    return record
  }
