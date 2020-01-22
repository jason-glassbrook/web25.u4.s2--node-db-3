const db = require ('./db')
const get = require ('./get')

module.exports =
  async (scheme_value) => {
    const [ scheme_id ] = await (
      db ('schemes')
      .insert (scheme_value)
    )

    const scheme_record = await get (scheme_id)

    return scheme_record
  }
