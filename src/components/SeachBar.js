export function SearchBar({ q, total }) {
  return `
  <form class="form-search">
    <input name="query" />
    <button class="btn-submit" type="submit" >
      검색!
    </button>
  </form>
  ${
    q
      ? `<div>
          <p>
            ${q} 의 검색결과 ${total}개
            <button type="button" class="btn-delete">X</button>
          </p>
        </div>
        `
      : ""
  }
  `;
}
