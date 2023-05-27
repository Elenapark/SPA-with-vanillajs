export default function NotFound404({ $target }) {
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = `
      <main>페이지를 찾을 수 없습니다!</main>
    `;
  };
}
