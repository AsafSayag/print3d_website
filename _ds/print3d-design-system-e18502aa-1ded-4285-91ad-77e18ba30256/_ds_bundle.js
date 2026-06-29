/* @ds-bundle: {"format":3,"namespace":"Print3DDesignSystem_e18502","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"LogoGrid","sourcePath":"components/core/LogoGrid.jsx"},{"name":"ProjectCard","sourcePath":"components/core/ProjectCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3d60009e90bc","components/core/Button.jsx":"2136210ddb84","components/core/Card.jsx":"ff101ae4189c","components/core/Eyebrow.jsx":"d806e7ca16a2","components/core/Input.jsx":"a4fe44cdae9c","components/core/LogoGrid.jsx":"6af1070ffeb4","components/core/ProjectCard.jsx":"81500e3454d3","ui_kits/website/About.jsx":"7c19b492eb4f","ui_kits/website/Clients.jsx":"b7a1089ab3f0","ui_kits/website/Header.jsx":"c43c76793dfb","ui_kits/website/Hero.jsx":"ccafbba281ee","ui_kits/website/Process.jsx":"bfb793525f43","ui_kits/website/ProjectGallery.jsx":"eaf20dac4f08","ui_kits/website/image-slot.js":"9309434cb09c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Print3DDesignSystem_e18502 = window.Print3DDesignSystem_e18502 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Print3D Badge — small caption-style tag. Quiet by default; `accent` outline
 * for the rare highlight. Sharp corners, never pill.
 */
function Badge({
  children,
  variant = 'default'
}) {
  const variants = {
    default: {
      color: 'var(--color-text-secondary)',
      borderColor: 'var(--border-strong)',
      background: 'transparent'
    },
    accent: {
      color: 'var(--color-accent)',
      borderColor: 'var(--color-accent-muted)',
      background: 'transparent'
    },
    solid: {
      color: 'var(--color-text-on-light)',
      borderColor: 'var(--color-cream)',
      background: 'var(--color-cream)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--text-caption-ls)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid',
      ...variants[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Print3D Button — sharp-cornered, letter-spaced caption-style label.
 * Accent color reserved for the primary CTA only.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  as = 'button',
  ...rest
}) {
  const pad = {
    sm: '10px 24px',
    md: '14px 32px',
    lg: '18px 44px'
  }[size];
  const fontSize = size === 'lg' ? '14px' : '13px';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xs)',
    padding: pad,
    fontFamily: 'var(--font-body)',
    fontSize,
    fontWeight: 'var(--weight-medium)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-light)',
      borderColor: 'var(--color-accent)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      borderColor: 'transparent'
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants[variant]
    },
    disabled: as === 'button' ? disabled : undefined,
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === 'primary') e.currentTarget.style.background = 'var(--color-accent-hover)';
      if (variant === 'secondary') e.currentTarget.style.borderColor = 'var(--color-accent)';
      if (variant === 'ghost') e.currentTarget.style.color = 'var(--color-text-primary)';
    },
    onMouseLeave: e => {
      if (disabled) return;
      e.currentTarget.style.background = variants[variant].background;
      e.currentTarget.style.borderColor = variants[variant].borderColor;
      e.currentTarget.style.color = variants[variant].color;
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Print3D Card — raised surface on dark, sharp 4px corners, subtle shadow.
 * Lifts on hover when `interactive`.
 */
function Card({
  children,
  interactive = false,
  padded = true,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: padded ? 'var(--space-lg)' : 0,
      boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow-subtle)',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'transform var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)',
      overflow: 'hidden',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/**
 * Print3D Eyebrow — caption-style section label. Often paired with a short
 * accent rule. The workhorse of the brand's "architectural studio" labelling.
 */
function Eyebrow({
  children,
  rule = true,
  color = 'accent'
}) {
  const textColor = color === 'accent' ? 'var(--color-accent)' : 'var(--color-text-secondary)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: textColor
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '32px',
      height: '1px',
      background: 'currentColor',
      opacity: 0.6
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Print3D Input — underline style, not boxed. Accent appears on focus only.
 */
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  id,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || (label ? `in-${label}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      letterSpacing: 'var(--text-caption-ls)',
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${focused ? 'var(--color-accent)' : 'var(--border-strong)'}`,
      padding: '10px 0',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-size)',
      color: 'var(--color-text-primary)',
      outline: 'none',
      transition: 'border-color var(--duration-fast) var(--ease-default)'
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/LogoGrid.jsx
try { (() => {
/**
 * Print3D LogoGrid — client logo wall. Grayscale + dimmed by default,
 * full colour on hover. Renders text wordmarks if no image src given.
 */
function LogoGrid({
  logos = [],
  columns = 4
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1px',
      background: 'var(--border-subtle)',
      border: '1px solid var(--border-subtle)'
    }
  }, logos.map((logo, i) => /*#__PURE__*/React.createElement(LogoCell, {
    key: i,
    logo: logo
  })));
}
function LogoCell({
  logo
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '120px',
      padding: 'var(--space-md)',
      background: 'var(--color-bg-primary)',
      filter: hover ? 'grayscale(0%) opacity(1)' : 'grayscale(100%) opacity(0.6)',
      transition: 'filter var(--duration-fast) var(--ease-default)'
    }
  }, logo.src ? /*#__PURE__*/React.createElement("img", {
    src: logo.src,
    alt: logo.name || '',
    style: {
      maxHeight: '40px',
      maxWidth: '100%',
      objectFit: 'contain'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-h3-size)',
      letterSpacing: '0.04em',
      color: 'var(--color-text-secondary)'
    }
  }, logo.name));
}
Object.assign(__ds_scope, { LogoGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LogoGrid.jsx", error: String((e && e.message) || e) }); }

// components/core/ProjectCard.jsx
try { (() => {
/**
 * Print3D ProjectCard — image-led tile for the architectural project gallery.
 * Flexible aspect-ratio, cover-fit image, caption-style meta, accent on hover.
 */
function ProjectCard({
  image,
  title,
  category,
  location,
  ratio = '4 / 5'
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      textDecoration: 'none',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-raised)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: hover ? 'none' : 'grayscale(20%)',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--duration-slow) var(--ease-default), filter var(--duration-base) var(--ease-default)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      letterSpacing: 'var(--text-caption-ls)',
      textTransform: 'uppercase',
      color: hover ? 'var(--color-accent)' : 'var(--color-text-secondary)',
      transition: 'color var(--duration-fast) var(--ease-default)',
      marginBottom: '8px'
    }
  }, category, location ? ` · ${location}` : ''), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-h3-size)',
      lineHeight: 'var(--text-h3-lh)',
      color: 'var(--color-text-primary)',
      margin: 0
    }
  }, title)));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
/* global React */
// About — intentional 7/5 asymmetric split (breaks the centered grid, as required).
function About({
  Eyebrow
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-desktop) var(--layout-margin)',
      background: 'var(--color-bg-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '7fr 5fr',
      gap: 'var(--space-3xl)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05D0\u05D5\u05D3\u05D5\u05EA \u05D4\u05E1\u05D8\u05D5\u05D3\u05D9\u05D5")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '42px',
      lineHeight: 1.2,
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-text-primary)',
      margin: '0 0 var(--space-md)',
      maxWidth: '20ch'
    }
  }, "\u05DB\u05DC \u05E4\u05E8\u05D5\u05D9\u05E7\u05D8 \u05DE\u05EA\u05D7\u05D9\u05DC \u05D1\u05E9\u05E8\u05D8\u05D5\u05D8. \u05D0\u05E0\u05D7\u05E0\u05D5 \u05E0\u05D5\u05EA\u05E0\u05D9\u05DD \u05DC\u05D5 \u05E0\u05E4\u05D7, \u05D7\u05D5\u05DE\u05E8 \u05D5\u05D0\u05D5\u05E8."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg-size)',
      lineHeight: 1.7,
      color: 'var(--color-text-secondary)',
      maxWidth: '54ch',
      margin: 0
    }
  }, "\u05D1\u05DE\u05E9\u05DA \u05DC\u05DE\u05E2\u05DC\u05D4 \u05DE\u05E2\u05E9\u05D5\u05E8 \u05D0\u05E0\u05D5 \u05DE\u05EA\u05E8\u05D2\u05DE\u05D9\u05DD \u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05D0\u05D3\u05E8\u05D9\u05DB\u05DC\u05D9\u05D5\u05EA \u05DC\u05D3\u05D2\u05DE\u05D9\u05DD \u05E4\u05D9\u05D6\u05D9\u05D9\u05DD \u05DE\u05D3\u05D5\u05D9\u05E7\u05D9\u05DD. \u05DB\u05DC \u05DE\u05D5\u05D3\u05DC \u05E0\u05D1\u05E0\u05D4 \u05D1\u05E2\u05D1\u05D5\u05D3\u05EA \u05D9\u05D3 \u05E2\u05DD \u05EA\u05E9\u05D5\u05DE\u05EA \u05DC\u05D1 \u05D0\u05D5\u05D1\u05E1\u05E1\u05D9\u05D1\u05D9\u05EA \u05DC\u05E4\u05E8\u05D5\u05E4\u05D5\u05E8\u05E6\u05D9\u05D4, \u05DC\u05D8\u05E7\u05E1\u05D8\u05D5\u05E8\u05D4 \u05D5\u05DC\u05EA\u05D0\u05D5\u05E8\u05D4 \u2014 \u05DB\u05DC\u05D9 \u05E9\u05DE\u05D0\u05E4\u05E9\u05E8 \u05DC\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DC\u05E8\u05D0\u05D5\u05EA, \u05DC\u05D2\u05E2\u05EA \u05D5\u05DC\u05DE\u05DB\u05D5\u05E8 \u05D0\u05EA \u05D4\u05D7\u05D6\u05D5\u05DF.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      borderInlineStart: '1px solid var(--border-subtle)',
      paddingInlineStart: 'var(--space-xl)'
    }
  }, [['250+', 'דגמים שנמסרו'], ['1:50', 'קנה מידה ממוצע'], ['12', 'שנות ניסיון']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: '52px',
      fontWeight: 'var(--weight-black)',
      color: 'var(--color-accent)',
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption-size)',
      letterSpacing: 'var(--text-caption-ls)',
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)',
      marginTop: '6px'
    }
  }, l))))));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Clients.jsx
try { (() => {
/* global React */
// Clients — two customer carousels. Each cell is a drag-and-drop image slot
// the team fills manually with a customer photo / logo.
function ClientCarousel({
  idPrefix,
  count
}) {
  const trackRef = React.useRef(null);
  const scrollBy = dir => {
    const el = trackRef.current;
    if (el) el.scrollBy({
      left: dir * 320,
      behavior: 'smooth'
    });
  };
  const arrowBtn = {
    width: '44px',
    height: '44px',
    flex: '0 0 auto',
    display: 'grid',
    placeItems: 'center',
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-secondary)',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)'
  };
  const onHover = (e, on) => {
    e.currentTarget.style.color = on ? 'var(--color-accent)' : 'var(--color-text-secondary)';
    e.currentTarget.style.borderColor = on ? 'var(--color-accent-muted)' : 'var(--border-subtle)';
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: arrowBtn,
    onMouseEnter: e => onHover(e, true),
    onMouseLeave: e => onHover(e, false),
    onClick: () => scrollBy(1),
    "aria-label": "\u05D4\u05E7\u05D5\u05D3\u05DD"
  }, "\u203A"), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    style: {
      display: 'flex',
      gap: 'var(--space-md)',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      padding: '4px',
      flex: 1,
      scrollbarWidth: 'none'
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("image-slot", {
    key: i,
    id: `${idPrefix}-${i + 1}`,
    shape: "rounded",
    radius: "16",
    placeholder: "\u05DC\u05E7\u05D5\u05D7",
    style: {
      flex: '0 0 auto',
      width: '210px',
      height: '120px',
      scrollSnapAlign: 'center',
      background: 'var(--color-bg-secondary)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)'
    }
  }))), /*#__PURE__*/React.createElement("button", {
    style: arrowBtn,
    onMouseEnter: e => onHover(e, true),
    onMouseLeave: e => onHover(e, false),
    onClick: () => scrollBy(-1),
    "aria-label": "\u05D4\u05D1\u05D0"
  }, "\u2039"));
}
function Clients({
  Eyebrow
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-desktop) var(--layout-margin)',
      background: 'var(--color-bg-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      marginBottom: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    rule: false
  }, "\u05D4\u05DD \u05D1\u05D5\u05D8\u05D7\u05D9\u05DD \u05D1\u05E0\u05D5"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(ClientCarousel, {
    idPrefix: "client-row-1",
    count: 8
  }), /*#__PURE__*/React.createElement(ClientCarousel, {
    idPrefix: "client-row-2",
    count: 8
  })));
}
window.Clients = Clients;

// ContactCTA — final invitation with underline inputs and one bronze button.
function ContactCTA({
  Eyebrow,
  Input,
  Button
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-desktop) var(--layout-margin)',
      background: 'var(--color-bg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 'var(--space-3xl)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '40px',
      lineHeight: 1.2,
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-text-primary)',
      margin: '0 0 var(--space-md)'
    }
  }, "\u05D1\u05D5\u05D0\u05D5 \u05E0\u05D1\u05E0\u05D4 \u05D0\u05EA \u05D4\u05D3\u05D2\u05DD \u05D4\u05D1\u05D0 \u05E9\u05DC\u05DB\u05DD."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-size)',
      lineHeight: 1.7,
      color: 'var(--color-text-secondary)',
      maxWidth: '40ch',
      margin: 0
    }
  }, "\u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05E4\u05E8\u05D8\u05D9\u05DD \u05D5\u05E0\u05D7\u05D6\u05D5\u05E8 \u05D0\u05DC\u05D9\u05DB\u05DD \u05EA\u05D5\u05DA \u05D9\u05D5\u05DD \u05E2\u05E1\u05E7\u05D9\u05DD \u05E2\u05DD \u05D4\u05E6\u05E2\u05EA \u05DE\u05D7\u05D9\u05E8 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D9\u05EA.")), /*#__PURE__*/React.createElement("form", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-lg)'
    },
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u05E9\u05DD \u05DE\u05DC\u05D0",
    placeholder: "\u05D4\u05E7\u05DC\u05D9\u05D3\u05D5 \u05E9\u05DD"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05D8\u05DC\u05E4\u05D5\u05DF",
    placeholder: "050-0000000"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC",
    type: "email",
    placeholder: "name@studio.co.il"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05E1\u05D5\u05D2 \u05E4\u05E8\u05D5\u05D9\u05E7\u05D8",
    placeholder: "\u05DE\u05D2\u05D5\u05E8\u05D9\u05DD / \u05DE\u05E1\u05D7\u05E8 / \u05E6\u05D9\u05D1\u05D5\u05E8\u05D9"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u05D4\u05D5\u05D3\u05E2\u05D4",
    placeholder: "\u05E1\u05E4\u05E8\u05D5 \u05DC\u05E0\u05D5 \u05E2\u05DC \u05D4\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      marginTop: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "\u05E9\u05DC\u05D9\u05D7\u05EA \u05E4\u05E0\u05D9\u05D9\u05D4")))));
}
window.ContactCTA = ContactCTA;

// Footer
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: 'var(--space-xl) var(--layout-margin)',
      background: 'var(--color-bg-primary)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-print3d-transparent.png",
    alt: "Print3D",
    style: {
      height: '46px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      letterSpacing: '0.04em',
      color: 'var(--color-text-secondary)'
    }
  }, "\xA9 2026 Print3D \xB7 Architectural Modeling \xB7 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1"));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Clients.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* global React */
// Print3D marketing site — sticky header with logo + RTL nav.
function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('[data-scroll-root]') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setScrolled(y > 40);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['בית', 'אודות', 'פרויקטים', 'תהליך', 'צור קשר'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--layout-margin)',
      height: '84px',
      background: 'transparent',
      backdropFilter: scrolled ? 'blur(6px)' : 'none',
      borderBottom: '1px solid transparent',
      transition: 'backdrop-filter var(--duration-fast) var(--ease-default)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-print3d-transparent.png",
    alt: "Print3D",
    style: {
      height: '56px',
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-xs)'
    }
  }, links.map((l, i) => {
    const isCta = i === links.length - 1;
    const isActive = i === 0;
    const base = {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 'var(--weight-medium)',
      textDecoration: 'none',
      padding: '10px 18px',
      borderRadius: 'var(--radius-sm)',
      transition: 'background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)',
      whiteSpace: 'nowrap'
    };
    const cta = {
      ...base,
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-light)',
      border: '1px solid var(--color-accent)'
    };
    const link = {
      ...base,
      background: isActive ? 'rgba(245,242,236,0.10)' : 'transparent',
      color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
      border: '1px solid transparent'
    };
    return /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: isCta ? cta : link,
      onMouseEnter: e => {
        if (isCta) {
          e.currentTarget.style.background = 'var(--color-accent-hover)';
          e.currentTarget.style.borderColor = 'var(--color-accent-hover)';
        } else {
          e.currentTarget.style.background = 'rgba(245,242,236,0.12)';
          e.currentTarget.style.color = 'var(--color-accent)';
        }
      },
      onMouseLeave: e => {
        if (isCta) {
          e.currentTarget.style.background = 'var(--color-accent)';
          e.currentTarget.style.borderColor = 'var(--color-accent)';
        } else {
          e.currentTarget.style.background = isActive ? 'rgba(245,242,236,0.10)' : 'transparent';
          e.currentTarget.style.color = isActive ? 'var(--color-accent)' : 'var(--color-text-primary)';
        }
      }
    }, l);
  })));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React */
// Hero — full-bleed architectural image, oversized headline, single bronze CTA.
function Hero({
  Button,
  Eyebrow
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      marginTop: '-84px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=80",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(30%) brightness(0.55)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(14,14,15,0.7) 0%, rgba(14,14,15,0.15) 40%, rgba(14,14,15,0.9) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: '1100px',
      margin: '0 var(--layout-margin) var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(14,14,15,0.32)',
      backdropFilter: 'blur(8px)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05E1\u05D8\u05D5\u05D3\u05D9\u05D5 \u05DC\u05D3\u05D2\u05DE\u05D9\u05DD \u05D0\u05D3\u05E8\u05D9\u05DB\u05DC\u05D9\u05D9\u05DD")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--text-hero-size)',
      lineHeight: 'var(--text-hero-lh)',
      letterSpacing: 'var(--text-hero-ls)',
      fontWeight: 'var(--weight-black)',
      color: 'var(--color-text-primary)',
      margin: '0 0 var(--space-md)',
      textWrap: 'balance'
    }
  }, "\u05D4\u05D5\u05E4\u05DB\u05D9\u05DD \u05EA\u05DB\u05E0\u05D5\u05DF", /*#__PURE__*/React.createElement("br", null), "\u05DC\u05DE\u05D5\u05D3\u05DC \u05E4\u05D9\u05D6\u05D9 \u05DE\u05D3\u05D5\u05D9\u05E7."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-lg-size)',
      lineHeight: 'var(--text-body-lg-lh)',
      color: 'var(--color-text-secondary)',
      maxWidth: '52ch',
      margin: '0 0 var(--space-lg)'
    }
  }, "\u05D9\u05D9\u05E6\u05D5\u05E8 \u05D3\u05D2\u05DE\u05D9\u05DD \u05D0\u05D3\u05E8\u05D9\u05DB\u05DC\u05D9\u05D9\u05DD \u05D1\u05E7\u05E0\u05D4 \u05DE\u05D9\u05D3\u05D4 \u05E2\u05D1\u05D5\u05E8 \u05DE\u05E9\u05E8\u05D3\u05D9 \u05D0\u05D3\u05E8\u05D9\u05DB\u05DC\u05D9\u05DD, \u05D9\u05D6\u05DE\u05D9\u05DD \u05D5\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD \u05E9\u05DC \u05E0\u05D3\u05DC\u05F4\u05DF \u05D9\u05D5\u05E7\u05E8\u05D4 \u2014 \u05D1\u05E0\u05D5\u05D9\u05D9\u05DD \u05D1\u05D9\u05D3, \u05E2\u05DD \u05D7\u05D5\u05DE\u05E8\u05D9\u05DD \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D9\u05DD \u05D5\u05EA\u05D0\u05D5\u05E8\u05D4 \u05DE\u05E9\u05D5\u05DC\u05D1\u05EA."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "\u05E7\u05D1\u05E2\u05D5 \u05E4\u05D2\u05D9\u05E9\u05D4"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "\u05D4\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD \u05E9\u05DC\u05E0\u05D5")))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Process.jsx
try { (() => {
/* global React */
// Process — numbered steps on cream (light section), inverted text.
function Process({
  Eyebrow
}) {
  const steps = [['01', 'תכנון', 'קבלת קבצי האדריכלות, הגדרת קנה מידה, חומרים ולוחות זמנים.'], ['02', 'בנייה', 'חיתוך לייזר, הרכבה ידנית, גימור ושילוב תאורה פנימית.'], ['03', 'מסירה', 'בקרת איכות, ארגז תצוגה מותאם ומשלוח עד הדלת.']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-desktop) var(--layout-margin)',
      background: 'var(--color-cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "muted"
  }, "\u05D0\u05D9\u05DA \u05D6\u05D4 \u05E2\u05D5\u05D1\u05D3")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--text-h1-size)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--text-h1-ls)',
      color: 'var(--color-text-on-light)',
      margin: 0
    }
  }, "\u05E9\u05DC\u05D5\u05E9\u05D4 \u05E9\u05DC\u05D1\u05D9\u05DD, \u05DE\u05D4\u05E9\u05E8\u05D8\u05D5\u05D8 \u05DC\u05DE\u05D5\u05D3\u05DC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-lg)'
    }
  }, steps.map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      borderTop: '1px solid rgba(14,14,15,0.18)',
      paddingTop: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: '20px',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-accent-muted)',
      marginBottom: 'var(--space-md)'
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--text-h3-size)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-text-on-light)',
      margin: '0 0 10px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-size)',
      lineHeight: 1.6,
      color: '#5A5853',
      margin: 0,
      maxWidth: '32ch'
    }
  }, d)))));
}
window.Process = Process;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Process.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProjectGallery.jsx
try { (() => {
/* global React */
// ProjectGallery — asymmetric masonry of project tiles on cream-edged dark.
function ProjectGallery({
  Eyebrow,
  ProjectCard
}) {
  const projects = [{
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    category: 'מגורים',
    location: 'הרצליה פיתוח',
    title: 'וילה פרטית',
    ratio: '4 / 5'
  }, {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    category: 'מסחר',
    location: 'תל אביב',
    title: 'מגדל משרדים',
    ratio: '4 / 5'
  }, {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
    category: 'מגורים',
    location: 'רמת השרון',
    title: 'מתחם בוטיק',
    ratio: '4 / 5'
  }, {
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80',
    category: 'ציבורי',
    location: 'ירושלים',
    title: 'מרכז תרבות',
    ratio: '4 / 5'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-desktop) var(--layout-margin)',
      background: 'var(--color-bg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05E0\u05D1\u05D7\u05E8\u05EA \u05E2\u05D1\u05D5\u05D3\u05D5\u05EA")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--text-h1-size)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--text-h1-ls)',
      color: 'var(--color-text-primary)',
      margin: 0
    }
  }, "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D9\u05DD")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-caption-size)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--color-accent)',
      textDecoration: 'none'
    }
  }, "\u2190 \u05DC\u05DB\u05DC \u05D4\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-md)'
    }
  }, projects.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginTop: i % 2 === 1 ? 'var(--space-xl)' : 0
    }
  }, /*#__PURE__*/React.createElement(ProjectCard, p)))));
}
window.ProjectGallery = ProjectGallery;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProjectGallery.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.LogoGrid = __ds_scope.LogoGrid;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

})();
