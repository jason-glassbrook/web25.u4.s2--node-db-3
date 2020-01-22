const db = require ('./db')
const get = require ('./get')

module.exports =
  async (step_value) => {
    const [ step_id ] = await (
      db ('steps')
      .insert (step_value)
    )

    const step_record = await get (step_id)

    return step_record
  }
