const db = require ('./db')
const get = require ('../../steps/get')

module.exports =
  async (scheme_id, step_value) => {
    const [ step_id ] = await (
      db ('steps')
      .insert ({ ...step_value, scheme_id })
    )

    const step_record = await get (step_id)

    return step_record
  }
