<template>
  <!-- https://bootstrapious.com/tutorial/sidebar/index5.html -->
  <div id="app" class="wrapper">
    <!-- Sidebar Holder -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>
          <router-link to="/">MusaicBox</router-link>
        </h3>
      </div>

      <ul class="list-unstyled components">
        <!-- p>Dummy Heading</p-->
        <li class="active">
          <router-link to="/">Interactive</router-link>
        </li>
        <li>
          <router-link to="/group">Group & Action Explorer</router-link>
        </li>
        <!-- li>
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >Predefined</a>
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              <router-link to="#">Chords</router-link>
            </li>
            <li>
              <router-link to="#">Scales</router-link>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >Others</a>
              <ul class="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Page 1</a>
                </li>
                <li>
                  <a href="#">Page 2</a>
                </li>
                <li>
                  <a href="#">Page 3</a>
                </li>
              </ul>
            </li>
          </ul>
        </li -->
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>

    <!-- Page Content Holder -->
    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button type="button" id="sidebarCollapse" class="navbar-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button
            class="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-align-justify"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="http://88musaics.org">
                  <span style="font-style: italic; font-size: small;">from 88musaics.org</span>
                </a>
              </li>
              <!--
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
              -->
            </ul>
          </div>
        </div>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  mounted: function () {
      document.getElementById("sidebarCollapse").onclick = function (e) {
        e.preventDefault();
        document.getElementById("sidebar").classList.toggle("active");
        document.getElementById("sidebarCollapse").classList.toggle("active");
      }
  }
}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
