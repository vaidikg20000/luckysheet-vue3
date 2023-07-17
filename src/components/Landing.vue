<template>
    <div class="landing-page">
      <div class="logo-container">
        <img src="https://ir.murphyoilcorp.com/sites/g/files/knoqqb75861/themes/site/nir_pid7774/dist/images/logo.png" alt="Company Logo" class="logo" />
      </div>
      <div class="info-container">
        <h1>Welcome to Our Demo</h1>
        <p>Short information about the demo goes here.</p>
      </div>
      <div style="text-align: center;">
        <h2>App Features</h2>
      </div>
      <div class="features-container">
        <ul>
            <li>Formatting: style, conditional formatting, text alignment and rotation, text truncation, overflow, automatic line wrapping, multiple data types, cell segmentation style</li>
          <li>Cells: drag and drop, fill handle, multiple selection, find and replace, location, merge cells, data verification</li>
          <li>Row & column: hide, insert, delete rows or columns, freeze, and split text</li>
          <li>Operation: undo, redo, copy, paste, cut, hot key, format painter, drag and drop selection</li>
          <li>Formulas & Functions: Built-in, remote and custom formulas</li>
          <li>Tables: filter, sort</li>
          <li>Enhanced functions: Pivot tables, charts, comments, cooperative editing, insert picture, matrix calculations, screenshots, copying to other formats, EXCEL import and export, etc.</li>
          <!-- Add more features as needed -->
        </ul>
      </div>
      <div style="text-align: center;">
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
    text-align: justify;
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
  