const db = require ('./db')
const get = require ('./get')

module.exports =
  async (id, value) => {
    await (
      db ('schemes')
      .where ({ id })
      .update (value)
    )

    const record = await get (id)

    return record
  }
