const db = require ('./db')

module.exports =
  async (scheme_id) => {
    const [ scheme_record ] = await (
      db ('schemes')
      .where ({ id : scheme_id })
      )

    return scheme_record
  }
