
exports.onPreInit = (_, pluginOptions) => {
  console.log(
    `logging: "${pluginOptions.message}" to the console`
  )
}

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    message: Joi.string()
      .required()
      .description(`The message logged to the console.`),
    instagram_user_id : Joi.number()
      .required()
      .description("instagram user id of the business account"),
    instagram_user_name : Joi.string()
      .required()
      .description("username of the desired account"),
    access_token : Joi.string()
      .required()
      .description("access token of the account"),
  })
}