import { required,email } from "@vuelidate/validators";
import form_rules from "~/config/forms/rules.json"

//get from-config from JSON
const formConfig = form_rules.rules;

// Map the rules receiving from the form-config
const rulesMapping = {
  required: required,
  email:email
}

const useValidations = (formName:string) => {

//Generate rules based on the form name
  const generateRules = (formConfig:any) => {
    const rules = {};
      const fields = formConfig[formName].fields;
      const messageKey = formConfig[formName].messagesKey;
      // console.log(messageKey)
    //@ts-ignore
      rules[formName] = {};
      for (const fieldName in fields) {
        //@ts-ignore
        rules[formName][fieldName] = {};
        fields[fieldName].rules.forEach((rule:any) => {
          //@ts-ignore
          const getRules = rulesMapping[rule]
          // console.log(ruleToGet)
          //@ts-ignore
          rules[formName][fieldName][getRules.$params.type] = useFormMessages(messageKey).getMessageByInput(fieldName, getRules);
          // console.log(rules)
        });
      }
        return rules;
  };

  //Store generated rules in rules key
  //@ts-ignore
  const { [formName]: rules } = generateRules(formConfig);

  return {
    rules
  };
};

export default useValidations;
