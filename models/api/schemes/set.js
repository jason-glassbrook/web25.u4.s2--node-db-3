const db = require ('./db')
const get = require ('./get')

module.exports =
  async (scheme_id, scheme_value) => {
    await (
      db ('schemes')
      .where ({ scheme_id })
      .update (scheme_value)
    )

    const scheme_record = await get (scheme_id)

    return scheme_record
  }
