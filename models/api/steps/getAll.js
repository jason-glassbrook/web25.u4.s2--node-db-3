const db = require ('./db')

module.exports =
  async () => {
    const step_records = await (
      db ('steps')
    )

    return step_records
  }
