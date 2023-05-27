export function Pagination({ total, limit, currentPage }) {
  return `
  <div class="pagination">
    ${Array.from({ length: Math.ceil(total / limit) })
      .fill(0)
      .map(
        (_, idx) =>
          `<button class="btn-page" data-page="${idx + 1}">${idx + 1}</button>`
      )
      .join("")}
  </div>
  `;
}
