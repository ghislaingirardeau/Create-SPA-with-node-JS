export const footerGlobal = () => {
  const templateFooter = document
    .getElementById("templateFooterGlobal")
    .cloneNode(true);
  return `${templateFooter.innerHTML}`;
};
