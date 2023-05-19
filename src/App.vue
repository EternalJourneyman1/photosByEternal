<template>
  <div id="app">
    <div id="nav">
      <div id="branding">
        <img alt="Photos By Eternal logo" src="./assets/logo.png">
        <h1>PHOTOS BY ETERNAL</h1>
      </div>
      <div id="back-button-container">
        <router-link v-if="$route.name === 'ImageDetails'" to="/" id="back-button" data-testid="back-button">Back
        </router-link>
      </div>
    </div>
    <div id="content">
      <router-view/>
    </div>
    <div id="footer">
      <div class="footer-content">
        <div class="copyright">
          © 2023 Photos By Eternal
        </div>
<!--        <div class="links">-->
<!--          <router-link to="/contact">Contact</router-link>-->
<!--        </div>-->
        <div class="social-media">

          <a href="https://instagram.com/photosbyeternal"
                                               target="_blank">Instagram</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}

#nav img {
  width: 100px;
  height: 100px;
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  background-color: black;
}

#branding h1 {
  margin-left: 10px;
}


#nav a {
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
}

#branding {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

#back-button-container {
  margin-right: 20px;
}

#back-button {
  font-weight: bold;
  background-color: #42b983;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
}

#back-button:hover {
  background-color: #368b6d;
}

#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: black;
  height: 100px;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.copyright, .links, .social-media {
  color: #2c3e50;
}

.social-media a {
  color: #2c3e50;
  /*margin-left: 10px;*/
  padding-right: 10px;
  text-decoration: none;
}

.social-media a:hover {
  color: #42b983; /* Change color on hover */
}

@media screen and (max-width: 369px) {
  #branding {
    flex-direction: column;
    margin-left: 0px;
  }

  #nav {
    flex-direction: column;
  }

  #back-button-container {
    margin-top: 10px;
    margin-right: 0;
    align-self: flex-end;
  }

  #branding h1 {
    margin-left: 0;
    margin-top: 10px;
  }

  #nav a {
    margin-left: 0;
    margin-top: 10px;
  }

  #footer {
    flex-direction: column; /* Stack footer items vertically on small screens */
    padding: 10px 0; /* Adjust padding as needed */
  }

  .footer-content {
    flex-direction: column; /* Stack footer content vertically */
    align-items: center; /* Align items to center */
  }

  .copyright, .links, .social-media {
    margin-bottom: 10px; /* Add space between items */
  }

  .social-media a {
    margin-left: 0; /* Remove left margin */
    margin-top: 10px;
  }
}
</style>
