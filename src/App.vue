<template>
  <div>
    <router-view></router-view>
  </div>
  <div style="position: fixed; bottom: 20px; right: 20px"><a href="https://Cogilabs.eu/"><img src="https://Cogilabs.eu/Images/Cogilabs-long-contour-wh-notxt.svg" alt="The Cogilabs logo" height="50"></a></div>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: goldenrod; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: darkgoldenrod; 
}

@media only screen and (max-width: 600px) {
  /* Hide scrollbar for Chrome, Safari and Opera */
  body::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}
</style>