<template>
  <div class="admin">
  <UploadBooks/>
  </div>
</template>
<script>
// @ is an alias to /src
import UploadBooks from '@/components/UploadBooks.vue'

export default {
  name: 'Admin',
  components: {
    UploadBooks
  }
}
</script>
<style lang="scss" >
</style>
