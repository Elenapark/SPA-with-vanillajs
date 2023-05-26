export function Select({ options, selectedValue }) {
  return `
  <select>
  ${options
    .map(
      ({ value, label }) =>
        `<option 
          value="${value}" 
          ${value === selectedValue ? "selected" : ""}
        >
          ${label ?? value}
        </option>`
    )
    .join("")}
  </select>
  `;
}
