export function getPartsAndRules(input) {
  const rules = {};
  const parts = [];
  let mode = "rules";
  input.forEach((line) => {
    if (line === "") {
      mode = "parts";
    } else if (mode === "rules") {
      //"px{a<2006:qkq,m>2090:A,rfg}",
      const [name, rest] = line.split("{");
      let conditions = rest.replace("}", "").split(",");
      conditions = conditions.map((condition) => {
        const splitCondition = condition.split(":");
        let res = {};
        if (splitCondition.length === 1) {
          res.dest = splitCondition[0];
        } else {
          let dest = splitCondition[1];
          let op = "<";
          let elements = splitCondition[0].split(op);
          if (elements.length === 1) {
            op = ">";
            elements = splitCondition[0].split(">");
          }
          res.dest = dest;
          res.op = op;
          res.name = elements[0];
          res.val = parseInt(elements[1]);
        }
        return res;
      });
      while (
        conditions.length > 1 &&
        conditions.at(-1).dest === conditions.at(-2).dest
      ) {
        // remove last condition if it is the same as default
        conditions.splice(conditions.length - 2, 1);
      }
      rules[name] = conditions;
    } else if (mode === "parts") {
      //"{x=787,m=2655,a=1222,s=2876}",
      const elements = line.replace(/[{}]/g, "").split(",");
      const res = {};
      elements.forEach((element) => {
        const [name, val] = element.split("=");
        res[name] = parseInt(val);
      });
      parts.push(res);
    }
  });
  return { parts, rules };
}

export function findDestination(part, rules, currentRule) {
  let destination;
  while (!(destination === "A" || destination === "R")) {
    let conditions = rules[currentRule];
    for (let i = 0; i < conditions.length; i++) {
      //console.log({ currentRule, conditions }, conditions[i]);
      const { name, op, val, dest } = conditions[i];
      if (!name || (part[name] && eval(`${part[name]}${op}${val}`))) {
        destination = dest;
        currentRule = dest;
        break;
      }
    }
  }
  return destination;
}

export function sumRatings(part) {
  return Array.from(Object.keys(part)).reduce((acc, cur) => acc + part[cur], 0);
}

export function sumAcceptedPartsRatings(input) {
  const { parts, rules } = getPartsAndRules(input);
  return parts.reduce((acc, cur) => {
    const dest = findDestination(cur, rules, "in");
    return acc + (dest === "A" ? sumRatings(cur) : 0);
  }, 0);
}
