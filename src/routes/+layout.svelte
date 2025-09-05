<nav class="nav">
  <div class="wrap">
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/skills">Skills</a>
    <div class="courses">
      <span>Courses:</span>
      <a href="/courses/csp/units/03-algorithms-programming">CSP</a>
      <a href="/courses/csa/units/06-arrays">CSA</a>
    </div>
    <a href="/shared/guides">Guides</a>
    <a href="/archive">Archive</a>
  </div>
</nav>

<slot></slot>

<style>
  .nav {
    border-bottom: 1px solid #ddd;
  }
  .wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 12px 16px;
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
  }
  .wrap a {
    text-decoration: none;
    color: inherit;
  }
  .wrap a:hover {
    text-decoration: underline;
  }
  .courses {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-left: 8px;
  }
</style>
