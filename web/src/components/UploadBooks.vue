<template>
  <div class="uploadBooks" style="text-aling:center">
    <form action="#">
    
        <div class="container ">
          <div class="row">
            <div class="file-field input-field">
              <input type="file" name="files" multiple @change="selectFile" accept=".pdf">
              <div class="file-path-wrapper">
              </div>
            <div class="col-12 divImportFiles contentMiddle">
                import file
            </div>

          </div>
            <div class="divFiles">

              <ul class="collection with-header" style="text-aling:center">
                <li class="collection-item" :key="index"  v-for="(file, index) in files">{{file.name}}<a href="#!" class="secondary-content" v-on:click="removeFile(index)"><i class="material-icons">delete</i></a></li>
              </ul>
              <div class="contentMiddle">
                <a class="waves-effect waves-light btn-small" @click="submitBooks()" :disabled="files.length == 0">Upload Files</a>
              </div>
            </div>
        </div>
      
    </div>
  </form>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  
  name: 'UploadBooks',
  data () {
    return {
      files: [],
      progress: 0,
      message: '',

      fileInfos: []
    }
  },
  methods: {
    selectFile (event) {
      for (var [key, value] of Object.entries(event.target.files)) {
          this.files.push(value)
      }
    },
    removeFile(indexFile){
      this.files.splice(indexFile,1)
    },
    ssubmitBooks(){
      let formData = new FormData();
      
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('books[' + i + ']', file);
      }
      
      axios.post( 'http://localhost:3000/books',
        formData,{
          headers: { 'Content-Type': 'multipart/form-data' } 
        })
      .then(response => {
        console.log(response.data)
        
      }).catch(errors => console.log(errors));
    },
    submitBooks(){
      axios.get( 'http://localhost:3000/books')
      .then(response => {
        console.log(response.data)
        
      }).catch(errors => console.log(errors));
    },
  }
}
</script>
<style scoped>
.divFiles{
  text-align: center;
  padding: 0% 20% 0% 20%
}
.divImportFiles{
  border-bottom: 1px solid rgb(0, 204, 255);
  border-radius: 20px;background-color:transparent; height: 100px; margin: 0% 10% 0% 10%; background-color: rgb(241, 240, 221);
}
.contentMiddle{
  display: flex;justify-content: center;align-items: center;
}
</style>
