export function Pagination({ total, limit, currentPage }) {
  return `
  <div class="pagination">
    ${Array.from({ length: Math.ceil(total / limit) })
      .fill(0)
      .map((_, idx) => {
        const page = idx + 1;
        const isActive = page === currentPage;
        return `
        <button 
          class="btn-page ${isActive ? "is_active" : ""}" 
          data-page="${page}"
        >
          ${page}
        </button>
        `;
      })
      .join("")}
  </div>
  `;
}
