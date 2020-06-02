const db = require ('./db')

module.exports =
  async () => {
    const scheme_records = await (
      db ('schemes')
    )

    return scheme_records
  }
