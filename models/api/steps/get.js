const db = require ('./db')

module.exports =
  async (id) => {
    const [ record ] = await (
      db ('steps')
      .where ({ id })
      )

    return record
  }
