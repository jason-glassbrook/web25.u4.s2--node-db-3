const db = require ('./db')
const get = require ('./get')

module.exports =
  async (scheme_id) => {
    const scheme_record = await get (scheme_id)

    await (
      db ('schemes')
      .where ({ scheme_id })
      .delete ()
    )

    return scheme_record
  }
