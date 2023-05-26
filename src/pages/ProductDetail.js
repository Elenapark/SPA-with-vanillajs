export default function ProductDetail({ $target }) {
  this.$container = document.createElement("div");

  this.template = function () {
    return `
      <div>디떼일</div>
    `;
  };

  this.render = () => {
    $target.innerHTML = "";
    this.$container.innerHTML = this.template();
    $target.appendChild(this.$container);
  };

  this.render();
}
