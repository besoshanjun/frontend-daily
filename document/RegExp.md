# 正则表达式 Regular Expression



## JavaScript中的正则表达式

正则表达式是用来在字符串中寻找特定的字符组合的模式。JavaScript中正则表达式也是对象。



构造正则表达式：

```js
const re1 = /^https?:\/\//m;
const re2 = new RegExp('^https?://', 'm');
```



涉及正则表达式的方法：

```js
// 判断字符串是否符合正则的规则
/goo+gle/.test('goooooooooogle'); // -> true
'baidu.com'.search(/^https?:/); // -> -1

// 获取匹配的内容
/1\d{10}/.exec('My phone number is 15600000000'); // -> ['15600000000']
'https://www.xuanxiaodi.com'.match(/^https?/); // -> ['https']
'https://www.xuanxiaodi.com'.matchAll(/^https?/g); // -> Iterator -> [['https']]

// 替换
'https://xxd.smartstudy.com'.replace(/xxd\.smartstudy/g, 'www.xuanxiaodi');

// 拆分
'abc_def-ghi'.split(/([_-])/); // -> ['abc', '_', 'def', '-', 'ghi']
```



## 正则表达式中可以写哪些模式 (Pattern) ？

- 转义字符 `\`
  - 后面接普通字符，会将普通字符转为特殊含义（`\b`, `\n`）
  - 后面接特殊字符，会将特殊字符转为普通含义（`\\`, `\.`, `\*`）
- 普通字符：字符直接匹配（`/abc/`，`/iPhone XS/`）
- 特殊字符：
  - 边界：
    - 起始边界 `^`，`/^https?:/`
    - 结尾边界 `$`，`/\.jpe?g$/`
    - 单词边界 `\b`，`/\bapple\b/` => apple, ~~pineapple~~, ~~appleseed~~
    - 非单词边界 `\B`，`/\Bless\b/` => ~~less~~, ~~lesser~~, serverless, koaless
  - 断言：
    - 向前(Lookahead) 断言 `x(?=y)`，`/[a-z]+(?=less)/i` 
    - 向前否定断言 `x(?!y)`，`/java(?!script)/i`
    - 向后(Lookbehind) 断言 `(?<=y)x`，`/(?<=\bd=").*(?=")/`, `<path d="M0,0L0,100Z"></path>`
    - 向后否定断言 `(?<!y)x`，`/(^.+)(?<!^index)\.js$/`
  - 组和范围：
    - 或 `x|y`，匹配其中任意一种模式（`/iPad|iPhone/`, `/iPad|iPhone|/`）
    - 字符集 `[xyz]` `[x-z]`，匹配指定范围内的任意字符（这个语法中，大部分特殊字符失去特殊含义）
    - 否定字符集 `[^xyz]` `[^x-z]`，这个位置不能匹配指定范围内的任意字符（`/[^a-z]+/gi`）
    - 捕获组 `(x)`，里面匹配出的内容会出现在结果数组中
    - 命名捕获组 `(?<name>x)`，里面匹配的内容会出现在结果的 `groups[name]` 属性里（同时也会在结果数组中）
    - 非捕获组 `(?:x)`，里面匹配的内容不会出现在结果数组中
    - 捕获组内容引用 `\x`（x为正整数），引用第x个匹配组匹配到的内容（并不是引用模式）
      - `/a([_-])b\1c/`，"a-b-c"，"a_b_c"，~~"a_b-c"~~
  - 量词
    - 准确次数 `x{n}`，模式重复n次，`/\bXXXXXXXXXL\b/ -> /\bX{9}L\b/`
    - 次数范围 `x{n,m}`，模式重复n~m次，`/\b(X{0,9}[SL]|M)\b/`
    - 无上限的次数范围 `x{n,}`，模式重复至少n次，`/go{2,}gle/`
    - `x? = x{0,1}`
    - `x* = x{0,}`
    - `x+ = x{1,}`
    - 非贪婪量词 `x*?` `x+?` `x{n,m}?` `x{n,}?`，匹配尽可能少的字符串（默认是贪婪量词，尽可能多地匹配）`'I say "hey", you say "hey".'    /"[^"]+"/`
  - 字符类型
    - `.` 任意单个字符（除了行分隔符，比如：`\n` `\r` `\u2028` `\u2029`）
      - ES2018增加的 `s` 标志，可以让 `.` 匹配所有字符
    - 数字 `\d = [0-9]`  `\D = [^0-9]` 
    - 字母数字下划线 `\w = [A-Za-z0-9_]` `\W = [^A-Za-z0-9_]`
    - 空白字符 `\s` `\S` （`\s = [ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`）
    - 特殊字符转义：`\t\r\n\v\f\0` `[\b]` 这些字符在 `[xyz]` 中不会失去含义
    - 根据字符值表示字符：
      - `\cX`，控制字符，可以用 `[\cA-\cZ]` 表示 `[\x01-\x1F]`
      - `\xHH`，表示单字节字符（H为十六进制）
      - `\uHHHH`，表示UTF-16双字节字符（H为十六进制）
      - `\u{HHHHH}`，表示任意Unicode字符（H为十六进制，需要开启 `u` 标志）
      - 这些字符在 `[xyz]` 中不会失去含义
  - Unicode属性匹配 `\p{...}` `\P{...}`（需要开启 `u` 标志）
    - 可以按照Unicode字符的属性来匹配特定范围的单个字符
    - 形式1：`\p{BinaryPropertyName}`，BinaryPropertyName需要为布尔型属性的名称或缩写
      - 例如：ASCII、Emoji、Ideographic（Ideo，表意文字，包括中文）、White_Space (space)
      - 可以在这里查：https://tc39.es/ecma262/#table-binary-unicode-properties
    - 形式2：`\p{GeneralCategoryName}`，GeneralCategoryName需要为通用分类名称或缩写
      - 例如：Letter (L)、Number (N)、Punctuation (P)、Symbol (S)
      - 可以在这里查 https://www.unicode.org/reports/tr44/#GC_Values_Table
    - 形式2: `\p{PropertyName=PropertyValue}`，PropertyName需要为非布尔型属性的名称，PropertyValue需要为对应属性的值
      - 例如：Script=Han（sc=Han），Script=Latin（sc=Latn）
    - 比较常用的有：
      - `\p{Letter}` `\p{L}` 字母（任意语言的字，包括中文）
      - `\p{Script=Han}` `\p{sc=Han}` 汉字
      - `\p{Emoji}` Unicode表情符号
      - `[\p{Cn}\p{Co}]` 未定义字符与私有字符（一般会洗掉这些字符）



## JavaScript的正则表达式有哪些标志 (Flag) ？

正则表达式的标记可以改变它的一些匹配行为。

- `g` 全局匹配，将在目标字符串中寻找所有符合模式的子串
- `i` 不区分大小写匹配
- `m` 多行匹配，`^` `$` 可以匹配每一行的开始和结束
- `s` 允许 `.` 匹配换行符（即 `.` 可以匹配任意UTF-16字符）
- `u` 允许根据Unicode特性匹配（ `.`可以匹配Unicode字符，支持 `\u{...}` 和 `\p{...}`）
- `y` 执行粘性匹配（匹配时将从 `lastIndex` 位置开始，并在结束时更新 `lastIndex` ）







## 一些简单的使用场景



### 获取所有匹配子串的捕获组

```js
const re = /($|¥|$CAD|$AUD)\s*(\d+(?:\.\d+)?)/g;
const str = '$0.99 $1.99 $CAD 2.99 $AUD 4.99';
const rmbArray = [];
do {
  const m = re.exec(str);
  if (m) {
    const rmb = currency.toRmb(m[1], m[2]);
    if (rmb != null) {
      rmbArray.push(rmb);
    }
  }
} while (re.lastIndex > 0);
```

```js
const re = /($|¥|$CAD|$AUD)\s*(\d+(?:\.\d+)?)/g;
const str = '$0.99 $1.99 $CAD 2.99 $AUD 4.99';
const rmbArray = [];
str.replace(re, (__, unit, value) => {
  const rmb = currency.toRmb(m[1], m[2]);
  if (rmb != null) {
    rmbArray.push(rmb);
  }
});
```

```js
const re = /($|¥|$CAD|$AUD)\s*(\d+(?:\.\d+)?)/g;
const str = '$0.99 $1.99 $CAD 2.99 $AUD 4.99';
const rmbArray = [...str.matchAll(re)]
  .map(([__, unit, value]) => currency.toRmb(unit, value))
  .filter(rmb => rmb != null);
```



### 转换命名风格

```js
const snakeToCamel = (str) =>
  str.replace(/_([a-z])/g, (__, char) => char.toUpperCase());

const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (char) => "_" + char.toLowerCase());

```



### 判断是否Base64字符串

```js
// A-Za-z0-9-_
// AAAAAA
// AAAA
// AAA
// AA

const isBase64 = (str) =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
    str
  );

const isUrlSafeBase64 = (str) =>
  /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,4}$/.test(str);

```



### 高亮纯文本中的关键字

```jsx
const highlightToHtml = (str) =>
  str.replace(/\b(apple|orange|watermelon)\b/g, '<mark>$1</mark>');

const highlightToReact = (str) => // I have an apple.
  str
    .split(/\b(apple|orange|watermelon)\b/) // 0:'I have an ',1:'apple', '.'
    .map((str, i) =>
      str.length > 0 ? (
        i % 2 === 0 ? (
          <span key={i}>{str}</span>
        ) : (
          <mark key={i}>{str}</mark>
        )
      ) : null
    )
    .filter((el) => el != null);

```



### 将文本中的中文转换为拼音

```js
const convertHanToPinyin = str => 
  str.replace(/\p{Script=Han}+/gu, substr => pinyin(substr).join(' '));
```



### 快速去掉URL的query和hash

```js
const stripHash = url => url.split(/[#?]/)[0];

const stripHash = url => {
  const index = url.search(/[#?]/);
  if (index === -1) {
    return url;
  }
  return url.slice(0, index);
}
```



### 清理掉文本中的无效字符

```js
const cleanString = (str, escape) => str
  .replace(/[\p{DI}\p{Cn}\p{Co}]/g, '') // 去掉默认可忽略字符、未定义字符、私有字符
  .replace(/\p{Zs}/g, ' ') // 将所有的空格变形替换为普通空格
  .replace(/[\p{Zl}\p{Zp}]/g, escape ? '\\n' : '\n') // 将所有的换行变形替换为普通换行
  ;
```









## 小结

正则表达式可以用于：

- 判断字符串是否包含指定模式
- 判断字符串是否整体符合指定模式
- 提取字符串中的特定模式
- 替换字符串中的特定模式
- 根据字符串中的模式进行切割

而且通常要比不使用正则表达式时，代码要简单很多



利用一些新的特性（`\p{...}`  `matchAll()`, etc.），可以比以往更加方便地达到常见的目的：

- 匹配中文 `\p{Script=Han}`
- 匹配表情符号 `\p{Emoji}`
- 洗掉无效字符
- 全局匹配时，可以访问匹配组