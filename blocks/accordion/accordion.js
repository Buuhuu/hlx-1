// ../jsx-runtime/src/jsx-runtime.js
function appendChildren(element, children) {
  children && (Array.isArray(children) ? children : [children]).forEach((child) => {
    typeof child === "object" ? element.appendChild(child) : element.appendChild(document.createTextNode(child));
  });
  return element;
}
function jsx(tag, props) {
  if (tag.constructor === String) {
    const element = appendChildren(document.createElement(tag), props.children);
    Object.keys(props).forEach((attribute) => {
      if (attribute === "children")
        return;
      attribute === "style" ? Object.keys(props[attribute]).forEach((styleAttribute) => element.style[styleAttribute] = props[attribute][styleAttribute]) : element[attribute] = props[attribute];
    });
    return element;
  }
  return tag(props);
}
var jsxs = jsx;

// blocks/accordion/accordion.jsx
function AccordionItem({ heading, elements }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "accordion__item",
    children: [
      /* @__PURE__ */ jsx("h3", {
        className: "accordion__item-heading",
        children: heading
      }),
      /* @__PURE__ */ jsx("div", {
        className: "accordion__item-container",
        children: elements
      })
    ]
  });
}
function Accordion({ pannels }) {
  return /* @__PURE__ */ jsx("div", {
    className: "accordion__root",
    children: pannels.map((props) => /* @__PURE__ */ jsx(AccordionItem, {
      ...props
    }))
  });
}
function decorate(block) {
  const pannels = [...block.children].map((child) => ({
    heading: child.querySelector("strong").textContent,
    elements: [...child.children]
  }));
  block.replaceWith(/* @__PURE__ */ jsx(Accordion, {
    pannels
  }));
}
export {
  decorate as default
};
