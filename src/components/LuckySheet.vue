<template>
  <div class="container">
    <div class="toolbar">
      <div class="logo-container">
        <img
          src="https://ir.murphyoilcorp.com/sites/g/files/knoqqb75861/themes/site/nir_pid7774/dist/images/logo.png"
          alt="Logo"
          class="logo"
        />
      </div>
      <div class="centered-elements">
        <select
          v-model="selectedVersion"
          @change="selectVersion"
          class="styled-select"
        >
          <option disabled value="">Choose Version</option>
          <option v-for="ver in versions" :key="ver.text" :value="ver.value">
            {{ ver.text }}
          </option>
        </select>
        <button @click="postData">Save</button>
        <label for="uploadBtn" class="file-label">
          Choose File
          <input id="uploadBtn" type="file" @change="loadExcel" />
        </label>
        <span v-for="rowVal in rowFind">{{ rowVal }} </span>
        <button>
          <a href="javascript:void(0)" @click="downloadExcel"
            >Download source xlsx file</a
          >
        </button>
        <div class="dropdown-container">
          <input
            v-model="searchValue"
            @input="search"
            placeholder="Search..."
          />
          <ul v-show="showDropdown" class="dropdown-options">
            <li
              v-for="option in computedSearchOptions"
              :key="option.id"
              @click="selectOption(option)"
            >
              {{ option.text }}
            </li>
          </ul>
          <!-- Rest of your component content -->
        </div>
      </div>
    </div>
  </div>
  <div id="luckysheet"></div>
  <div v-show="isMaskShow" id="tip">Downloading</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { exportExcel } from "../utils/export";
import { isFunction } from "../utils/is";
import LuckyExcel from "luckyexcel";
import { sampleData } from "../utils/sampleData";
import axios from "axios";
import moment from "moment";

const sheetData = ref([]);
const fetchedData = ref([]);
const rowFind = ref([]);
const isMaskShow = ref(false);
const selected = ref("");
const selectedVersion = ref("");
const searchData = ref([]);
const searchOptions = ref([]);
const searchValue = ref("");
const jsonData = ref({});
const options = ref([
  {
    text: "Money Manager.xlsx",
    value: "https://minio.cnbabylon.com/public/luckysheet/money-manager-2.xlsx",
  },
  {
    text: "Activity costs tracker.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Activity%20costs%20tracker.xlsx",
  },
  {
    text: "House cleaning checklist.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/House%20cleaning%20checklist.xlsx",
  },
  {
    text: "Student assignment planner.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Student%20assignment%20planner.xlsx",
  },
  {
    text: "Credit card tracker.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Credit%20card%20tracker.xlsx",
  },
  {
    text: "Blue timesheet.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Blue%20timesheet.xlsx",
  },
  {
    text: "Student calendar (Mon).xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Student%20calendar%20%28Mon%29.xlsx",
  },
  {
    text: "Blue mileage and expense report.xlsx",
    value:
      "https://minio.cnbabylon.com/public/luckysheet/Blue%20mileage%20and%20expense%20report.xlsx",
  },
]);
const versions = ref([
  {
    text: "File saved on 2023-07-04",
    value: "2023-07-04",
  },
  {
    text: "File Saved on 2023-07-05",
    value: "2023-07-05",
  },
]);

const loadExcel = (evt) => {
  const files = evt.target.files;
  if (files == null || files.length == 0) {
    alert("No files wait for import");
    return;
  }

  let name = files[0].name;
  let suffixArr = name.split("."),
    suffix = suffixArr[suffixArr.length - 1];
  if (suffix != "xlsx") {
    alert("Currently only supports the import of xlsx files");
    return;
  }
  LuckyExcel.transformExcelToLucky(
    files[0],
    function (exportJson, luckysheetfile) {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          "Failed to read the content of the excel file, currently does not support xls files!"
        );
        return;
      }
      console.log("exportJson", exportJson);
      jsonData.value = exportJson;

      isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy();

      window.luckysheet.create({
        container: "luckysheet", //luckysheet is the container id
        showinfobar: false,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      });
    }
  );
};
const selectExcel = (evt) => {
  const value = selected.value;
  const name = evt.target.options[evt.target.selectedIndex].innerText;

  if (value == "") {
    return;
  }
  isMaskShow.value = true;

  LuckyExcel.transformExcelToLuckyByUrl(
    value,
    name,
    (exportJson, luckysheetfile) => {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          "Failed to read the content of the excel file, currently does not support xls files!"
        );
        return;
      }
      console.log("exportJson", exportJson);
      jsonData.value = exportJson;

      isMaskShow.value = false;

      isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy();

      window.luckysheet.create({
        container: "luckysheet", //luckysheet is the container id
        showinfobar: false,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      });
    }
  );
};
const downloadExcel = () => {
  // const value = selected.value;;
  //
  // if(value.length==0){
  //     alert("Please select a demo file");
  //     return;
  // }
  //
  // var elemIF = document.getElementById("Lucky-download-frame");
  // if(elemIF==null){
  //     elemIF = document.createElement("iframe");
  //     elemIF.style.display = "none";
  //     elemIF.id = "Lucky-download-frame";
  //     document.body.appendChild(elemIF);
  // }
  // elemIF.src = value;
  exportExcel(luckysheet.getAllSheets(), "Murphy_Excel");
};


const postData = () => {
  console.log(luckysheet.getAllSheets());
  let postData = {
    fileName: "example.xlsx",
    dataArray: luckysheet.getAllSheets()
  };
  console.log(postData);
  axios
    .post("http://localhost:5000/data", postData)
    .then((response) => {
      console.log(response.data);
      // Handle successful response
      // getData();
      luckysheet.create({
        container: "luckysheet",
        showinfobar: false,
        data: postData.dataArray,
      });
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
};


const getData = () => {
  axios
    .get("http://localhost:5000/data")
    .then((response) => {
      let newData = [];
      let checkLength = response.data.length;
      newData = response.data[checkLength - 1].dataArray;
      console.log(response.data[checkLength - 1].dataArray, "suiii");
      const datesArray = response.data.map((obj) => {
        // const date = new Date(obj.timestamp);
        // console.log(obj.timestamp.substring(0,9),'ffff');
        // return obj.timestamp;
        return {
          text: `${obj.fileName} saved on ${moment(obj.timestamp).calendar()}`,
          value: obj.timestamp,
        };
      });
      console.log(datesArray, "dates");
      // const convertedArray = datesArray.map((date) => {
      //   return {
      //     text: `File saved on ${moment(date).calendar()}`,
      //     value: date,
      //   };
      // });
      versions.value = datesArray;
      console.log(versions.value, "dates moment");
      luckysheet.create({
        container: "luckysheet",
        showinfobar: false,
        data: newData,
      });
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
};

// const search = () => {
//   const encodedValue = encodeURIComponent(searchValue.value);
//   // console.log(encodedValue,'encode');
//   axios
//     .get(`http://localhost:5000/search?value=${encodedValue}`)
//     .then((response) => {
//       const datesArray = response.data.map((obj) => {
//         return {
//           id: obj._id, // the id field is named '_id' in your MongoDB collection
//           timestamp: obj.timestamp,
//         };
//       });

//       console.log(datesArray, "dates");

//       const convertedArray = datesArray.map((dateObj) => {
//         return {
//           text: `Found in version saved on ${moment(
//             dateObj.timestamp
//           ).calendar()}`,
//           value: dateObj.timestamp,
//           id: dateObj.id,
//         };
//       });

//       console.log(convertedArray, "con array");
//       searchOptions.value = convertedArray;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const search = () => {
  const encodedValue = encodeURIComponent(searchValue.value);

  axios
    .get(`http://localhost:5000/search?value=${encodedValue}`)
    .then((response) => {
      searchData.value = response.data.map((record) => ({
        id: record._id,
        timestamp: record.timestamp,
        fileName: record.fileName,
      }));
      const f = searchData.value;
      console.log(f, "f");
      // console.log(response.data);
      // Handle successful response
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
};

const computedSearchOptions = computed(() => {
  const xy = searchData.value.map((record) => ({
    id: record.id,
    value: record.timestamp,
    text: `Present in ${record.fileName} saved on ${moment(record.timestamp).calendar()}`,
  }));
  console.log(xy, "xy");
  return searchData.value.map((record) => ({
    id: record.id,
    value: record.timestamp,
    text: `Present in ${record.fileName} saved on ${moment(record.timestamp).calendar()}`,
  }));
});

const datalistId = `searchOptions_${Date.now()}`; // Generate a unique ID for the datalist

const selectVersion = () => {
  console.log(selectedVersion.value, "this version");
  axios
    .get(`http://localhost:5000/data/${selectedVersion.value}`)
    .then((response) => {
      let newData = [];
      let version = selectedVersion.value;
      response.data.forEach((element) => {
        // console.log(version, 'asdasdwohhooo' , element.timestamp);
        if (version === element.timestamp) {
          // newData.push(element.dataArray[0]);
          newData = element.dataArray;
        }
        // console.log(newData,"newData");
      });
      sheetData.value = newData;
      luckysheet.create({
        container: "luckysheet",
        showinfobar: false,
        data: newData,
      });
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
};

// !!! create luckysheet after mounted
onMounted(() => {
  getData();
  // luckysheet.create({
  //   container: "luckysheet",
  //   showinfobar: false,
  //   data: sampleData,
  // });
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  display: block !important;
  z-index: 100;
}

.dropdown-options li {
  padding: 8px;
  cursor: pointer;
}

.dropdown-options li:hover {
  background-color: #f2f2f2;
}
/* .toolbar-wrapper {
  position: relative;
  z-index: 1;
  border-bottom: 2px solid #ccc;
} */
.logo-container {
  margin: 0 15px 5px 0;
}

.logo {
  height: 50px;
}

.centered-elements {
  display: flex;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
  /* border-bottom: 2px solid #ccc; */
}
.toolbar {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
}

button {
  margin: 0 10px 1px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}
a {
  text-decoration: none;
  color: white;
}
#luckysheet {
  margin-top: 40px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 30px;
  bottom: 0px;
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.file-label {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}

.file-label:hover {
  background-color: #45a049;
}

.file-label input[type="file"] {
  display: none;
}

.styled-select {
  appearance: none;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

.styled-select:hover {
  background-color: #e5e5e5;
}

.styled-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
