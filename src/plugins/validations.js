import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  email,
  min_value as minVal,
  max_value as maxVal,
  alpha_spaces as alphaSpaces,
  confirmed,
  numeric,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('min_val', minVal)
    defineRule('max_val', maxVal)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('confirmed', confirmed)
    defineRule('numeric', numeric)
    defineRule('excluded', excluded)
    defineRule('country_exluded', excluded)
    defineRule('tos', required)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_val: `The field ${ctx.field} is too small.`,
          max_val: `The field ${ctx.field} is too big.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetic characters and spaces.`,
          confirmed: `The field ${ctx.field} does not match.`,
          numeric: `The field ${ctx.field} must be a number.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_exluded: `Due to restrictions, we do not accept users from this location.`,
          tos: `You must accept the terms of service.`
        }

        return messages[ctx.rule.name] || 'This field is invalid.'
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
