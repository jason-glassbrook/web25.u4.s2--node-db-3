const db = require ('./db')

module.exports =
  async (id) => {
    const [ record ] = await (
      db ('schemes')
      .where ({ id })
      )

    return record
  }
