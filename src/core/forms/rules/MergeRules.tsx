export default function MergeRules(rules: any) {
  let rulesDef = {};
  rules.forEach((element) => {
    rulesDef = {...rulesDef, ...element};
  });

  return rulesDef;
}
