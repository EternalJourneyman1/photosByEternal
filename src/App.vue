<template>
  <div id="app">
    <div id="nav">
      <div id="branding">
        <img alt="Photos By Eternal logo" src="./assets/logo.png">
        <h1>PHOTOS BY ETERNAL</h1>
      </div>
      <router-link v-if="$route.name === 'ImageDetails'" to="/" id="back-button" data-testid="back-button">Back
      </router-link>
    </div>
    <div id="content">
      <router-view/>
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
  z-index: 9999;
  background-color: black;
}

#branding {
  display: flex;
  align-items: center;
}

#back-button {
  font-weight: bold;
  background-color: #42b983;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}

#back-button:hover {
  background-color: #368b6d;
  color: #2c3e50;
}

#back-button:focus {
  outline: none;
}


@media screen and (max-width: 369px) {
  #branding {
    flex-direction: column;
  }

  #nav {
    display: flex;
    flex-direction: column;
  }

}

#branding h1 {
  margin-left: 10px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
}

</style>