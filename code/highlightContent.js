// 根据用户输入 keyword，高亮文本 str 中对应的关键词，keyword 可能由多个关键词组成，通过空格分隔，例如「红包 退款」，「退货   失败」
function highlightContent(str, keyword) {
  keyword = keyword.replace(/\s+/g, () => " ");
  const reg = new RegExp(keyword.split(/\s+/).join("|"), "g");
  str = str.replace(reg, '<span class="highlight">$&</span>');
  return str;
}
console.log(highlightContent("我要红包，我不要退款", "红包  退款"));