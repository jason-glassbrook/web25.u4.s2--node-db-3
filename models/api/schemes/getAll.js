const db = require ('./db')

module.exports =
  async () => {
    const records = await (
      db ('schemes')
    )

    return records
  }
