const db = require ('./db')

module.exports =
  async (step_id) => {
    const [ step_record ] = await (
      db ('steps')
      .where ({ id : step_id })
      )

    return step_record
  }
