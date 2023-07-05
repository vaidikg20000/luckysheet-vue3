<template>
    <div class="landing-page">
      <div class="logo-container">
        <img src="https://ir.murphyoilcorp.com/sites/g/files/knoqqb75861/themes/site/nir_pid7774/dist/images/logo.png" alt="Company Logo" class="logo" />
      </div>
      <div class="info">
        <h1>Welcome to our Demo</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
        <button @click="startDemo">Start Demo</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startDemo() {
        this.$router.push('/main-screen');
      }
    }
  }
  </script>
  
  <style>
  .landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  .logo-container {
    margin-bottom: 20px;
  }
  
  .logo {
    width: 100px;
    height: 100px;
  }
  
  .info {
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>