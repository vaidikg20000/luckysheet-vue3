<template>
    <div class="landing-page">
      <div class="logo-container">
        <img src="https://ir.murphyoilcorp.com/sites/g/files/knoqqb75861/themes/site/nir_pid7774/dist/images/logo.png" alt="Company Logo" class="logo" />
      </div>
      <div class="info-container">
        <h1>Welcome to Our Demo</h1>
        <p>Short information about the demo goes here.</p>
      </div>
      <div class="features-container">
        <h2>App Features</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          <!-- Add more features as needed -->
        </ul>
      <button class="demo-button" @click="startDemo">Start Demo</button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  methods: {
    startDemo() {
      // Perform any necessary logic or redirection here
      // For example:
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  .demo-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

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
    width: 150px;
    height: 150px;
  }
  
  .info-container {
    text-align: center;
    /* margin-bottom: 15px; */
  }
  
  .features-container {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .start-demo-button {
    margin-bottom: 30px;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  /* Rest of your CSS styles */
  </style>
  