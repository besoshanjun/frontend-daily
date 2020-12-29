const xml1 = `
<list>
  <item>content1</item>
  <item>content2</item>
  <item>content3</item>
  <item>
    <name>hema</name>
    <value>frontend</value>
  </item>
</list>
`;

const json1 = {
  tag: "list",
  children: [
    {
      tag: "item",
      children: "content1",
    },
    {
      tag: "item",
      children: "content2",
    },
    {
      tag: "item",
      children: "content3",
    },
    {
      tag: "item",
      children: [
        {
          tag: "name",
          children: "hema",
        },
        {
          tag: "value",
          children: "frontend",
        },
      ],
    },
  ],
};

const xml2 = `<list>
  <item key="1">content1</item>
  <item key="2">content2</item>
  <item key="3">content3</item>
  <item key="4">
    <name id="hema-name">hema</name>
    <value id="hema-value">frontend</value>
  </item>
</list>`;

// 生成的 json
const json2 = {
  tag: "list",
  children: [
    {
      tag: "item",
      children: "content1",
      props: {
        key: "1",
      },
    },
    {
      tag: "item",
      children: "content2",
      props: {
        key: "2",
      },
    },
    {
      tag: "item",
      children: "content3",
      props: {
        key: "3",
      },
    },
    {
      tag: "item",
      children: [
        {
          tag: "name",
          children: "hema",
          props: {
            id: "hema-name",
          },
        },
        {
          tag: "value",
          children: "frontend",
          props: {
            id: "hema-value",
          },
        },
      ],
      props: {
        key: "4",
      },
    },
  ],
};

function generateToken(str) {
  let current = 0; // 创建指针
  let tokens = [];
  while (current < str.length) {
    let char = str[current];

    if (char === "<") {
      char = str[++current];
      let strValue = "";
      if (char === "/") {
        strValue += char;
        char = str[++current];
      }
      if (/[a-z]/.test(char)) {
        while (/[a-z]/.test(char)) {
          strValue += char;
          char = str[++current];
        }
        tokens.push({
          type: "tag",
          value: strValue,
        });
        if (/\s/.test(char)) {
          let strValue = "";
          char = str[++current];
          while (/[a-z]/.test(char)) {
            strValue += char;
            char = str[++current];
          }
          tokens.push({
            type: "key",
            value: strValue,
          });

          if (char === "=") {
            char = str[++current];
          }
          if (/[a-z"]/.test(char)) {
            if (char === '"') {
              char = str[++current];
            }
            let strValue = "";
            while (/[a-z0-9-]/.test(char)) {
              strValue += char;
              char = str[++current];
            }
            tokens.push({
              type: "params",
              value: strValue,
            });
            char = str[++current];
          }
        }
      }

      continue;
    }
    if (char === ">") {
      current++;
      continue;
    }

    if (/[\s\n]/.test(char)) {
      current++;
      continue;
    }

    if (/[a-z0-9]/.test(char)) {
      let strValue = "";
      while (/[a-z0-9]/.test(char)) {
        strValue += char;
        char = str[++current];
      }
      tokens.push({
        type: "value",
        value: strValue,
      });
      continue;
    }

    current++;
    console.log("current", current);
    continue;
  }
  return tokens;
}

const tokens1 = generateToken(xml1);
const tokens2 = generateToken(xml2);

function generateAst(tokens, hasProps) {
  let current = 0;
  let token = tokens[current];
  let ast = [];

  function walk() {
    if (token.type === "value") {
      current++;
      return token.value;
    }

    if (token.type === "tag") {
      let node = {
        tag: token.value,
        children: [],
        props: {},
      };
      if(!hasProps) {
        delete node.props
      }
      token = tokens[++current];
      while (
        token.type !== "tag" ||
        (token.type === "tag" && token.value.indexOf("/") === -1)
      ) {
        while (token.type === "key") {
          let key = token.value;
          token = tokens[++current];
          node.props[key] = token.value;
          token = tokens[++current];
        }
        const result = walk();
        if (typeof result === "string") {
          node.children = result;
        } else {
          node.children.push(result);
        }
        // walk里面current有自增，所以这里需要重新获取一下当前的token
        token = tokens[current];
      }
      current++;
      return node;
    }
  }

  while (current < tokens.length) {
    ast.push(walk());
  }
  return ast[0];
}

console.log('1.generateAst', JSON.stringify(generateAst(tokens1)) === JSON.stringify(json1))

console.log("generateAst", JSON.stringify(generateAst(tokens2, true)));
