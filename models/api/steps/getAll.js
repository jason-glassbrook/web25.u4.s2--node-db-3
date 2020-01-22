const db = require ('./db')

module.exports =
  async () => {
    const records = await (
      db ('steps')
    )

    return records
  }
